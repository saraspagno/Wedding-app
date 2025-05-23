import React from 'react';

const VenueSection: React.FC = () => {
  return (
    <section id="venue" className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-4xl px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Venue</h2>
        <div className="prose prose-lg mx-auto">
          {/* Add your venue content here */}
          <p className="text-center text-gray-600">Coming soon...</p>
        </div>
      </div>
    </section>
  );
};

export default VenueSection; 