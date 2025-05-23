import React from 'react';

const DetailsSection: React.FC = () => {
  return (
    <section id="details" className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-4xl px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Wedding Details</h2>
        <div className="prose prose-lg mx-auto">
          {/* Add your details content here */}
          <p className="text-center text-gray-600">Coming soon...</p>
        </div>
      </div>
    </section>
  );
};

export default DetailsSection; 