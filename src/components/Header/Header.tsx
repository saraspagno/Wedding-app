import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher';
import logo from '../../assets/logo.png';
import { menuItems } from '../../declarations/menuItems';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Menu Button - Always left */}
          <div className="flex-none ml-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <span>Menu</span>
            </button>
          </div>

          {/* Logo - Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <button 
              onClick={handleLogoClick}
              className="flex items-center cursor-pointer"
            >
              <img src={logo} alt="Sara & Gavriel" className="h-24 w-auto" />
            </button>
          </div>

          {/* Login and Language - Always right */}
          <div className="flex-none flex items-center gap-4 mr-4">
            <Link 
              to="/admin" 
              className="no-underline px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Login
            </Link>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute left-4 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 