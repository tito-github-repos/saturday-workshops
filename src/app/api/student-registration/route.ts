import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import sanitizeHtml from "sanitize-html";
import {
  sendAdminNotification,
  sendStudentConfirmation,
} from "@/lib/email";

/** Strips all HTML/script content, leaving plain text only. */
function sanitizeText(value: string): string {
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
}

/** Verifies the Turnstile token with Cloudflare's siteverify endpoint. */
async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  try {
    const formData = new URLSearchParams();
    formData.append("secret", process.env.TURNSTILE_SECRET_KEY as string);
    formData.append("response", token);
    if (remoteIp) formData.append("remoteip", remoteIp);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: formData },
    );

    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return false; // fail closed
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      date,
      course,
      message,
      website,
      turnstileToken,
    } = body;

    // 1. Honeypot check — must run before anything else.
    //    Real users never see or fill this field. Bots that auto-fill every
    //    input on the page will populate it, letting us silently reject them.
    if (typeof website === "string" && website.trim() !== "") {
      return NextResponse.json({
        success: true,
        message: "Registration submitted successfully.",
      });
    }

    // 2. Turnstile verification — never trust the client on this.
    if (typeof turnstileToken !== "string" || !turnstileToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification token missing.",
        },
        { status: 400 },
      );
    }

    const remoteIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const isHuman = await verifyTurnstileToken(turnstileToken, remoteIp);

    if (!isHuman) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification failed. Please try again.",
        },
        { status: 403 },
      );
    }

    // 3. Validate required fields
    if (!name || !email || !phone || !date || !course) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        { status: 400 },
      );
    }

    // 4. Sanitize input before persisting
    const sanitizedName = sanitizeText(name);
    const sanitizedEmail = sanitizeText(email).toLowerCase();
    const sanitizedPhone = sanitizeText(phone);
    const sanitizedCourse = sanitizeText(course);
    const sanitizedMessage = message ? sanitizeText(message) : null;

    // Save registration
    const registration = await prisma.studentRegistration.create({
      data: {
        fullName: sanitizedName,
        email: sanitizedEmail,
        phoneNumber: sanitizedPhone,
        workshopDate: new Date(date),
        course: sanitizedCourse,
        message: sanitizedMessage,
      },
    });

    // Format workshop date for email
    const formattedDate = new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    // Send emails (doesn't fail the registration if email sending fails)
    try {
      await Promise.all([
        sendStudentConfirmation({
          name: registration.fullName,
          email: registration.email,
          course: registration.course,
          workshopDate: formattedDate,
        }),

        sendAdminNotification({
          name: registration.fullName,
          email: registration.email,
          phone: registration.phoneNumber,
          course: registration.course,
          workshopDate: formattedDate,
          message: registration.message ?? undefined,
        }),
      ]);
    } catch (emailError) {
      console.error("Email Sending Error:", emailError);
      // Registration is already saved, so don't return an error.
    }

    return NextResponse.json(
      {
        success: true,
        message: "Registration submitted successfully.",
        data: registration,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Student Registration Error:", error);

    // Duplicate email
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "This email is already registered.",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}