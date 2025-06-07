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
        <h2 className="font-playfair text-4xl text-white mb-12 relative z-10 pt-16">Gift Registry</h2>

        {/* Column Layout */}
        <div className="font-playfair container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* First Polaroid Image */}
            <div className="flex flex-col items-center text-center p-6 md:-mt-80 rotate-[-3deg]">
              <img
                src={sunset}
                alt="Sunset"
                className="w-80 h-auto"
              />
            </div>

            {/* First Gift Column */}
            <div className="flex flex-col items-center text-center text-[0.9rem] p-6">
              <div className="w-20 h-20 mb-4">
                <img
                  src={gift1}
                  alt="Revolut Icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Revolut</h3>
              <p className="text-white/90">
                Coming soon...
              </p>
            </div>

            {/* Second Gift Column */}
            <div className="flex flex-col items-center text-center text-[0.9rem] p-6">
              <div className="w-20 h-20 mb-4 flex items-center justify-center">
                <div className="relative">
                  <span className="text-4xl font-bold text-transparent" style={{
                    WebkitTextStroke: '2px white',
                  }}>ILS</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Israeli Shekel</h3>
              <p className="text-white/90">
                Coming soon...
              </p>
            </div>

            {/* Third Gift Column */}
            <div className="flex flex-col items-center text-center text-[0.9rem] p-6">
              <div className="w-20 h-20 mb-4 flex items-center justify-center">
                <div className="relative">
                  <span className="text-4xl font-bold text-transparent" style={{
                    WebkitTextStroke: '2px white',
                  }}>EUR</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Euro</h3>
              <p className="text-white/90">
                Coming soon...
              </p>
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