import React, { useEffect, useState } from "react";
import WeatherHeader from "../components/WeatherHeader";
import WeatherMain from "../components/WeatherMain";
import NavComponent from "../components/NavComponent";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import {
  getWeatherByCity,
  getTwoWeeksForecast,
  getMonthlyWeather,
} from "../utils/api";
import { CircularProgress, Typography } from "@mui/material";

type Coord = { lat: number; lon: number };

type Weather = {
  cityName: string;
  tzOffsetSec: number;
  coord?: Coord;
  Temperature: number | string;
  high: number | string;
  low: number | string;
  Status?: string;
  img: string;
  feelsLike?: number | string;
};

type ForecastItem = {
  date?: string;
  weekday: string;
  icon: React.ReactNode;
  maxTemp: number;
};

type MonthlyPoint = {
  month?: string;
  label?: string;
  avgTemp?: number;
};

const Dashboard: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyPoint[]>([]);
  const [city, setCity] = useState<string>("Tehran");
  const [loading, setLoading] = useState<boolean>(true);
  const [clock, setClock] = useState<{
    day: string;
    date: string;
    hour: string;
  }>({
    day: "",
    date: "",
    hour: "",
  });

  useEffect(() => {
    if (weather?.tzOffsetSec == null) return;

    const L = i18n.language === "fa" ? "fa-IR" : "en-US";

    const tick = () => {
      const utcNowMs = Date.now();
      const cityNow = new Date(utcNowMs + weather.tzOffsetSec * 1000);
      setClock({
        day: cityNow.toLocaleDateString(L, {
          weekday: "long",
          timeZone: "UTC",
        }),
        date: cityNow.toLocaleDateString(L, {
          month: "short",
          day: "2-digit",
          year: "numeric",
          timeZone: "UTC",
        }),
        hour: cityNow.toLocaleTimeString(L, {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "UTC",
        }),
      });
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [weather?.tzOffsetSec, i18n.language]);

  const fetchAll = async (cityName: string) => {
    try {
      const w: Weather = await getWeatherByCity(cityName);
      setWeather(w);

      const lat = w?.coord?.lat;
      const lon = w?.coord?.lon;

      if (lat != null && lon != null) {
        const [f, m] = await Promise.all([
          getTwoWeeksForecast(lat, lon) as Promise<ForecastItem[]>,
          getMonthlyWeather(lat, lon) as Promise<MonthlyPoint[]>,
        ]);
        setForecast(f);
        setMonthlyData(m);
      } else {
        setForecast([]);
        setMonthlyData([]);
      }
    } catch (err: unknown) {
      console.error(err);
      const message =
        typeof err === "object" && err && "message" in err ? err.message : null;
      alert((message as string) || t("errors.cityNotFound"));
      setForecast([]);
      setMonthlyData([]);
    }
  };

  useEffect(() => {
    fetchAll(city);
  }, [city]);

  useEffect(() => {
    const time = setTimeout(() => {}, 2000);
    setLoading(false);
    return () => clearTimeout(time);
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
            height: "100vh",
            gap: 2,
            px: { xs: 2, sm: 3 },
            fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          {t("loading")}
          <CircularProgress size={28} />
        </Typography>
      ) : (
        <>
          <NavComponent setCity={setCity} />
          {weather && (
            <WeatherHeader
              cityName={weather.cityName}
              day={clock.day}
              date={clock.date}
              hour={clock.hour}
              Temperature={weather.Temperature}
              high={weather.high}
              low={weather.low}
              Status={weather.Status}
              img={weather.img}
              feels={weather.feelsLike}
              monthlyData={monthlyData}
            />
          )}
          <WeatherMain forecast={forecast} />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Dashboard;
