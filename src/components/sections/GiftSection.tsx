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
      <div className="w-full relative pb-16">
        <div
          className="absolute top-0 left-0 w-full h-full flex justify-center pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <img
            src={background}
            alt="Background decoration"
            className="w-full object-top"
            style={{ height: '100%', maxHeight: '100%', minHeight: '100%' }}
          />
        </div>

        {/* Title */}
        <h2 className="font-cursive text-4xl text-white mb-8 relative z-10 pt-16 tracking-wide">
          Gifting options
        </h2>

        {/* Column Layout */}
        <div className="font-playfair container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* First Polaroid Image */}
            <div className="flex flex-col items-center text-center p-6 md:-mt-80 md:-mx-12 rotate-[-3deg]">
              <img
                src={sunset}
                alt="Sunset"
                className="w-60 md:w-full md:max-w-[18rem] h-auto"
              />
            </div>

            {/* Gift List Column */}
            <div className="font-regular flex flex-col items-center text-center p-6 text-lg font-bold md:col-span-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 w-full max-w-md">
                <ul className="space-y-6 text-left">
                  <li className="flex flex-col space-y-2 text-white">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 flex-shrink-0">
                        <img
                          src={gift1}
                          alt="Revolut Icon"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span>CREDIT CARD</span>
                    </div>
                    <a href='https://revolut.me/sarahlrij' target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400 text-gray-300 ml-12">
                      https://revolut.me/sarahlrij
                    </a>
                  </li>
                  <li className="flex flex-col space-y-2 text-white">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                        <span className="text-lg font-bold" style={{
                          WebkitTextStroke: '1px white',
                        }}>ILS</span>
                      </div>
                      <span>BANK TRASNFER</span>
                    </div>
                    <div className="ml-12 space-y-1 text-sm">
                      <div><span className="text-gray-300">Name:</span> Sara Example</div>
                      <div><span className="text-gray-300">Bank:</span> Bank Hapoalim, 02</div>
                      <div><span className="text-gray-300">Account Number:</span> 123456</div>
                      <div><span className="text-gray-300">Branch:</span> 1234</div>
                      <div><span className="text-gray-300">BIT:</span> 0542119146</div>
                    </div>
                  </li>
                  <li className="flex flex-col space-y-2 text-white">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                        <span className="text-lg font-bold" style={{
                          WebkitTextStroke: '1px white',
                        }}>EUR</span>
                      </div>
                      <span>BANK TRASNFER</span>
                    </div>
                    <div className="ml-12 text-sm">
                      <div><span className="text-gray-300">Name:</span> Sara Spagnoletto</div>
                      <div><span className="text-gray-300">IBAN:</span> IT1234567890</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Second Polaroid Image */}
            <div className="flex flex-col items-center text-center p-6 md:-mt-80 md:-mx-12 rotate-[3deg]">
              <img
                src={polaroid2}
                alt="Gift Polaroid 2"
                className="w-60 md:w-full md:max-w-[18rem] h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftSection; 