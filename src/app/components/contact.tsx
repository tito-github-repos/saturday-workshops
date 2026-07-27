"use client";

import { Box, Card, Stack, Typography } from "@mui/material";

import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

interface ContactInfoItem {
  title: string;
  lines: string[];
  icon: React.ReactNode;
}

const contactInfo: ContactInfoItem[] = [
  {
    title: "Call Us",
    lines: ["+91 9499953256"],
    icon: <PhoneOutlinedIcon fontSize="small" />,
  },
  {
    title: "Email Us",
    lines: ["eacg.consulting@gmail.com"],
    icon: <EmailOutlinedIcon fontSize="small" />,
  },
  {
    title: "Address",
    lines: [
      "B4, Lumiers Enclave #5/1092, GiriNagar Main Road",
      "Ramapuram, Chennai",
      "Tamil Nadu - 600089",
    ],
    icon: <LocationOnOutlinedIcon fontSize="small" />,
  },
];

export default function GetInTouch() {
  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: { xs: 3, md: 3 },
        px: { xs: 2, md: 6 },
        background: "var(--white)",
      }}
    >
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={3}
        sx={{ maxWidth: 1200, mx: "auto", alignItems: "stretch" }}
      >
        {/* LEFT: MAP */}

        <Box sx={{ flex: 1 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #e7edf4",
              background: "#f8fbfd",
              height: "100%",
              p: { xs: 2.5, md: 3.5 },
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{ mb: 3, alignItems: "center" }}
            >
              <ChatBubbleOutlineOutlinedIcon
                sx={{ color: "var(--primary)", fontSize: 24 }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#172554" }}
              >
                Get In Touch
              </Typography>
            </Stack>

            <Stack spacing={3}>
              {contactInfo.map((item) => (
                <Stack
                  key={item.title}
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "flex-start" }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "var(--primary-light)",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Box>
                    <Typography
                      sx={{ fontWeight: 700, fontSize: 16, color: "#172554" }}
                    >
                      {item.title}
                    </Typography>

                    {item.lines.map((line) => (
                      <Typography
                        key={line}
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.2 }}
                      >
                        {line}
                      </Typography>
                    ))}
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Card>
        </Box>

        {/* RIGHT: CONTACT INFO */}
        <Box sx={{ flex: { lg: "0 0 58%" } }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #e7edf4",
              overflow: "hidden",
              height: "100%",
              minHeight: 320,
            }}
          >
            <Box
              component="iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.112059697217!2d80.17555687471508!3d13.02853531362822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261629a0e3859%3A0x4989aba0fb39a0ae!2sLumieres%20Enclave!5e0!3m2!1sen!2sin!4v1750572770610!5m2!1sen!2sin"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sx={{
                border: 0,
                width: "100%",
                height: "100%",
                minHeight: 320,
                display: "block",
              }}
            />
          </Card>
        </Box>
      </Stack>
    </Box>
  );
}
