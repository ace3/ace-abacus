import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./resources/en.js";
import id from "./resources/id.js";

const STORAGE_KEY = "abacus.locale.v1";

const getInitialLanguage = () => {
  if (typeof window === "undefined") {
    return "id";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "id" || stored === "en") {
    return stored;
  }

  return "id";
};

const language = getInitialLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      id: { translation: id },
      en: { translation: en }
    },
    lng: language,
    fallbackLng: "id",
    interpolation: {
      escapeValue: false
    }
  });

if (typeof document !== "undefined") {
  document.documentElement.lang = language;
}

i18n.on("languageChanged", (nextLanguage) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
  }

  if (typeof document !== "undefined") {
    document.documentElement.lang = nextLanguage;
  }
});

export const supportedLanguages = ["id", "en"];

export default i18n;
