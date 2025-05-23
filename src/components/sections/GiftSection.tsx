import React from 'react';

const GiftSection: React.FC = () => {
  return (
    <section id="gifts" className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="max-w-4xl px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Gift Registry</h2>
        <div className="prose prose-lg mx-auto">
          {/* Add your gift registry information here */}
          <p className="text-center text-gray-600">Coming soon...</p>
        </div>
      </div>
    </section>
  );
};

export default GiftSection; 