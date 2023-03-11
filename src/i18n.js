import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEn from 'locales/en/translation.json';
import validationsEn from 'locales/en/validations.json';
import translationAr from 'locales/ar/translation.json';
import validationsAr from 'locales/ar/validations.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: translationEn,
    validations: validationsEn,
  },
  ar: {
    translation: translationAr,
    validations: validationsAr,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'ar',
    fallbackLng: ['ar', 'en'],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
