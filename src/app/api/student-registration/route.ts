import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import {
  sendAdminNotification,
  sendStudentConfirmation,
} from "@/lib/email";

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
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !date || !course) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        { status: 400 }
      );
    }

    // Save registration
    const registration = await prisma.studentRegistration.create({
      data: {
        fullName: name.trim(),
        email: email.trim().toLowerCase(),
        phoneNumber: phone.trim(),
        workshopDate: new Date(date),
        course: course.trim(),
        message: message?.trim() || null,
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
      { status: 200 }
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
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}