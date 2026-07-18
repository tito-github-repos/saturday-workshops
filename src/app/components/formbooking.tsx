"use client";

import { useState, type ChangeEvent } from "react";
import * as yup from "yup";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

// Each benefit gets its own accent color again, drawn from the theme
// (--primary, --secondary) plus a couple of complementary tones.
const benefits: Benefit[] = [
  {
    title: "Practical & Interactive Sessions",
    description: "Learn by doing and real-life examples.",
    icon: <EventAvailableOutlinedIcon fontSize="small" />,
    color: "var(--primary)",
  },
  {
    title: "Personal Attention",
    description: "Small batch size for better understanding.",
    icon: <Groups2OutlinedIcon fontSize="small" />,
    color: "#f59e0b",
  },
  {
    title: "Expert Guidance",
    description: "Learn from experienced trainers.",
    icon: <SchoolOutlinedIcon fontSize="small" />,
    color: "var(--secondary)",
  },
  {
    title: "Real World Applications",
    description: "Skills that help you in academics & beyond.",
    icon: <WorkspacePremiumOutlinedIcon fontSize="small" />,
    color: "#0284c7",
  },
];

const courseOptions = [
  { value: "English Lanuage Design", label: "English Language Design" },
  { value: "Essential Math Skill", label: "Essential Math Skill" },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  date: string;
  course: string;
  message: string;
}

const initialFormState: FormState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  course: "",
  message: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

// Message is intentionally left out of "required" fields - it's optional.
const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .matches(/^[A-Za-z\s]+$/, "Name should only contain alphabets"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address"),
  phone: yup
    .string()
    .trim()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number should only contain numbers")
    .length(10, "Phone number must be exactly 10 digits"),
  date: yup.string().trim().required("Please select a date"),
  course: yup.string().trim().required("Please select a course"),
  message: yup.string().optional(),
});

export default function FormBooking() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    open: boolean;
    severity: "success" | "error";
    message: string;
  }>({
    open: false,
    severity: "success",
    message: "",
  });

  const handleChange =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let value = event.target.value;

      // Restrict input as the user types, in addition to the Yup validation on submit.
      if (field === "name") {
        value = value.replace(/[^A-Za-z\s]/g, "");
      } else if (field === "phone") {
        value = value.replace(/[^0-9]/g, "").slice(0, 10);
      }

      setFormData((prev) => ({ ...prev, [field]: value }));

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = async () => {
    setAlert({
      open: false,
      severity: "success",
      message: "",
    });

    try {
      // Validate form
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (validationErr: unknown) {
      if (validationErr instanceof yup.ValidationError) {
        const fieldErrors: FormErrors = {};

        validationErr.inner.forEach((issue) => {
          if (issue.path && !fieldErrors[issue.path as keyof FormState]) {
            fieldErrors[issue.path as keyof FormState] = issue.message;
          }
        });

        setErrors(fieldErrors);
      }

      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/student-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setAlert({
          open: true,
          severity: "error",
          message: result.message,
        });

        return;
      }

      setAlert({
        open: true,
        severity: "success",
        message: result.message,
      });

      setFormData(initialFormState);
      setErrors({});
    } catch (err) {
      console.error(err);

      setAlert({
        open: true,
        severity: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 3, md: 3 },
        px: { xs: 2, md: 6 },
        // background: "#f8fbfd",
      }}
    >
      <Grid container spacing={2.5}>
        `{/* LEFT CARD */}
        <Grid size={{ xs: 12, lg: 7.5 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #e7edf4",
              height: "100%",
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ mb: 2, alignItems: "center" }}
              >
                <EventAvailableOutlinedIcon
                  sx={{ color: "var(--primary)", fontSize: 24 }}
                />

                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#172554" }}
                >
                  Book Your Slot
                </Typography>
              </Stack>

              {/* Success / Error Alert */}
              <Collapse in={alert.open}>
                <Alert
                  severity={alert.severity}
                  sx={{ mb: 2 }}
                  onClose={() =>
                    setAlert((prev) => ({
                      ...prev,
                      open: false,
                    }))
                  }
                >
                  {alert.message}
                </Alert>
              </Collapse>

              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Your Name*"
                    value={formData.name}
                    onChange={handleChange("name")}
                    error={!!errors.name}
                    helperText={errors.name}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <PersonOutlineIcon
                            fontSize="small"
                            sx={{ mr: 1, color: "#8a94a6" }}
                          />
                        ),
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Email Address*"
                    value={formData.email}
                    onChange={handleChange("email")}
                    error={!!errors.email}
                    helperText={errors.email}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <EmailOutlinedIcon
                            fontSize="small"
                            sx={{ mr: 1, color: "#8a94a6" }}
                          />
                        ),
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="10-digit Phone Number*"
                    value={formData.phone}
                    onChange={handleChange("phone")}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <PhoneOutlinedIcon
                            fontSize="small"
                            sx={{ mr: 1, color: "#8a94a6" }}
                          />
                        ),
                      },
                      htmlInput: { inputMode: "numeric" },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    value={formData.date}
                    onChange={handleChange("date")}
                    error={!!errors.date}
                    helperText={errors.date}
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: {
                        startAdornment: (
                          <CalendarTodayOutlinedIcon
                            fontSize="small"
                            sx={{ mr: 1, color: "#8a94a6" }}
                          />
                        ),
                      },
                    }}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={formData.course}
                    onChange={handleChange("course")}
                    error={!!errors.course}
                    helperText={errors.course}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <MenuBookOutlinedIcon
                            fontSize="small"
                            sx={{ mr: 1, color: "#8a94a6" }}
                          />
                        ),
                      },
                    }}
                  >
                    <MenuItem value="">Select Course</MenuItem>
                    {courseOptions.map((course) => (
                      <MenuItem key={course.value} value={course.value}>
                        {course.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Write a Message (Optional)"
                    value={formData.message}
                    onChange={handleChange("message")}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <ChatBubbleOutlineOutlinedIcon
                            fontSize="small"
                            sx={{
                              mr: 1,
                              mt: 1,
                              alignSelf: "flex-start",
                              color: "#8a94a6",
                            }}
                          />
                        ),
                      },
                    }}
                  />
                </Grid>

                <Grid size={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    endIcon={<SendOutlinedIcon fontSize="small" />}
                    onClick={handleSubmit}
                    disabled={submitting}
                    sx={{
                      py: 1.2,
                      borderRadius: 1.5,
                      fontSize: 14,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      background: "var(--primary)",
                      boxShadow: "none",

                      "&:hover": {
                        background: "var(--primary)",
                        filter: "brightness(0.92)",
                      },
                    }}
                  >
                    {submitting ? "Submitting..." : "Submit Booking"}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        `{/* RIGHT CARD */}
        <Grid size={{ xs: 12, lg: 4.5 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #e7edf4",
              background: "#f8fbfd",
              height: "100%",
            }}
          >
            <CardContent
              sx={{
                p: { xs: 2, md: 3 },
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#172554", mb: 3 }}
              >
                Why Join Our Workshops?
              </Typography>

              <Stack
                spacing={4}
                sx={{ flex: 1, justifyContent: "space-between" }}
              >
                {benefits.map((item) => (
                  <Stack
                    key={item.title}
                    direction="row"
                    spacing={1.5}
                    sx={{ alignItems: "flex-start" }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        border: `2px solid ${item.color}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: item.color,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: "#172554",
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.3, fontSize: 13 }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
