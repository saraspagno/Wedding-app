import React from 'react';

const ShabbatSection: React.FC = () => {
  return (
    <section id="shabbat" className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
      <div className="max-w-4xl px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Shabbat Information</h2>
        <div className="prose prose-lg mx-auto">
          {/* Add your Shabbat information here */}
          <p className="text-center text-gray-600">Coming soon...</p>
        </div>
      </div>
    </section>
  );
};

export default ShabbatSection; 