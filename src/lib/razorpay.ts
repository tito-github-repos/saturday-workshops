import Razorpay from "razorpay";

// Server only. Never import this in a "use client" file.
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});