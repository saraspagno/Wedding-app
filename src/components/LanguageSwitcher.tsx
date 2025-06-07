import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import enFlag from '../assets/language/en.png';
import itFlag from '../assets/language/it.png';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', flag: enFlag },
    { code: 'it', flag: itFlag },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('lang', lng);
    setSearchParams(newSearchParams);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1"
      >
        <img 
          src={currentLanguage.flag} 
          alt={`${currentLanguage.code} flag`} 
          className="w-6 h-4 object-cover"
        />
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 ${
                i18n.language === lang.code ? 'bg-gray-50' : ''
              }`}
            >
              <img 
                src={lang.flag} 
                alt={`${lang.code} flag`} 
                className="w-6 h-4 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 