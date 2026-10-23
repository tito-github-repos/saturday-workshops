import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isCourseSlug } from "@/lib/courses";
import { getEnrollment } from "@/lib/enrollment";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(req: NextRequest) {
  const { email, courseSlug, turnstileToken } = await req.json().catch(() => ({}));

  if (typeof email !== "string" || !isCourseSlug(courseSlug)) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  if (typeof turnstileToken !== "string" || !turnstileToken) {
    return NextResponse.json({ message: "Verification token missing." }, { status: 400 });
  }
  const remoteIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (!(await verifyTurnstileToken(turnstileToken, remoteIp))) {
    return NextResponse.json(
      { message: "Verification failed. Please try again." },
      { status: 403 },
    );
  }

  const student = await prisma.studentRegistration.findUnique({
    where: { email: email.trim().toLowerCase() },
  });
  if (!student) return NextResponse.json({ status: "NOT_REGISTERED" });

  const enrollment = await getEnrollment(student.id, courseSlug);
  if (enrollment) return NextResponse.json({ status: "ENROLLED" });

  return NextResponse.json({ status: "CAN_PAY", name: student.fullName });
}