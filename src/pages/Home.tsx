import React from 'react';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto p-8">
        <section className="flex flex-col items-center gap-8 my-8 lg:my-16">
          <div className="w-full max-w-2xl h-[400px] bg-gray-100 rounded-lg">
            {/* Add your hero image here */}
          </div>
          <div className="text-center">
            <h2 className="font-heading text-5xl md:text-6xl text-primary mb-4">
              Sara & Gavriel
            </h2>
            <p className="font-body text-2xl md:text-3xl text-gray-800 mb-4">
            {t('date')}
            </p>
          </div>
        </section>
        
        <section className="mt-16 text-center">
          <h3 className="font-heading text-primary mb-8 text-3xl">
            {t('wedding_details')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="p-8 bg-gray-50 rounded-lg">
              <h4 className="font-heading text-primary mb-4 text-xl">
                {t('ceremony')}
              </h4>
              <p className="font-body text-gray-800 my-2">4:00 PM</p>
              <p className="font-body text-gray-800 my-2">St. Mary's Church</p>
              <p className="font-body text-gray-800 my-2">123 Wedding Street</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-lg">
              <h4 className="font-heading text-primary mb-4 text-xl">
                {t('reception')}
              </h4>
              <p className="font-body text-gray-800 my-2">6:00 PM</p>
              <p className="font-body text-gray-800 my-2">Grand Hotel</p>
              <p className="font-body text-gray-800 my-2">456 Celebration Ave</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home; 