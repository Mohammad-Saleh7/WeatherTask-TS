import React from "react";
import { Stack, Box, Typography, Link } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useTranslation } from "react-i18next";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const { t, i18n } = useTranslation();

  const date: Date = new Date();
  const L: string = i18n.language === "fa" ? "fa-IR" : "en-US";

  const day: string = date.toLocaleString(L, {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Stack
      component="footer"
      sx={(theme) => ({
        width: "100%",
        background:
          theme.palette.mode === "light"
            ? "#dce8eb"
            : "linear-gradient(90deg, #292F45, #3F4861 50%, #151D32)",
        mt: { xs: 2.5, md: 3 },
        color:
          theme.palette.mode === "dark" ? "white" : theme.palette.text.primary,
      })}
    >
      <Box
        sx={{
          mx: { xs: 1.5, sm: 2.5, md: 3 },
          my: { xs: 1.5, sm: 2 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            minWidth: 240,
          }}
        >
          <img
            src="/footer.png"
            alt="footer"
            style={{ width: 44, height: 44 }}
          />
          <Typography sx={{ fontSize: { xs: 12.5, sm: 13.5 } }}>
            {t("footer.rights")}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: { xs: 2, sm: 3.5, md: 4 },
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="mailto:info@nadin.ir"
            sx={(theme) => ({
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 1,
              color:
                theme.palette.mode === "dark"
                  ? "white"
                  : theme.palette.text.primary,
              fontSize: { xs: 13, sm: 14 },
            })}
          >
            <MailOutlineIcon fontSize="small" />
            {t("footer.contact")}
          </Link>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: { xs: 13, sm: 14 },
            }}
          >
            <CalendarMonthOutlinedIcon fontSize="small" />
            <Typography sx={{ fontSize: { xs: 12.5, sm: 14 } }}>
              {day}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default Footer;
