import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import { API_URL } from "./config/api";

const BUILTIN_LANGS = ["en", "ua", "sk"];

i18n
  .use(HttpBackend)
  .use(initReactI18next) // Makes i18n work with React
  .init({
    fallbackLng: "en",
    lng: "en",
    backend: {
      loadPath: (lngs, namespaces) => {
        const lng = lngs[0];
        const ns = namespaces[0];
        return BUILTIN_LANGS.includes(lng)
          ? `/locales/${lng}/${ns}.json`
          : `${API_URL}/languages/${lng}/translations`;
      },
    },
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  });

export default i18n;
