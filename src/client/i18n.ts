import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // Loads translations from your server/public folder
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    fallbackLng: 'en', // Use English if detected language is not available
    debug: import.meta.env.DEV, // Enable debug output in development
    ns: ['translation'], // Namespace for your translations
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to translation files
    },
  });

export default i18n;
