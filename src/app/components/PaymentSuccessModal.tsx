"use client";

import {
  Box, Button, Dialog, DialogContent, Divider, Stack, Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export interface PaymentSuccessData {
  courseTitle: string;
  amountInr: number;
  paymentId: string;
  email: string;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, textAlign: "right", wordBreak: "break-all" }}>
        {value}
      </Typography>
    </Stack>
  );
}

export default function PaymentSuccessModal({
  data,
  onClose,
}: {
  data: PaymentSuccessData | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!data} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent sx={{ textAlign: "center", p: 3 }}>
        <CheckCircleIcon sx={{ fontSize: 64, color: "var(--primary)" }} />
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
          Payment Successful!
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
          Thank you. Your enrollment is confirmed.
        </Typography>

        {data && (
          <Box sx={{ bgcolor: "#f8fbfd", borderRadius: 2, p: 2, textAlign: "left" }}>
            <Stack spacing={1}>
              <Row label="Course" value={data.courseTitle} />
              <Row label="Amount paid" value={`₹${data.amountInr.toLocaleString("en-IN")}`} />
              <Row label="Payment type" value="One-time payment" />
              <Divider />
              <Row label="Payment ID" value={data.paymentId} />
            </Stack>
          </Box>
        )}

        {data && (
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
            A confirmation email has been sent to {data.email}.
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{ mt: 2, textTransform: "none", fontWeight: 700, bgcolor: "var(--primary)", boxShadow: "none" }}
        >
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
}