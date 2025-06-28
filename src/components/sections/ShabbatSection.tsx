import React from 'react';
import flowers from '../../assets/shabbat/background3.png';
import background from '../../assets/background1.jpeg';
import { LocationIcon, ClockIcon } from '../icons';

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
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center font-regular mt-24 mb-24 text-lg">
        <h1 className="font-cursive text-4xl font-bold mb-8 tracking-wide">Shabbat Chatan</h1>
        <div className="space-y-4">
          <p className="font-bold">Please join us for a</p>
          <p className="font-bold">SATURDAY KIDDUSH</p>
          <p className="font-bold flex items-center justify-center gap-1">
            <LocationIcon className="text-amber-950" size="sm" />
            Synagogue <a href="https://maps.app.goo.gl/CGJb5MVTV9Fk7FT17" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline text-amber-950">Frishman 14, TLV</a>
          </p>
          <div className="mt-8 space-y-2">
            <p className="font-semibold flex items-center justify-center gap-1">
              <ClockIcon className="text-amber-950" size="sm" />
              28.05.2026 - 9:30
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShabbatSection;