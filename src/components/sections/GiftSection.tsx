import React from 'react';
import background from '../../assets/background2.jpeg';
import gift1 from '../../assets/gifts/revolut.png';
import sunset from '../../assets/us/sunset_polaroid.png';
import polaroid2 from '../../assets/us/swiss_polaroid.png';

const GiftSection: React.FC = () => {
  return (
    <section
      id="gifts"
      className="w-full flex flex-col items-center justify-center relative"
    >
      {/* Details Section */}
      <div className="w-full relative pb-32">
        <div
          className="absolute top-0 left-0 w-full h-full flex justify-center pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <img
            src={background}
            className="w-full object-top"
            style={{ height: '100%', maxHeight: '100%', minHeight: '100%' }}
          />
        </div>

        {/* Title */}
        <h2 className="font-cursive text-4xl text-white mb-12 relative z-10 pt-16">
          Gifting options
        </h2>

        {/* Column Layout */}
        <div className="font-playfair container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* First Polaroid Image */}
            <div className="flex flex-col items-center text-center p-6 md:-mt-80 rotate-[-3deg]">
              <img
                src={sunset}
                alt="Sunset"
                className="w-80 h-auto"
              />
            </div>

            {/* Gift List Column */}
            <div className="flex flex-col items-center text-center p-6 text-lg">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 w-full max-w-md">
                <ul className="space-y-4 text-left">
                  <li className="flex items-center space-x-4 text-white">
                    <div className="w-8 h-8 flex-shrink-0">
                      <img
                        src={gift1}
                        alt="Revolut Icon"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span> Credit Card </span>
                    <a href='https://revolut.me/sarahlrij' target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400 text-gray-300">https://revolut.me/sarahlrij</a>
                  </li>
                  <li className="flex items-center space-x-4 text-white">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-transparent" style={{
                        WebkitTextStroke: '1px white',
                      }}>ILS</span>
                    </div>
                    <span className="text-lg">Israeli Shekel</span>
                  </li>
                  <li className="flex items-center space-x-4 text-white">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-transparent" style={{
                        WebkitTextStroke: '1px white',
                      }}>EUR</span>
                    </div>
                    <span className="text-lg">Euro</span>
                  </li>
                </ul>
                <p className="text-white/70 text-sm mt-6 italic">
                  Coming soon...
                </p>
              </div>
            </div>

            {/* Second Polaroid Image */}
            <div className="flex flex-col items-center text-center p-6 md:-mt-80 rotate-[3deg]">
              <img
                src={polaroid2}
                alt="Gift Polaroid 2"
                className="w-80 h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftSection; 