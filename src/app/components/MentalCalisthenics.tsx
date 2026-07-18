"use client";

import { Box, Typography, Grid, Stack, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import Image from "next/image";
import Link from "next/link";

const points = [
  {
    icon: (
      <Box
        component="img"
        src="/Icons/innovative-brain-icon.svg"
        alt="Mental agility icon"
        sx={{
          width: 20,
          height: 20,
          filter:
            "invert(35%) sepia(12%) saturate(778%) hue-rotate(176deg) brightness(92%) contrast(86%)",
        }}
      />
    ),
    text: "Improve Mental Agility",
    subtext: "Strengthen your brain with targeted exercises",
  },
  {
    icon: <TrackChangesOutlinedIcon sx={{ fontSize: 20 }} />,
    text: "Sharpen Focus",
    subtext: "Build better concentration and accuracy",
  },
  {
    icon: <TipsAndUpdatesIcon sx={{ fontSize: 20 }} />,
    text: "Practice Smart",
    subtext: "Daily practice worksheets to boost your skills",
  },
];

export default function MentalCalisthenics() {
  return (
    <Box sx={{ py: { xs: 3, md: 3 }, px: { xs: 2, md: 6 } }}>
      <Grid
        container
        spacing={4}
        sx={{
          alignItems: "center",
          background: "#f1f5f9",
          borderRadius: 4,
          m: 0,
          p: { xs: 2, md: 4 },
        }}
      >
        {/* Left: image */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              aspectRatio: "4/3",
              width: "100%",
            }}
          >
            <Image
              src="/img/mental.webp"
              alt="Mental Calisthenics Practice Book"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Grid>

        {/* Right: content */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2.5}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Mental Calisthenics Practice Book
            </Typography>

            <Typography variant="body2" color="rgb(107, 114, 128)">
              Enhance your focus, think quickly, and become an efficient problem
              solver with our specially curated exercises.
            </Typography>

            <Grid container spacing={2.5}>
              {points.map((p) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.text}>
                  <Stack
                    direction="row"
                    spacing={1.2}
                    sx={{ alignItems: "flex-start" }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        minWidth: 36,
                        borderRadius: "50%",
                        border: "1px solid rgb(71, 85, 105)",
                        bgcolor: "var(--white)",
                        color: "rgb(71, 85, 105)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 0.3,
                      }}
                    >
                      {p.icon}
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {p.text}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mt: 0.3, lineHeight: 1.4 }}
                      >
                        {p.subtext}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              ))}
            </Grid>

            <Button
              component={Link}
              href="https://2212.co.in/"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "rgb(71, 85, 105)",
                color: "#fff",
                borderRadius: 2,
                px: 3,
                py: 1.3,
                fontWeight: 700,
                textTransform: "none",
                width: "fit-content",
                transition: "0.22s",
                "&:hover": {
                  bgcolor: "rgb(71, 85, 105)",
                  transform: "translateY(-5px)",
                },
              }}
            >
              Explore Mental Calisthenics
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
