import React from 'react';

const DetailsSection: React.FC = () => {
  return (
    <section id="details" className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-4xl px-4">
        <div className="font-walbaum text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-light tracking-wide">
            Sara & Gavriel
          </h1>
          <h2 className="text-3xl md:text-4xl font-light tracking-wide">
            the wedding
          </h2>
          <p className="text-2xl md:text-3xl font-light tracking-wide">
            Thursday, June 11, 2026
          </p>
          <p className="text-2xl md:text-3xl font-light tracking-wide">
            ISRAEL
          </p>
        </div>
      </div>
    </section>
  );
};

export default DetailsSection; 