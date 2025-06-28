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
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center font-regular mt-24 mb-24 text-lg">
        <h1 className="font-cursive text-4xl font-bold mb-8 tracking-wide">Shabbat Chatan</h1>
        <div className="space-y-4">
          <p className="font-bold">Please join us for a</p>
          <p className="font-bold">SATURDAY KIDDUSH</p>
          <p className="font-bold flex items-center justify-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Synagogue <a href="https://maps.app.goo.gl/CGJb5MVTV9Fk7FT17" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline text-amber-950">Frishman 14, TLV</a>
          </p>
          <div className="mt-8 space-y-2">
            <p className="font-semibold flex items-center justify-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              28.05.2026 - 9:30
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShabbatSection;