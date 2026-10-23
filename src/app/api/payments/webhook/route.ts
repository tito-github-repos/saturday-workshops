//src\app\api\payments\webhook\route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { activatePayment } from "@/lib/enrollment";

// Backup path: runs even if the user closes the tab right after paying.
// Razorpay dashboard -> Webhooks -> URL: https://yourdomain.com/api/payments/webhook
// Event: payment.captured, secret = RAZORPAY_WEBHOOK_SECRET
export async function POST(req: Request) {
  const rawBody = await req.text(); // must be the RAW body for signature check
  const signature = req.headers.get("x-razorpay-signature") ?? "";

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET as string)
    .update(rawBody)
    .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);
  if (event.event === "payment.captured") {
    const p = event.payload.payment.entity;
    await activatePayment({ orderId: p.order_id, paymentId: p.id });
  }
  return NextResponse.json({ received: true });
}