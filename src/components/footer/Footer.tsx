import React from 'react';
import { Link } from 'react-router-dom';
import background from '../../assets/background1.jpeg';
import { menuItems } from '../../declarations/menuItems';

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Footer: React.FC = () => {
  return (
    <footer
      className="py-8 mt-auto relative"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Menu Links - Same as Header */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Menu</h3>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-gray-400 transition-colors bg-transparent border-none p-0 m-0 text-left cursor-pointer text-base"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Sara:</span>
                <a href="tel:+1234567890" className="hover:text-gray-400 transition-colors ml-2">
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <span className="font-medium">Sara's Email:</span>
                <a href="mailto:sara@example.com" className="hover:text-gray-400 transition-colors ml-2">
                  sara@example.com
                </a>
              </li>
              <li>
                <span className="font-medium">Gavriel:</span>
                <a href="tel:+1234567891" className="hover:text-gray-400 transition-colors ml-2">
                  +1 (234) 567-891
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <p>
              Join us in celebrating our special day. We're excited to share this moment with you.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p>
            © {new Date().getFullYear()} All Rights Reserved | Developed by Sara Spagnoletto
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 