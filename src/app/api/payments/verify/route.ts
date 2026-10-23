//src\app\api\payments\verify\route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { COURSES, isCourseSlug } from "@/lib/courses";
import { activatePayment } from "@/lib/enrollment";

export async function POST(req: Request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    await req.json().catch(() => ({}));

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(String(razorpay_signature));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return NextResponse.json({ message: "Signature mismatch" }, { status: 400 });
  }

  const result = await activatePayment({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
  });

  if (!result.ok) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  // Load saved records so the success popup always has the details,
  // even if the webhook activated the payment first.
  const payment = await prisma.payment.findUnique({
    where: { razorpayOrderId: razorpay_order_id },
    include: { student: true },
  });
  if (!payment) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    courseTitle: isCourseSlug(payment.courseSlug)
      ? COURSES[payment.courseSlug].title
      : payment.courseSlug,
    amountInr: payment.amount / 100,
    paymentId: razorpay_payment_id,
    email: payment.student.email,
  });
}