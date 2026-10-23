//src\lib\email.tsx  (YOUR EXISTING FILE: lines marked NEW are the payment email)
import StudentConfirmation from "@/templates/studentConfirmation";
import { resend } from "./resend";
import AdminNotification from "@/templates/adminNotification";
import PaymentConfirmation from "@/templates/Paymentconfirmation ";


interface StudentConfirmationData {
  name: string;
  email: string;
  course: string;
  workshopDate: string;
}

interface AdminNotificationData {
  name: string;
  email: string;
  phone: string;
  course: string;
  workshopDate: string;
  message?: string;
}

// NEW
interface PaymentConfirmationData {
  name: string;
  email: string;
  course: string;
  amountInr: number;
  paymentId: string;
  paidOn: Date;
}

export async function sendStudentConfirmation(
  data: StudentConfirmationData
) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: data.email,
    subject: "Workshop Registration Confirmation",
    react: <StudentConfirmation {...data} />,
  });
}

export async function sendAdminNotification(
  data: AdminNotificationData
) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: process.env.ADMIN_EMAIL!,
    subject: "New Workshop Registration",
    react: <AdminNotification {...data} />,
  });
}

// NEW: payment success email (customer only)
export async function sendPaymentConfirmation(data: PaymentConfirmationData) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: data.email,
    subject: `Payment Successful - ${data.course}`,
    react: (
      <PaymentConfirmation
        name={data.name}
        course={data.course}
        amount={data.amountInr.toLocaleString("en-IN")}
        paymentId={data.paymentId}
        paidOn={data.paidOn.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      />
    ),
  });
}