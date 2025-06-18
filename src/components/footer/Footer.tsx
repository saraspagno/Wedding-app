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
            <h2 className="font-cursive text-4xl font-bold mb-4 text-amber-950">Contacts</h2>
            <ul className="space-y-2 text-lg font-regular text-amber-950">
              <li>
                <span>Sara:</span>
                <a href="tel:+1234567890" className="underline hover:no-underline text-amber-950 ml-2">
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <span>Gavriel:</span>
                <a href="tel:+1234567891" className="underline hover:no-underline text-amber-950 ml-2">
                  +1 (234) 567-891
                </a>
              </li>
              <li>
                <span>Email:</span>
                <a href="mailto:saraspagno@gmail.com" className="underline hover:no-underline text-amber-950 ml-2">
                  saraspagno@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Celebration Message */}
          <div className="flex items-center justify-center">
            <p className="text-xl text-center font-bold text-amber-950">
              We can't wait to celebrate with you!
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-amber-800 mt-8 pt-6 text-center">
          <p className="text-amber-950">
            © {new Date().getFullYear()} All Rights Reserved | Developed by Sara Spagnoletto
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 