"use client";

import {
  Box,
  Typography,
  Grid,
  Card,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";

const workshops = [
  {
    badge: "Aa",
    badgeColor: "var(--primary)",
    badgeBg: "var(--white)",
    badgeBorder: "1px solid rgb(187, 247, 208)",
    badgeShadow: "rgba(22, 163, 74, 0.094) 0px 2px 10px",
    title: "English Language Design",
    titleColor: "var(--primary)",
    subTitleColor: "rgb(107, 114, 128)",
    description: "Improve your grammar, writing and sentence structure.",
    learnItems: [
      "Grammatical Units",
      "Sentence Elements",
      "Sentence Patterns",
      "Phrase Structures",
      "Clause Structures",
    ],
    price: "3,456",
    frequency: "Every 2nd Saturday",
    cardBg: "var(--primary-light)",
    accentColor: "var(--primary)",
    headerBg: "var(--primary-light)",
    cardShadow: "rgba(22, 163, 74, 0.133) 0px 20px 48px",
    cardHoverColor: "rgb(22, 163, 74)",
  },
  {
    badge: "123",
    badgeColor: "var(--secondary)",
    badgeBg: "var(--white)",
    badgeBorder: "1px solid rgb(221, 214, 254)",
    badgeShadow: "rgba(124, 58, 237, 0.094) 0px 2px 10px",
    title: "Essential Math Skills",
    titleColor: "var(--secondary)",
    subTitleColor: "rgb(107, 114, 128)",
    description: "Strengthen your basics and solve problems with confidence.",
    learnItems: [
      "Simple & Compound Interest",
      "Present & Future Value",
      "Depreciation & EMIs",
      "Percentages & Averages",
      "Ratios & Mixtures",
      "Profit, Loss & Discounts",
    ],
    price: "3,456",
    frequency: "Every 4th Saturday",
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

const generalInfo = [
  {
    icon: <LocalCafeIcon sx={{ fontSize: 18 }} />,
    label: "Inclusive:",
    value: "Tea, Snacks & Lunch",
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 18 }} />,
    label: "Time:",
    value: "9:00 AM – 3:00 PM",
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 18 }} />,
    label: "Venue:",
    value:
      "Details will be shared via WhatsApp. Location will be within Chennai city.",
  },
];

export default function SaturdayWorkshops() {
  return (
    <div>
      <Box sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, md: 6 } }}>
        {/* Section heading with decorative lines */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "center", mb: 3 }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, fontSize: { xs: "1.5rem", md: "2rem" } }}
          >
            Our{" "}
            <Box component="span" sx={{ color: "var(--primary)" }}>
              Saturday{" "}
            </Box>
            Workshops
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {/* Workshop cards */}
          {workshops.map((w) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={w.title}>
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
                {/* Header block with background color */}
                <Box sx={{ bgcolor: w.headerBg, p: 3, pb: 2.5 }}>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ alignItems: "flex-start" }}
                  >
                    <Avatar
                      sx={{
                        borderRadius: "30%",
                        background: w.badgeBg,
                        color: w.badgeColor,
                        fontWeight: 700,
                        fontSize: { xs: 14, md: 18 },
                        width: { xs: 40, md: 50 },
                        height: { xs: 40, md: 50 },
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
                          mt: 0.5,
                          color: w.subTitleColor,
                          fontSize: { xs: "0.875rem", md: "0.75rem" },
                        }}
                      >
                        {w.description}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                {/* Full-width divider between header and "You'll Learn" */}
                <Divider sx={{ border: "1px solid #e5e7eb" }} />

                {/* Rest of card content */}
                <Box
                  sx={{
                    p: 3,
                    pt: 2.5,
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

                  <Stack spacing={0.75} sx={{ mb: 2, flexGrow: 1 }}>
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
                        <Typography variant="body2" sx={{ fontSize: 13.5 }}>
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
                      p: 1.5,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 700, color: w.accentColor }}
                    >
                      ₹ {w.price}{" "}
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontWeight: 400 }}
                      >
                        only
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
                </Box>
              </Card>
            </Grid>
          ))}

          {/* General Info card */}
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
              {/* Header block with background color, matches workshop cards */}
              <Box sx={{ bgcolor: generalInfoCard.headerBg, p: 3, pb: 2.5 }}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: "flex-start" }}
                >
                  <Avatar
                    sx={{
                      borderRadius: "30%",
                      background: generalInfoCard.badgeBg,
                      color: generalInfoCard.badgeColor,
                      fontWeight: 700,
                      fontSize: { xs: 14, md: 18 },
                      width: { xs: 40, md: 50 },
                      height: { xs: 40, md: 50 },
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
                        color: generalInfoCard.titleColor,
                      }}
                    >
                      General Info
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        color: generalInfoCard.subTitleColor,
                        fontSize: { xs: "0.875rem", md: "0.75rem" },
                        cursor: "pointer",
                      }}
                    >
                      (Applicable to both Workshops)
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Full-width divider, matches workshop cards */}
              <Divider sx={{ border: "1px solid #e5e7eb" }} />

              {/* Rest of card content */}
              <Box
                sx={{
                  p: 3,
                  pt: 2.5,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack spacing={1.5} sx={{ mb: 2, flexGrow: 1 }}>
                  {generalInfo.map((item) => (
                    <Stack
                      direction="row"
                      spacing={1.5}
                      key={item.label}
                      sx={{ alignItems: "flex-start" }}
                    >
                      <Box sx={{ color: generalInfoCard.titleColor, mt: 0.2 }}>
                        {item.icon}
                      </Box>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          {item.label}
                        </Box>{" "}
                        {item.value}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                {/* Trainer info box, styled like the price/frequency row in workshop cards */}
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{
                    alignItems: "center",
                    bgcolor: generalInfoCard.headerBg,
                    borderRadius: 2,
                    p: 1.5,
                  }}
                >
                  <Avatar
                    sx={{
                      color: generalInfoCard.badgeBg,
                      bgcolor: generalInfoCard.badgeColor,
                      border: generalInfoCard.badgeBorder,
                      width: 36,
                      height: 36,
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        color: generalInfoCard.titleColor,
                      }}
                    >
                      KaniSelvam Paraman
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", fontSize: 12 }}
                    >
                      Trainer
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
