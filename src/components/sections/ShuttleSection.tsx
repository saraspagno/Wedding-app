import React from 'react';

const ShuttleSection: React.FC = () => {
  return (
    <section id="shuttles" className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="max-w-4xl px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Shuttle Information</h2>
        <div className="prose prose-lg mx-auto">
          {/* Add your shuttle information here */}
          <p className="text-center text-gray-600">Coming soon...</p>
        </div>
      </div>
    </section>
  );
};

export default ShuttleSection; 