import i18n from "i18next";
import translationNL from "./assets/translations/translation-NL.json";
import translationEN from "./assets/translations/translation-EN.json";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: translationEN,
  },
  nl: {
    translation: translationNL,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
});

export default i18n;
