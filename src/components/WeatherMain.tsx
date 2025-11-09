import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
  type Theme,
} from "@mui/material";
import { useTranslation } from "react-i18next";

type ForecastItem = {
  date?: string;
  weekday: string;
  icon?: React.ReactNode;
  maxTemp: number;
};

type WeatherMainProps = {
  forecast?: ForecastItem[];
};

const WeatherMain: React.FC<WeatherMainProps> = ({ forecast = [] }) => {
  const { t, i18n } = useTranslation();
  const L = i18n.language === "fa" ? "fa-IR" : "en-US";
  const NF = new Intl.NumberFormat(L, { maximumFractionDigits: 0 });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
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
            gap: 2,
            px: { xs: 2, sm: 3 },
            fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
            mt: 5,
          }}
        >
          {t("loading")}
          <CircularProgress size={28} />
        </Typography>
      ) : (
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Stack
            justifyContent="center"
            alignItems="stretch"
            sx={{ mt: { xs: 2, sm: 3 } }}
          >
            <Box
              sx={(theme: Theme) => ({
                width: "100%",
                bgcolor:
                  theme.palette.mode === "dark"
                    ? theme.palette.background.darkPaper
                    : theme.palette.background.lightPaper,
                borderRadius: 3,
                px: { xs: 2, sm: 3 },
                py: { xs: 2, sm: 3 },
                display: "flex",
                flexDirection: "column",
              })}
              component="section"
              aria-labelledby="forecast-heading"
            >
              <Typography
                id="forecast-heading"
                variant="h6"
                component="h2"
                sx={{ fontWeight: "bold", fontSize: { xs: 16, sm: 18 } }}
              >
                {t("forecast.title2w")}
              </Typography>

              <Box
                role="list"
                sx={(theme: Theme) => ({
                  mt: 2,
                  display: "flex",
                  gap: 2,
                  overflowX: "auto",
                  pb: 1,
                  direction: i18n.language === "fa" ? "rtl" : "ltr",
                  scrollSnapType: { xs: "x mandatory", md: "none" },
                  "& > *": { scrollSnapAlign: { xs: "start", md: "none" } },
                  "&::-webkit-scrollbar": { height: 6 },
                  "&::-webkit-scrollbar-thumb": {
                    background:
                      theme.palette.mode === "dark" ? "#39424a" : "#cfd8e0",
                    borderRadius: 8,
                  },
                })}
              >
                {forecast.length === 0 ? (
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0.7,
                    }}
                  >
                    <Typography>{t("forecast.empty")}</Typography>
                  </Box>
                ) : (
                  forecast.map((d, i) => {
                    const key =
                      d.date && !Number.isNaN(Date.parse(d.date))
                        ? d.date
                        : `${i}-${d.weekday}`;

                    return (
                      <Box
                        role="listitem"
                        key={key}
                        aria-label={i === 0 ? t("forecast.today") : d.weekday}
                        sx={(theme) => ({
                          minWidth: { xs: 88, sm: 96, md: 110 },
                          height: { xs: 220, sm: 240, md: 260 },
                          borderRadius: 2.5,
                          px: 2,
                          py: 2,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "space-between",
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255,255,255,0.06)"
                              : "rgba(0,0,0,0.06)",
                        })}
                      >
                        <Box sx={{ textAlign: "center" }}>
                          <Typography
                            variant="body2"
                            sx={{ opacity: 0.8, fontWeight: 600 }}
                          >
                            {i === 0 ? t("forecast.today") : d.weekday}
                          </Typography>
                        </Box>

                        <Box
                          aria-hidden
                          sx={{
                            fontSize: { xs: 34, sm: 38, md: 42 },
                            lineHeight: 1,
                            my: 1,
                          }}
                          title={i === 0 ? t("forecast.today") : d.weekday}
                        >
                          {d.icon ?? "❔"}
                        </Box>

                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, fontSize: { xs: 16, sm: 18 } }}
                        >
                          {NF.format(d.maxTemp)}°C
                        </Typography>
                      </Box>
                    );
                  })
                )}
              </Box>
            </Box>
          </Stack>
        </Container>
      )}
    </div>
  );
};

export default WeatherMain;
