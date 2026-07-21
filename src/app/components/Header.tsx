"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AppBar, Toolbar, Box, Typography, Button, Stack } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Appointment", href: "/appointment" },
  { label: "Contact", href: "/#contact" },
];

const MotionButton = motion(Button);
const MotionBox = motion(Box);

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "var(--white)",
        color: "var(--black)",
        border: "none",
        boxShadow: scrolled
          ? "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.08)"
          : "0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.03)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "1200px",
          width: "100%",
          mx: "auto",
          py: 1.5,
          px: { xs: 2, md: 3 },
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <MotionBox
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
        >
          <motion.div
            whileHover={{ rotate: -8, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                bgcolor: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(22,163,74,0.25)",
              }}
            >
              <SchoolIcon sx={{ color: "var(--white)", fontSize: 22 }} />
            </Box>
          </motion.div>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, letterSpacing: "-0.3px" }}
          >
            Saturday{" "}
            <Box component="span" sx={{ color: "var(--primary)" }}>
              Workshops
            </Box>
          </Typography>
        </MotionBox>

        {/* Nav links with sliding underline */}
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ display: { xs: "none", md: "flex" }, position: "relative" }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Box
                key={link.href}
                component={Link}
                href={link.href}
                sx={{
                  position: "relative",
                  px: 2,
                  py: 1,
                  textDecoration: "none",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    color: isActive ? "var(--primary)" : "var(--black)",
                    transition: "color 0.2s ease",
                    "&:hover": { color: "var(--primary)" },
                  }}
                >
                  {link.label}
                </Typography>
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 8,
                      right: 8,
                      height: 2,
                      borderRadius: 2,
                      background: "var(--primary)",
                      opacity: 0.55,
                      boxShadow: "none",
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Stack>

        {/* CTA */}
        <MotionButton
          onClick={() => router.push("/appointment")}
          whileHover={{
            scale: 1.04,
            boxShadow: "0 8px 20px rgba(22,163,74,0.35)",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          variant="contained"
          startIcon={<CalendarMonthIcon />}
          sx={{
            bgcolor: "var(--primary)",
            color: "var(--white)",
            borderRadius: "24px",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1,
            boxShadow: "0 4px 14px rgba(22,163,74,0.25)",
            "&:hover": { bgcolor: "var(--primary)" },
          }}
        >
          Book Now
        </MotionButton>
      </Toolbar>
    </AppBar>
  );
}
