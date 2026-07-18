import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

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

    // Create Registration
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

    return NextResponse.json(
      {
        success: true,
        message: "Registration submitted successfully.",
        data: registration,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Student Registration Error:", error);

    // Duplicate Email
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