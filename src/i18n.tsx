import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationHE from "./locales/he/translation.json";

const resources = {
  he: { translation: translationHE },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: "he",
  fallbackLng: "he",
  interpolation: {
    escapeValue: false,
  },
  supportedLngs: ["en", "he"],
});

export default i18n;
