import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
  type Theme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTranslation } from "react-i18next";

type MonthlyPoint = {
  month?: string;
  label?: string;
  avgTemp?: number;
};

type WeatherHeaderProps = {
  cityName: string;
  day: string;
  date: string;
  hour: string;
  Temperature: number | string;
  high: number | string;
  low: number | string;
  img: string;
  Status?: string;
  feels?: number | string;
  monthlyData?: MonthlyPoint[];
};

const WeatherHeader: React.FC<WeatherHeaderProps> = ({
  cityName,
  day,
  date,
  hour,
  Temperature,
  high,
  low,
  img,
  Status,
  feels,
  monthlyData = [],
}) => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);

  const NF = new Intl.NumberFormat(i18n.language === "fa" ? "fa-IR" : "en-US");
  const fmt = (v: number | string | undefined) =>
    typeof v === "number" ? NF.format(v) : v ?? "";

  const months = monthlyData;
  const values = months
    .map((m) => m?.avgTemp)
    .filter((v): v is number => v != null);

  const w = 704;
  const h = 140;
  const pad = 10;
  const step = months.length > 1 ? (w - 2 * pad) / (months.length - 1) : 0;
  const minVal = values.length ? Math.min(...values) : 0;
  const maxVal = values.length ? Math.max(...values) : 0;

  const normY = (v: number) =>
    maxVal === minVal ? 0.5 : 1 - (v - minVal) / (maxVal - minVal);

  const points =
    months.length && values.length
      ? months
          .map((m, i) => {
            const y = m.avgTemp != null ? normY(m.avgTemp) : 0.5;
            return `${pad + i * step},${pad + y * (h - 2 * pad)}`;
          })
          .join(" ")
      : "";

  const gradient = (
    <linearGradient id="myGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#4CDFE80D" />
      <stop offset="100%" stopColor="#7947F70D" />
    </linearGradient>
  );

  useEffect(() => {
    const time = setTimeout(() => {
      setLoading(false);
      return () => clearTimeout(time);
    }, 1500);
  }, []);

  return (
    <div>
      {loading ? (
        <Typography
          variant="h3"
          component={"h3"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // height: "100vh",
            gap: 2,
            px: { xs: 2, sm: 3 },
            fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          {t("loading")}
          <CircularProgress size={28} />
        </Typography>
      ) : (
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Stack
            sx={(theme: Theme) => ({
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 2, md: 3, lg: 5 },
              mt: { xs: 2, sm: 3, md: 5 },
              color: theme.palette.mode === "dark" ? "white" : "#003464",
            })}
          >
            <Box
              sx={(theme: Theme) => ({
                flex: 1,
                minWidth: 0,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? theme.palette.background.darkPaper
                    : theme.palette.background.lightPaper,
                borderRadius: 2,
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                px: { xs: 2, sm: 3 },
                py: { xs: 2, sm: 3 },
              })}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box
                  sx={{
                    bgcolor: "#cdd9e0",
                    width: { xs: 160, sm: 180 },
                    height: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                  }}
                >
                  <LocationOnIcon sx={{ color: "#3d4852" }} />
                  <Typography sx={{ color: "#3d4852", ml: 0.5 }}>
                    {cityName}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="h4"
                    component="h4"
                    sx={{ fontSize: { xs: 22, sm: 26, md: 30 } }}
                  >
                    {day}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                    <Typography>{date}</Typography>
                    <Typography>{hour}</Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="h4"
                      component="h4"
                      sx={{ fontSize: { xs: 28, sm: 32, md: 36 } }}
                    >
                      {fmt(Temperature)}
                    </Typography>
                    <Typography>
                      {t("weather.high")}: {fmt(high)} {t("weather.low")}:{" "}
                      {fmt(low)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  textAlign: "right",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src={img}
                  alt={Status || "weather"}
                  style={{ width: 96, height: 96, objectFit: "contain" }}
                />
                <Box>
                  <Typography sx={{ textAlign: "end" }}>{Status}</Typography>
                  <Typography sx={{ textAlign: "end" }}>
                    {t("weather.feelsLike")} {fmt(feels)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={(theme: Theme) => ({
                flex: 1.2,
                minWidth: 0,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? theme.palette.background.darkPaper
                    : theme.palette.background.lightPaper,
                borderRadius: 2,
                px: { xs: 2, sm: 3 },
                py: { xs: 2, sm: 3 },
                display: "flex",
                flexDirection: "column",
                gap: 1,
              })}
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{ fontWeight: "bold", fontSize: { xs: 16, sm: 18 } }}
              >
                {t("weather.avgMonthly")}
              </Typography>

              <Box sx={{ mt: 1 }}>
                <svg
                  width="100%"
                  height={h}
                  viewBox={`0 0 ${w} ${h}`}
                  preserveAspectRatio="none"
                >
                  <defs>{gradient}</defs>
                  {[0.2, 0.4, 0.6, 0.8].map((p) => (
                    <line
                      key={p}
                      x1={0}
                      x2={w}
                      y1={p * h}
                      y2={p * h}
                      stroke="currentColor"
                      strokeDasharray="4 6"
                      opacity="0.5"
                    />
                  ))}

                  {points && (
                    <polyline
                      points={points}
                      fill="url(#myGradient)"
                      stroke="currentColor"
                      strokeWidth={2}
                      opacity={0.9}
                    />
                  )}
                </svg>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    mt: 0.5,
                  }}
                >
                  <Typography variant="caption">
                    {months[0]?.label || t("months.jan")}
                  </Typography>
                  <Typography variant="caption">
                    {months[1]?.label || t("months.feb")}
                  </Typography>
                  <Typography variant="caption">
                    {months[2]?.label || t("months.mar")}
                  </Typography>
                  <Typography variant="caption">
                    {months[3]?.label || t("months.apr")}
                  </Typography>
                  <Typography variant="caption">
                    {months[4]?.label || t("months.may")}
                  </Typography>
                  <Typography variant="caption">
                    {months[5]?.label || t("months.jun")}
                  </Typography>
                  <Typography variant="caption">
                    {months[6]?.label || t("months.jul")}
                  </Typography>
                  <Typography variant="caption">
                    {months[7]?.label || t("months.aug")}
                  </Typography>
                  <Typography variant="caption">
                    {months[8]?.label || t("months.sep")}
                  </Typography>
                  <Typography variant="caption">
                    {months[9]?.label || t("months.oct")}
                  </Typography>
                  <Typography variant="caption">
                    {months[10]?.label || t("months.nov")}
                  </Typography>
                  <Typography variant="caption">
                    {months[11]?.label || t("months.dec")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Container>
      )}
    </div>
  );
};

export default WeatherHeader;
