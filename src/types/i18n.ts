import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      wedding_details: 'Wedding Details',
      ceremony: 'Ceremony',
      reception: 'Reception',
      date: 'May 15, 2025'
    }
  },
  it: {
    translation: {
      wedding_details: 'Dettagli del Matrimonio',
      ceremony: 'Cerimonia',
      reception: 'Ricevimento',
      date: '15 Maggio, 2025'
    }
  }
};

// Get language from URL parameter or default to 'en'
const getInitialLanguage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  return langParam === 'it' ? 'it' : 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n; 