"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Stack,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import PaymentIcon from "@mui/icons-material/Payment";
import { COURSES, type CourseSlug } from "@/lib/courses";
import PayNowModal from "./Paynowmodal";

// Shared header style so every card header has the same height
const HEADER_MIN_HEIGHT = 72;

const workshops = [
  {
    slug: "english-language-design" as CourseSlug,
    badge: "Aa",
    badgeColor: "var(--primary)",
    badgeBg: "var(--white)",
    badgeBorder: "1px solid rgb(187, 247, 208)",
    badgeShadow: "rgba(22, 163, 74, 0.094) 0px 2px 10px",
    title: "English Language Design",
    titleColor: "var(--primary)",
    subTitleColor: "rgb(107, 114, 128)",
    description: "Forms. Functions. Structures.",
    learnItems: [
      "Grammatical Units",
      "Sentence Elements",
      "Sentence Patterns",
      "Phrase Structures",
      "Clause Structures",
    ],
    frequency: "All Saturdays",
    cardBg: "var(--primary-light)",
    accentColor: "var(--primary)",
    headerBg: "var(--primary-light)",
    cardShadow: "rgba(22, 163, 74, 0.133) 0px 20px 48px",
    cardHoverColor: "rgb(22, 163, 74)",
  },
  {
    slug: "one-day-vocabulary" as CourseSlug,
    badge: "VOC",
    badgeColor: "#ea580c",
    badgeBg: "var(--white)",
    badgeBorder: "1px solid rgb(254, 215, 170)",
    badgeShadow: "rgba(234, 88, 12, 0.094) 0px 2px 10px",
    title: "One Day Vocabulary",
    titleColor: "#ea580c",
    subTitleColor: "rgb(107, 114, 128)",
    description: "Phonemes. Morphemes.",
    learnItems: [
      "Vocabulary based Questions",
      "Word Families",
      "Word Groups",
      "Structure Class",
      "Form Class",
      "Idioms",
      "Phrasal Verbs",
      "Language Devices",
    ],
    frequency: "All Saturdays",
    cardBg: "#fff7ed",
    accentColor: "#ea580c",
    headerBg: "#fff7ed",
    cardShadow: "rgba(234, 88, 12, 0.133) 0px 20px 48px",
    cardHoverColor: "rgb(234, 88, 12)",
  },
  {
    slug: "one-day-grammar-rules" as CourseSlug,
    badge: "GRA",
    badgeColor: "#0d9488",
    badgeBg: "var(--white)",
    badgeBorder: "1px solid rgb(153, 246, 228)",
    badgeShadow: "rgba(13, 148, 136, 0.094) 0px 2px 10px",
    title: "One Day Grammar Rules",
    titleColor: "#0d9488",
    subTitleColor: "rgb(107, 114, 128)",
    description: "Syntax. Semantics.",
    learnItems: [
      "Grammar Rules based Questions",
      "Forms",
      "Functions",
      "Structures",
    ],
    frequency: "All Saturdays",
    cardBg: "#f0fdfa",
    accentColor: "#0d9488",
    headerBg: "#f0fdfa",
    cardShadow: "rgba(13, 148, 136, 0.133) 0px 20px 48px",
    cardHoverColor: "rgb(13, 148, 136)",
  },
  {
    slug: "one-day-rc" as CourseSlug,
    badge: "RC",
    badgeColor: "#e11d48",
    badgeBg: "var(--white)",
    badgeBorder: "1px solid rgb(254, 205, 211)",
    badgeShadow: "rgba(225, 29, 72, 0.094) 0px 2px 10px",
    title: "One Day RC",
    titleColor: "#e11d48",
    subTitleColor: "rgb(107, 114, 128)",
    description: "Ideas. Expression. Communication.",
    learnItems: ["Reading Comprehension Techniques", "Reading Principles"],
    frequency: "All Saturdays",
    cardBg: "#fff1f2",
    accentColor: "#e11d48",
    headerBg: "#fff1f2",
    cardShadow: "rgba(225, 29, 72, 0.133) 0px 20px 48px",
    cardHoverColor: "rgb(225, 29, 72)",
  },
  {
    slug: "essential-math-skills" as CourseSlug,
    badge: "123",
    badgeColor: "var(--secondary)",
    badgeBg: "var(--white)",
    badgeBorder: "1px solid rgb(221, 214, 254)",
    badgeShadow: "rgba(124, 58, 237, 0.094) 0px 2px 10px",
    title: "Essential Math Skills",
    titleColor: "var(--secondary)",
    subTitleColor: "rgb(107, 114, 128)",
    description: "Arithmetic. Algebra. Geometry.",
    learnItems: [
      "Simple & Compound Interest",
      "Present & Future Value",
      "Depreciation & EMIs",
      "Percentages & Averages",
      "Ratios & Mixtures",
      "Profit, Loss & Discounts",
    ],
    frequency: "All Saturdays",
    cardBg: "var(--secondary-light)",
    accentColor: "var(--secondary)",
    headerBg: "var(--secondary-light)",
    cardShadow: "rgba(124, 58, 237, 0.133) 0px 20px 48px",
    cardHoverColor: "rgb(124, 58, 237)",
  },
];

// ---- General Info card style config (mirrors workshops styling) ----
const generalInfoCard = {
  badgeColor: "#2563eb",
  badgeBg: "var(--white)",
  badgeBorder: "1px solid rgb(191, 211, 251)",
  badgeShadow: "rgba(37, 99, 235, 0.094) 0px 2px 10px",
  titleColor: "#2563eb",
  subTitleColor: "rgb(107, 114, 128)",
  headerBg: "#eaf0fd",
  cardShadow: "rgba(37, 99, 235, 0.133) 0px 20px 48px",
  cardHoverColor: "rgb(37, 99, 235)",
};

export default function SaturdayWorkshops() {
  // Which course's Pay Now modal is open (null = closed)
  const [payCourse, setPayCourse] = useState<CourseSlug | null>(null);

  return (
    <div id="courses">
      <Box
        sx={{
          py: { xs: 3, md: 6 },
          px: { xs: 2, md: 6 },
          backgroundColor: "var(--white)",
        }}
      >
        {/* Section heading */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "center", mb: 3 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.5rem", md: "2rem" },
              color: "var(--black)",
            }}
          >
            Our{" "}
            <Box component="span" sx={{ color: "var(--primary)" }}>
              Saturday{" "}
            </Box>
            Workshops
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {/* General Info card (first) */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "2px solid #e5e7eb",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                transition: "0.22s",
                "&:hover": {
                  border: `2px solid ${generalInfoCard.cardHoverColor}`,
                  transform: "translateY(-5px)",
                  boxShadow: generalInfoCard.cardShadow,
                },
              }}
            >
              <Box
                sx={{
                  bgcolor: generalInfoCard.headerBg,
                  p: 2,
                  minHeight: HEADER_MIN_HEIGHT,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.25}
                  sx={{ alignItems: "center" }}
                >
                  <Avatar
                    sx={{
                      borderRadius: "30%",
                      background: generalInfoCard.badgeBg,
                      color: generalInfoCard.badgeColor,
                      fontWeight: 700,
                      width: 38,
                      height: 38,
                      border: generalInfoCard.badgeBorder,
                      boxShadow: generalInfoCard.badgeShadow,
                    }}
                  >
                    <Box
                      component="img"
                      src="/Icons/info-icon.svg"
                      alt="Info icon"
                      sx={{
                        width: "40%",
                        height: "40%",
                        objectFit: "contain",
                        filter:
                          "brightness(0) saturate(100%) invert(29%) sepia(94%) saturate(1955%) hue-rotate(211deg) brightness(94%) contrast(96%)",
                      }}
                    />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: generalInfoCard.titleColor,
                      }}
                    >
                      General Info
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: generalInfoCard.subTitleColor,
                        fontSize: { xs: "0.8rem", md: "0.7rem" },
                      }}
                    >
                      (Applicable to every Workshops)
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Divider sx={{ border: "1px solid #e5e7eb" }} />

              <Box
                sx={{
                  p: 2,
                  pt: 1.75,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: 12, color: "text.secondary", mb: 3 }}
                >
                  If any academic institution, government office, private
                  company, or association wants to conduct the sessions in their
                  premises,contact us.
                </Typography>

                <Stack spacing={1} sx={{ mb: 1.5 }}>
                  <Button
                    href="#contact"
                    variant="outlined"
                    size="small"
                    sx={{
                      mb: 1.5,
                      textTransform: "none",
                      fontWeight: 600,
                      color: generalInfoCard.titleColor,
                      borderColor: generalInfoCard.cardHoverColor,
                      "&:hover": {
                        borderColor: generalInfoCard.cardHoverColor,
                        bgcolor: generalInfoCard.headerBg,
                      },
                    }}
                  >
                    Contact Us
                  </Button>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1.25}
                  sx={{
                    alignItems: "center",
                    border: `1px dashed ${generalInfoCard.cardHoverColor}`,
                    borderRadius: 2,
                    p: 1,
                    mb: 1.5,
                  }}
                >
                  <GroupsIcon
                    sx={{ color: generalInfoCard.titleColor, fontSize: 18 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontSize: 12.5, fontWeight: 600 }}
                  >
                    It is a 5–6 hours session.
                  </Typography>
                </Stack>

                {/* Pinned to the bottom so the card fills the row height */}
                <Box sx={{ mt: "auto" }}>
                  <Divider sx={{ mb: 1.5 }} />

                  <Stack
                    direction="row"
                    spacing={1.25}
                    sx={{ alignItems: "center" }}
                  >
                    <Avatar
                      sx={{
                        color: generalInfoCard.badgeBg,
                        bgcolor: generalInfoCard.badgeColor,
                        border: generalInfoCard.badgeBorder,
                        width: 32,
                        height: 32,
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 16 }} />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          lineHeight: 1.1,
                          color: generalInfoCard.titleColor,
                        }}
                      >
                        KaniSelvam Paraman
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: 11.5 }}
                      >
                        Trainer
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Workshop cards */}
          {workshops.map((w) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={w.slug}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "2px solid #e5e7eb",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  transition: "0.22s",
                  "&:hover": {
                    border: `2px solid ${w.cardHoverColor}`,
                    transform: "translateY(-5px)",
                    boxShadow: w.cardShadow,
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: w.headerBg,
                    p: 2,
                    minHeight: HEADER_MIN_HEIGHT,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.25}
                    sx={{ alignItems: "center" }}
                  >
                    <Avatar
                      sx={{
                        borderRadius: "30%",
                        background: w.badgeBg,
                        color: w.badgeColor,
                        fontWeight: 700,
                        fontSize: 14,
                        width: 38,
                        height: 38,
                        border: w.badgeBorder,
                        boxShadow: w.badgeShadow,
                      }}
                    >
                      {w.badge}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          lineHeight: 1.3,
                          color: w.titleColor,
                        }}
                      >
                        {w.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: w.subTitleColor,
                          fontSize: { xs: "0.8rem", md: "0.7rem" },
                        }}
                      >
                        {w.description}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Divider sx={{ border: "1px solid #e5e7eb" }} />

                <Box
                  sx={{
                    p: 2,
                    pt: 1.75,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      mb: 1,
                      display: "block",
                    }}
                  >
                    You&apos;ll Learn:
                  </Typography>

                  <Stack spacing={0.6} sx={{ mb: 1.5, flexGrow: 1 }}>
                    {w.learnItems.map((item) => (
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center" }}
                        key={item}
                      >
                        <CheckCircleIcon
                          sx={{ color: w.accentColor, fontSize: 16 }}
                        />
                        <Typography variant="body2" sx={{ fontSize: 13 }}>
                          {item}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      bgcolor: w.cardBg,
                      borderRadius: 2,
                      p: 1.25,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 700, color: w.accentColor }}
                    >
                      ₹ {COURSES[w.slug].priceInr.toLocaleString("en-IN")} /-{" "}
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontWeight: 400 }}
                      >
                        per person
                      </Typography>
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ alignItems: "center" }}
                    >
                      <CalendarMonthIcon
                        sx={{ fontSize: 16, color: w.accentColor }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: 11.5 }}
                      >
                        {w.frequency}
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* Pay Now: opens the email check + Razorpay modal */}
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<PaymentIcon fontSize="small" />}
                    onClick={() => setPayCourse(w.slug)}
                    sx={{
                      mt: 1.5,
                      textTransform: "none",
                      fontWeight: 700,
                      bgcolor: w.accentColor,
                      boxShadow: "none",
                      "&:hover": {
                        bgcolor: w.accentColor,
                        filter: "brightness(0.92)",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Pay Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <PayNowModal courseSlug={payCourse} onClose={() => setPayCourse(null)} />
    </div>
  );
}
