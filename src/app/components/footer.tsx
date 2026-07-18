"use client";

import {
  Box,
  Typography,
  Stack,
  IconButton,
  Fab,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const socials = [
  { icon: <FacebookIcon fontSize="small" />, href: "#" },
  { icon: <InstagramIcon fontSize="small" />, href: "#" },
  { icon: <LinkedInIcon fontSize="small" />, href: "#" },
];

export default function Footer() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0b1220",
        color: "var(--white)",
        py: 3,
        position: "relative",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 3 },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          © 2025 Saturday Workshops. All Rights Reserved.
        </Typography>

        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Follow Us
          </Typography>
          <Stack direction="row" spacing={1.5}>
            {socials.map((s, i) => (
              <IconButton
                key={i}
                href={s.href}
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.08)",
                  color: "var(--white)",
                  "&:hover": { bgcolor: "var(--primary)" },
                }}
              >
                {s.icon}
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Stack>

      <Fab
        size="small"
        onClick={scrollToTop}
        sx={{
          position: "absolute",
          right: { xs: 16, md: 24 },
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "var(--primary)",
          color: "var(--white)",
          "&:hover": { bgcolor: "var(--primary)", opacity: 0.9 },
        }}
      >
        <ArrowUpwardIcon fontSize="small" />
      </Fab>
    </Box>
  );
}