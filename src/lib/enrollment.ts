//src\lib\enrollment.ts
import { prisma } from "@/lib/prisma";
import { COURSES, isCourseSlug } from "@/lib/courses";
import { sendPaymentConfirmation } from "@/lib/email";

/** Has this student already paid for this course? (one-time, no expiry) */
export async function getEnrollment(studentId: number, courseSlug: string) {
  return prisma.course_Enrollment.findUnique({
    where: { studentId_courseSlug: { studentId, courseSlug } },
  });
}

/**
 * Marks the payment PAID and creates the enrollment.
 * Safe to call twice (verify route + webhook): the updateMany only matches
 * while the status is CREATED/EXPIRED, so the second call does nothing,
 * and the email is sent only by the call that actually activated it.
 */
export async function activatePayment(params: {
  orderId: string;
  paymentId: string;
  signature?: string;
}) {
  const result = await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.findUnique({
      where: { razorpayOrderId: params.orderId },
      include: { student: true },
    });
    if (!payment) return { ok: false as const, reason: "ORDER_NOT_FOUND" };

    const claimed = await tx.payment.updateMany({
      where: { id: payment.id, status: { in: ["CREATED", "EXPIRED"] } },
      data: {
        status: "PAID",
        razorpayPaymentId: params.paymentId,
        razorpaySignature: params.signature ?? null,
      },
    });

    if (claimed.count === 0) {
      // Another path (e.g. the webhook) activated this payment first.
      // If verify brings the payment signature, fill it in now.
      if (params.signature) {
        await tx.payment.updateMany({
          where: {
            id: payment.id,
            status: "PAID",
            razorpaySignature: null,
            razorpayPaymentId: params.paymentId,
          },
          data: { razorpaySignature: params.signature },
        });
      }
      return { ok: true as const, alreadyProcessed: true };
    }

    // Student already enrolled (two orders were paid): keep the first
    // enrollment, no second email. The extra payment needs a manual refund.
    const existing = await tx.course_Enrollment.findUnique({
      where: {
        studentId_courseSlug: {
          studentId: payment.studentId,
          courseSlug: payment.courseSlug,
        },
      },
    });
    if (existing) {
      console.warn(
        `Duplicate payment ${params.paymentId} for student ${payment.studentId} / ${payment.courseSlug}. Refund needed.`,
      );
      return { ok: true as const, alreadyProcessed: true };
    }

    const enrollment = await tx.course_Enrollment.create({
      data: {
        studentId: payment.studentId,
        courseSlug: payment.courseSlug,
        paymentId: payment.id,
      },
    });

    return {
      ok: true as const,
      alreadyProcessed: false,
      emailData: {
        name: payment.student.fullName,
        email: payment.student.email,
        course: isCourseSlug(payment.courseSlug)
          ? COURSES[payment.courseSlug].title
          : payment.courseSlug,
        amountInr: payment.amount / 100,
        paymentId: params.paymentId,
        paidOn: enrollment.enrolledAt,
      },
    };
  });

  // Send the email AFTER the DB commit. A failed email must never undo a payment.
  if (result.ok && !result.alreadyProcessed && result.emailData) {
    try {
      await sendPaymentConfirmation(result.emailData);
    } catch (emailError) {
      console.error("Payment email error:", emailError);
    }
  }

  return result;
}