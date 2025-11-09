import axios from "axios";
import i18n from "../i18n";

export type Coord = { lat: number; lon: number };

export type Weather = {
  cityName: string;
  Temperature: string;
  high: number;
  low: number;
  Status: string;
  img: string;
  tzOffsetSec: number;
  feelsLike: number;
  coord?: Coord;
};

export type ForecastItem = {
  date: string;
  weekday: string;
  maxTemp: number;
  weather: string;
  icon: string;
};

export type MonthlyPoint = {
  month: string;
  label: string | null;
  avgTemp: number | null;
};

const API_KEY = import.meta.env.VITE_WEATHER_KEY as string;

const owApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  timeout: 10000,
});

export async function getWeatherByCity(cityName: string): Promise<Weather> {
  try {
    const { data } = await owApi.get<{
      name: string;
      timezone: number;
      coord?: Coord;
      main: {
        temp: number;
        temp_max: number;
        temp_min: number;
        feels_like: number;
      };
      weather: Array<{ description?: string; icon?: string }>;
    }>("/weather", {
      params: {
        q: cityName,
        units: "metric",
        appid: API_KEY,
        lang: i18n.language === "fa" ? "fa" : "en",
      },
    });

    return {
      cityName: data.name,
      Temperature: `${Math.round(data.main.temp)}°C`,
      high: Math.round(data.main.temp_max),
      low: Math.round(data.main.temp_min),
      Status: data.weather?.[0]?.description ?? "Unknown",
      img: `https://openweathermap.org/img/wn/${
        data.weather?.[0]?.icon ?? "01d"
      }@2x.png`,
      tzOffsetSec: data.timezone,
      feelsLike: Math.round(data.main.feels_like),
      coord: data.coord,
    };
  } catch {
    throw new Error(i18n.t("errors.cityNotFound"));
  }
}

const forecastApi = axios.create({
  baseURL: "https://api.open-meteo.com/v1/forecast",
  timeout: 10000,
});

export async function getTwoWeeksForecast(
  lat: number,
  lon: number
): Promise<ForecastItem[]> {
  try {
    const { data } = await forecastApi.get<{
      daily: {
        time: string[];
        temperature_2m_max: number[];
        weathercode: number[];
      };
    }>("", {
      params: {
        latitude: lat,
        longitude: lon,
        daily: "temperature_2m_max,weathercode",
        forecast_days: 14,
        timezone: "auto",
      },
    });

    const iconMap: Record<number, string> = {
      0: "☀️",
      1: "🌤",
      2: "⛅",
      3: "☁️",
      45: "🌫",
      48: "🌫",
      51: "🌦",
      61: "🌧",
      63: "🌧",
      65: "🌧",
      71: "❄️",
      80: "🌦",
      95: "⛈",
    };

    const L = i18n.language === "fa" ? "fa-IR" : "en-US";

    return data.daily.time.map<ForecastItem>((iso, i) => {
      const code = data.daily.weathercode[i];
      const d = new Date(iso);
      return {
        date: iso,
        weekday: d.toLocaleDateString(L, { weekday: "short" }),
        maxTemp: Math.round(data.daily.temperature_2m_max[i]),
        weather: i18n.t(`wmo.${code}`, { defaultValue: i18n.t("wmo.unknown") }),
        icon: iconMap[code] ?? "❔",
      };
    });
  } catch {
    throw new Error(i18n.t("errors.forecast2wFail"));
  }
}

const archiveApi = axios.create({
  baseURL: "https://archive-api.open-meteo.com/v1/archive",
  timeout: 10000,
});

export async function getMonthlyWeather(
  lat: number,
  lon: number
): Promise<MonthlyPoint[]> {
  try {
    const { data } = await archiveApi.get<{
      daily?: {
        time?: string[];
        temperature_2m_mean?: (number | null)[];
        temperature_2m_max?: (number | null)[];
        temperature_2m_min?: (number | null)[];
      };
    }>("", {
      params: {
        latitude: lat,
        longitude: lon,
        start_date: "2024-01-01",
        end_date: "2024-12-31",
        daily: "temperature_2m_mean,temperature_2m_max,temperature_2m_min",
        timezone: "auto",
        models: "era5",
      },
    });

    const days = data?.daily?.time ?? [];
    const tMean = data?.daily?.temperature_2m_mean ?? [];
    const tMax = data?.daily?.temperature_2m_max ?? [];
    const tMin = data?.daily?.temperature_2m_min ?? [];

    if (!days.length) throw new Error();

    const agg = Array.from({ length: 12 }, () => ({ sum: 0, n: 0 }));

    for (let i = 0; i < days.length; i++) {
      const m = new Date(days[i]).getMonth();
      const v =
        typeof tMean[i] === "number"
          ? tMean[i]
          : typeof tMax[i] === "number" && typeof tMin[i] === "number"
          ? (tMax[i] + tMin[i]) / 2
          : null;

      if (v != null && !Number.isNaN(v)) {
        agg[m].sum += v;
        agg[m].n += 1;
      }
    }

    return agg.map<MonthlyPoint>((m, i) => ({
      month: `2024-${String(i + 1).padStart(2, "0")}`,
      label: null,
      avgTemp: m.n ? Math.round(m.sum / m.n) : null,
    }));
  } catch {
    throw new Error(i18n.t("errors.monthlyFail"));
  }
}
