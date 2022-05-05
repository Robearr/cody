import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('cody-locale') ?? 'hu',
    fallbackLng: 'hu',
    debug: process.env.NODE_ENV !== 'production',
    react: {
      useSuspense: false
    },
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
    }
  })