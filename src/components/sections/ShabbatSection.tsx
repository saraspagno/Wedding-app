import React from 'react';
import flowers from '../../assets/shabbat/background3.png';
import background from '../../assets/background1.jpeg';

const ShabbatSection: React.FC = () => {
  return (
    <section
      id="shabbat"
      className="relative w-full flex flex-col items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Flowers frame on top */}
      <div className="absolute top-0 left-0 w-full h-[100px] sm:h-[100px] -mt-12 overflow-hidden pointer-events-none"
        style={{
          backgroundImage: `url(${flowers})`,
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'top',
          backgroundSize: 'auto 100%',
        }}
      ></div>

      {/* Content */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center font-playfair mt-24 mb-24">
        <h1 className="text-3xl font-bold mb-8">Shabbat Chatan</h1>
        <div className="space-y-4">
          <p className="text-[1.1rem]">Please join us for a Saturday Kiddush at</p>
          <p className="text-[1.1rem]">Synagogue Frishman 14 Tel Aviv</p>
          <div className="mt-8 space-y-2">
            <p className="font-semibold text-[1.2rem]">28.05.2026</p>
            <p className="font-semibold text-[1.2rem]">-</p>
            <p className="font-semibold text-[1.2rem]">9:30 AM</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShabbatSection;