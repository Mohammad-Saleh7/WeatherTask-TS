import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/common.json";
import fa from "./locales/fa/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      fa: { common: fa },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "fa"],
    ns: ["common"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      caches: ["localStorage"],
    },
    react: { useSuspense: false },
  });

const setDir = (lng: string) => {
  const dir = lng === "fa" ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", lng);
};

setDir(i18n.resolvedLanguage || "en");

i18n.on("languageChanged", (lng) => setDir(lng));

export default i18n;
