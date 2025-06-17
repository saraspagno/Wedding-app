import React from 'react';
import Countdown from '../Countdown';

const DetailsSection: React.FC = () => {
  // You can easily change this date and time
  const weddingDate = new Date('2026-06-11T17:30:00');

  return (
    <section id="details" className="w-full flex items-center justify-center py-8">
      <div className="max-w-4xl px-4">
        <div className="text-center space-y-4">
          <h1 className="font-regular font-light text-5xl md:text-6xl tracking-wide">
            Sara & Gavriel
          </h1>
          <h2 className="font-cursive italic font-light text-4xl md:text-5xl tracking-wider leading-relaxed">
            the wedding
          </h2>
          <p className="font-regular text-2xl md:text-3xl tracking-wide">
            Thursday, May 28, 2026
          </p>
          <p className="font-regular text-2xl md:text-3xl tracking-wide">
            ISRAEL
          </p>
          <div>
            <Countdown targetDate={weddingDate} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsSection; 