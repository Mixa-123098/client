import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import { API_URL } from "./config/api";

// All UI copy — built-in languages (ua/en/sk) included — now lives in
// languages.ui_translations in the DB, seeded once from the old static
// files, so it can be corrected from the admin panel without a redeploy.
i18n
  .use(HttpBackend)
  .use(initReactI18next) // Makes i18n work with React
  .init({
    fallbackLng: "en",
    lng: "en",
    backend: {
      loadPath: (lngs) => `${API_URL}/languages/${lngs[0]}/translations`,
    },
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  });

export default i18n;
