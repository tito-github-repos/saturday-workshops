"use client";

import Link from "next/link";
import { Box, Typography, Stack, IconButton, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const socials = [
  { icon: <FacebookIcon fontSize="small" />, href: "https://www.facebook.com/", label: "Facebook" },
  { icon: <InstagramIcon fontSize="small" />, href: "https://www.instagram.com/", label: "Instagram" },
  { icon: <LinkedInIcon fontSize="small" />, href: "https://www.linkedin.com/company/90765852/admin/dashboard/", label: "LinkedIn" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

function LegalLinks({ fontSize = "13.5px" }: { fontSize?: string }) {
  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{ alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}
    >
      {legalLinks.map((link) => (
        <Typography
          key={link.label}
          component={Link}
          href={link.href}
          sx={{
            fontSize,
            fontWeight: 500,
            opacity: 0.7,
            color: "inherit",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "opacity 0.15s ease, color 0.15s ease",
            "&:hover": { opacity: 1, color: "var(--primary)" },
            "&:focus-visible": {
              outline: "2px solid var(--primary)",
              outlineOffset: "3px",
              borderRadius: "2px",
              opacity: 1,
            },
          }}
        >
          {link.label}
        </Typography>
      ))}
    </Stack>
  );
}

function SocialIcons() {
  return (
    <Stack direction="row" spacing={1}>
      {socials.map((s) => (
        <IconButton
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          size="small"
          sx={{
            width: 36,
            height: 36,
            bgcolor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.9)",
            transition: "background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease",
            "&:hover": {
              bgcolor: "var(--primary)",
              borderColor: "var(--primary)",
              color: "var(--white)",
              transform: "translateY(-1px)",
            },
            "&:focus-visible": {
              outline: "2px solid var(--primary)",
              outlineOffset: "2px",
            },
          }}
        >
          {s.icon}
        </IconButton>
      ))}
    </Stack>
  );
}

export default function Footer() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0b1220",
        color: "var(--white)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 3, sm: 4, md: 3 },
          py: { xs: 4, md: 3.5 },
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "grid" },
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "13.5px",
              fontWeight: 400,
              opacity: 0.5,
              whiteSpace: "nowrap",
              letterSpacing: "0.01em",
            }}
          >
            © 2025 Saturday Workshops. All Rights Reserved.
          </Typography>

          <Box sx={{ justifySelf: "center" }}>
            <SocialIcons />
          </Box>

          <Box sx={{ justifySelf: "end" }}>
            <LegalLinks />
          </Box>
        </Box>

        <Stack
          spacing={2.5}
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <SocialIcons />

          <Divider sx={{ width: "100%", borderColor: "rgba(255,255,255,0.08)" }} />

          <LegalLinks fontSize="13px" />

          <Typography sx={{ fontSize: "12px", opacity: 0.45 }}>
            © 2025 Saturday Workshops. All Rights Reserved.
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
      </Box>
    </Box>
  );
}
