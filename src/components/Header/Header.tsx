import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Sara & Gavriel
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/rsvp" 
              className="no-underline px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              RSVP
            </Link>
            <Link 
              to="/admin" 
              className="no-underline px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Login
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 