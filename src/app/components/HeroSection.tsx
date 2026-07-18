"use client";

import { Box, Typography, Button, Stack, Divider } from "@mui/material";
import { motion } from "framer-motion";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const features = [
  { icon: <PersonOutlineOutlinedIcon />, label: "Expert Trainers" },
  { icon: <MenuBookOutlinedIcon />, label: "Interactive Learning" },
  { icon: <GroupsOutlinedIcon />, label: "Small Class Sizes" },
  { icon: <WorkspacePremiumOutlinedIcon />, label: "Certificate Provided" },
];

export default function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        bgcolor: "var(--white)",
        overflow: "hidden",
      }}
    >
      {/* Soft background wash behind the whole right side - this is what creates
          the smooth white -> pale green transition instead of a hard circle */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: { xs: "none", md: "block" },
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, var(--primary-light) 55%, var(--primary-light) 100%)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 4, md: 0 },
          maxWidth: "1440px",
          mx: "auto",
          pl: { xs: 3, md: 6 },
          pr: { xs: 3, md: 0 },
          py: { xs: 5, md: 7 },
        }}
      >
        {/* Left text content */}
        <MotionBox
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          sx={{ flex: 1, maxWidth: { md: "440px" } }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2.2rem", md: "2.7rem" },
              fontWeight: 800,
              lineHeight: 1.15,
              color: "var(--black)",
            }}
          >
            Learn. Practice.
            <br />
            <Box component="span" sx={{ color: "var(--primary)" }}>
              Excel.
            </Box>
          </Typography>

          <Typography
            sx={{
              fontSize: "0.95rem",
              color: "rgba(0,0,0,0.55)",
              mt: 1.5,
              mb: 3,
              maxWidth: "380px",
              lineHeight: 1.5,
            }}
          >
            Weekend workshops that empower you with practical skills and real-world confidence.
          </Typography>

          <Stack direction="row" sx={{ alignItems: "flex-start", mb: 3.5 }}>
            {features.map((f, i) => (
              <Box key={f.label} sx={{ display: "flex", alignItems: "flex-start" }}>
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: 78,
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ color: "var(--primary)", mb: 0.75, "& svg": { fontSize: 22 } }}>
                    {f.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: "var(--black)",
                      lineHeight: 1.3,
                    }}
                  >
                    {f.label}
                  </Typography>
                </MotionBox>
                {i < features.length - 1 && (
                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.5, borderColor: "rgba(0,0,0,0.08)" }} />
                )}
              </Box>
            ))}
          </Stack>

          <MotionButton
            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(22,163,74,0.3)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: "var(--primary)",
              color: "var(--white)",
              borderRadius: "24px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
              px: 3,
              py: 1.1,
              boxShadow: "0 4px 12px rgba(22,163,74,0.2)",
              "&:hover": { bgcolor: "var(--primary)" },
            }}
          >
            Explore Workshops
          </MotionButton>
        </MotionBox>

        {/* Right image - large again, bleeding to the right edge of the viewport.
            Big rounded corners on the left side blend it into the gradient panel,
            and a soft leftward shadow does the "smooth transition from text to
            image" instead of a hard seam. */}
        <MotionBox
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          sx={{
            position: "relative",
            flex: 1.3,
            width: "100%",
            minHeight: { xs: "300px", md: "480px" },
          }}
        >
          <Box
            component="img"
            src="/img/herosec_image.png"
            alt="Student learning at a workshop"
            sx={{
              position: "relative",
              display: "block",
              width: "100%",
              height: { xs: "300px", md: "480px" },
              objectFit: "cover",
              borderRadius: { xs: "16px", md: "28px" },
              borderTopRightRadius: { md: 0 },
              borderBottomRightRadius: { md: 0 },
              boxShadow: {
                xs: "0 12px 24px rgba(0,0,0,0.12)",
                md: "-24px 20px 50px -10px rgba(0,0,0,0.18)",
              },
            }}
          />
        </MotionBox>
      </Box>
    </Box>
  );
}