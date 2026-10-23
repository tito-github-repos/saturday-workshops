import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";
import { COURSES, isCourseSlug } from "@/lib/courses";
import { activatePayment, getEnrollment } from "@/lib/enrollment";

const REUSE_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function POST(req: Request) {
  const { email, courseSlug } = await req.json().catch(() => ({}));

  if (typeof email !== "string" || !isCourseSlug(courseSlug)) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const student = await prisma.studentRegistration.findUnique({
    where: { email: email.trim().toLowerCase() },
  });
  if (!student) {
    return NextResponse.json({ message: "Please register first." }, { status: 404 });
  }

  if (await getEnrollment(student.id, courseSlug)) {
    return NextResponse.json({ message: "Already enrolled." }, { status: 409 });
  }

  const amount = COURSES[courseSlug].priceInr * 100; // paise, from server config only

  const prefill = {
    keyId: process.env.RAZORPAY_KEY_ID,
    currency: "INR",
    name: student.fullName,
    email: student.email,
    phone: student.phoneNumber,
  };

  const existing = await prisma.payment.findFirst({
    where: { studentId: student.id, courseSlug, status: "CREATED" },
    orderBy: { createdAt: "desc" },
  });

  if (existing) {
    try {
      // Ask Razorpay what really happened on this order
      const res: any = await razorpay.orders.fetchPayments(existing.razorpayOrderId);
      const items: any[] = res?.items ?? [];

      // (a) Already paid at Razorpay but our DB missed it -> activate now
      const captured = items.find((p) => p.status === "captured");
      if (captured) {
        await activatePayment({
          orderId: existing.razorpayOrderId,
          paymentId: captured.id,
        });
        return NextResponse.json({ alreadyPaid: true });
      }

      // (b) Retry within 24h: SAME row, SAME order (attempts +1, updatedAt auto-updates)
      const inFlight = items.some(
        (p) => p.status === "authorized" || p.status === "created",
      );
      if (
        !inFlight &&
        existing.amount === amount &&
        Date.now() - existing.createdAt.getTime() < REUSE_WINDOW_MS
      ) {
        await prisma.payment.update({
          where: { id: existing.id },
          data: { attempts: { increment: 1 } },
        });
        return NextResponse.json({
          ...prefill,
          orderId: existing.razorpayOrderId,
          amount: existing.amount,
        });
      }
    } catch (err) {
      console.error("Razorpay order check failed:", err);
    }

    // (c) Older than 24h / in flight / unreadable: old row -> EXPIRED
    //     (kept, so a late payment on it can still be matched), then new row
    await prisma.payment.updateMany({
      where: { studentId: student.id, courseSlug, status: "CREATED" },
      data: { status: "EXPIRED" },
    });
  }

  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: `rcpt_${Date.now()}`,
    notes: { studentId: String(student.id), courseSlug },
  });

  await prisma.payment.create({
    data: {
      studentId: student.id,
      courseSlug,
      amount,
      razorpayOrderId: order.id,
    },
  });

  return NextResponse.json({ ...prefill, orderId: order.id, amount });
}