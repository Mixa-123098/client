import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(initReactI18next) // Makes i18n work with React
  .init({
    fallbackLng: "en",
    lng: "en",
    supportedLngs: ["en", "ua", "sk"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  });

export default i18n;
