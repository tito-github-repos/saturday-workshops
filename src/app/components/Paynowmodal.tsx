"use client";

import { useRef, useState } from "react";
import {
  Alert, Button, CircularProgress, Dialog, DialogContent, DialogTitle,
  IconButton, Stack, TextField, Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { COURSES, type CourseSlug } from "@/lib/courses";
// Same folder as this file. Adjust the path if you keep it elsewhere.
import PaymentSuccessModal, { type PaymentSuccessData } from "./PaymentSuccessModal";

type Step =
  | { name: "EMAIL" }
  | { name: "NOT_REGISTERED" }
  | { name: "ENROLLED" }
  | { name: "CAN_PAY" };

interface Props {
  courseSlug: CourseSlug | null;
  onClose: () => void;
}

const greenButtonSx = {
  textTransform: "none",
  fontWeight: 700,
  bgcolor: "var(--primary)",
  boxShadow: "none",
  "&:hover": {
    bgcolor: "var(--primary)",
    filter: "brightness(0.92)",
    boxShadow: "none",
  },
} as const;

// Razorpay's checkout.js is loaded on demand
const loadRazorpay = () =>
  new Promise<boolean>((resolve) => {
    if ((window as any).Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

export default function PayNowModal({ courseSlug, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>({ name: "EMAIL" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<PaymentSuccessData | null>(null);

  // Turnstile token is single-use: reset the widget after every check attempt.
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  const course = courseSlug ? COURSES[courseSlug] : null;

  const reset = () => {
    setEmail("");
    setStep({ name: "EMAIL" });
    setError("");
    setLoading(false);
    setTurnstileToken("");
    setSuccess(null);
  };
  const handleClose = () => {
    reset();
    onClose();
  };

  // Typing a different email at any step sends the user back to the first step
  const handleEmailChange = (v: string) => {
    setEmail(v);
    setError("");
    if (step.name !== "EMAIL") {
      setTurnstileToken(""); // widget remounts and issues a fresh token
      setStep({ name: "EMAIL" });
    }
  };

  const handleCheck = async () => {
    const trimmed = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      setError("Enter a valid email address");
      return;
    }
    if (!turnstileToken) {
      setError("Please complete the verification check.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/payments/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, courseSlug, turnstileToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }
      setStep({ name: data.status });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      turnstileRef.current?.reset(); // no-op if the widget has unmounted
      setTurnstileToken("");
    }
  };

  const handlePay = async () => {
    setLoading(true);
    setError("");
    try {
      if (!(await loadRazorpay())) throw new Error("Could not load Razorpay");

      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), courseSlug }),
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.message);

      // Server found this course was already paid (e.g. tab closed earlier)
      if (order.alreadyPaid) {
        setStep({ name: "ENROLLED" });
        setLoading(false);
        return;
      }

      const rzp = new (window as any).Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Saturday Workshops",
        description: course?.title,
        prefill: { name: order.name, email: order.email, contact: order.phone },
        theme: { color: "#16a34a" },
        handler: async (response: any) => {
          const v = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          if (v.ok) setSuccess(await v.json());
          else setError("Payment received but verification failed. Contact support.");
          setLoading(false);
        },
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.on("payment.failed", () => {
        setError("Payment failed. Please try again.");
        setLoading(false);
      });
      rzp.open();
    } catch (e: any) {
      setError(e.message || "Could not start payment.");
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={!!courseSlug && !success}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ pr: 6, fontWeight: 700 }}>
          {course?.title}
          <IconButton onClick={handleClose} sx={{ position: "absolute", right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              size="small"
              fullWidth
              label="Registered email address"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              error={!!error && step.name === "EMAIL"}
              helperText={step.name === "EMAIL" ? error : ""}
              disabled={loading}
            />

            {step.name === "EMAIL" && (
              <>
                <Turnstile
                  ref={turnstileRef}
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onExpire={() => setTurnstileToken("")}
                  onError={() => setError("Verification failed. Please retry.")}
                  options={{ theme: "light" }}
                />
                <Button
                  variant="contained"
                  onClick={handleCheck}
                  disabled={loading || !email || !turnstileToken}
                  sx={greenButtonSx}
                >
                  {loading ? <CircularProgress size={20} color="inherit" /> : "Continue"}
                </Button>
              </>
            )}

            {step.name === "NOT_REGISTERED" && (
              <Alert severity="warning" icon={false} sx={{ alignItems: "center" }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  This email is not registered. Please register first or use
                  another email id.
                </Typography>

                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Button
                    size="small"
                    href="#appointment"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClose();
                      // wait for the dialog to finish closing (it locks page scroll)
                      setTimeout(() => {
                        document
                          .getElementById("appointment")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 300);
                    }}
                    sx={{ textTransform: "none", fontWeight: 600, p: 0, minWidth: 0 }}
                  >
                    Register here
                  </Button>

                  <Button
                    size="small"
                    onClick={() => {
                      setEmail("");
                      setError("");
                      setTurnstileToken("");
                      setStep({ name: "EMAIL" });
                    }}
                    sx={{ textTransform: "none", fontWeight: 600, p: 0, minWidth: 0 }}
                  >
                    Use another email
                  </Button>
                </Stack>
              </Alert>
            )}

            {step.name === "ENROLLED" && (
              <Alert severity="success">
                You have already paid for this course. You are enrolled.
              </Alert>
            )}

            {step.name === "CAN_PAY" && (
              <>
                <Typography variant="body2" color="text.secondary">
                  One-time payment for this course.
                </Typography>
                <Button
                  variant="contained"
                  onClick={handlePay}
                  disabled={loading}
                  sx={greenButtonSx}
                >
                  {loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    `Proceed to Pay ₹${course?.priceInr.toLocaleString("en-IN")}`
                  )}
                </Button>
                {error && <Alert severity="error">{error}</Alert>}
              </>
            )}
          </Stack>
        </DialogContent>
      </Dialog>

      <PaymentSuccessModal data={success} onClose={handleClose} />
    </>
  );
}