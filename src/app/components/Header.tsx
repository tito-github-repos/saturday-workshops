"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  Drawer,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

// Home & Appointment are real pages. Contact is a section on the homepage.
const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Appointment", href: "#appointment" },
  { label: "Contact", href: "#contact" },
];

const MotionButton = motion(Button);
const MotionBox = motion(Box);

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep active state in sync with real route changes (Home / Appointment)
  useEffect(() => {
    setActiveHref(pathname);
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setMenuOpen(false);

    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      setActiveHref(href); // move underline immediately, no animation lag

      if (pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/#${id}`);
      }
    } else {
      setActiveHref(href);
    }
  };

  const renderLinks = (mobile = false) =>
    navLinks.map((link) => {
      const isActive = activeHref === link.href;
      return (
        <Box
          key={link.label}
          component={Link}
          href={link.href}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
            handleNavClick(e, link.href)
          }
          sx={{
            position: "relative",
            px: 2,
            py: mobile ? 1.5 : 1,
            textDecoration: "none",
            width: mobile ? "100%" : "auto",
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: mobile ? "1.05rem" : "0.95rem",
              color: isActive ? "var(--primary)" : "var(--black)",
              transition: "color 0.2s ease",
              "&:hover": { color: "var(--primary)" },
            }}
          >
            {link.label}
          </Typography>
          {isActive && !mobile && (
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
              }}
            />
          )}
        </Box>
      );
    });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        transform: "translateZ(0)",
        WebkitBackfaceVisibility: "hidden",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "var(--white)",
        color: "var(--black)",
        backgroundImage: "none",
        border: "none",
        borderBottom: "none",
        borderTop: "none",
        outline: "none",
        boxShadow: scrolled
          ? "0 4px 12px rgba(0,0,0,0.08)"
          : "0 2px 8px rgba(0,0,0,0.05)",
        "&::before, &::after": { display: "none" },
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
        <MotionBox
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
          onClick={() => {
            setActiveHref("/");
            router.push("/");
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
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.3px" }}>
            Saturday{" "}
            <Box component="span" sx={{ color: "var(--primary)" }}>
              Workshops
            </Box>
          </Typography>
        </MotionBox>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{ display: { xs: "none", md: "flex" }, position: "relative" }}
        >
          {renderLinks(false)}
        </Stack>

        <MotionButton
          onClick={(e) => handleNavClick(e as any, "#appointment")}
          whileHover={{ scale: 1.04, boxShadow: "0 8px 20px rgba(22,163,74,0.35)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          variant="contained"
          startIcon={<CalendarMonthIcon />}
          sx={{
            display: { xs: "none", md: "inline-flex" },
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

        <IconButton
          onClick={() => setMenuOpen(true)}
          sx={{
            display: { xs: "flex", md: "none" },
            color: "var(--primary)",
            bgcolor: "rgba(22,163,74,0.08)",
            borderRadius: "10px",
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ width: 280, p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <IconButton onClick={() => setMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Stack spacing={1}>{renderLinks(true)}</Stack>

          <Box sx={{ mt: "auto" }}>
            <Button
              fullWidth
              onClick={() => {
                setMenuOpen(false);
                setActiveHref("/appointment");
                router.push("/appointment");
              }}
              variant="contained"
              startIcon={<CalendarMonthIcon />}
              sx={{
                bgcolor: "var(--primary)",
                color: "var(--white)",
                borderRadius: "24px",
                textTransform: "none",
                fontWeight: 600,
                py: 1.2,
                "&:hover": { bgcolor: "var(--primary)" },
              }}
            >
              Book Now
            </Button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}