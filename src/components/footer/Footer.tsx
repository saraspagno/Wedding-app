import React from 'react';
import background from '../../assets/background1.jpeg';

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
        <div className="font-playfair grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contacts</h3>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Sara:</span>
                <a href="tel:+1234567890" className="hover:text-gray-400 transition-colors ml-2">
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <span className="font-medium">Email:</span>
                <a href="mailto:saraspagno@gmail.com" className="hover:text-gray-400 transition-colors ml-2">
                  saraspagno@gmail.com
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

          {/* Celebration Message */}
          <div className="flex items-center justify-center">
            <p className="text-xl text-center">
              We can't wait to celebrate with you!
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