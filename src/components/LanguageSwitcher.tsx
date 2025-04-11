import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('lang', lng);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('it')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'it' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
        IT
      </button>
    </div>
  );
};

export default LanguageSwitcher; 