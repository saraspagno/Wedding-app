import React from 'react';
import background from '../../assets/background2.jpeg';
import shuttle from '../../assets/schedule/shuttle.png';
import cheers from '../../assets/schedule/cheers.png';
import huppa from '../../assets/schedule/huppa.png';
import rome from '../../assets/us/rome_polaroid.png';
import party from '../../assets/us/party_polaroid.png';

const ScheduleSection: React.FC = () => {
  return (
    <section
      id="schedule"
      className="w-full flex flex-col items-center justify-center relative"
    >
      {/* Details Section */}
      <div className="w-full relative pb-32">
        <div
          className="absolute top-0 left-0 w-full h-full flex justify-center pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <img
            src={background}
            className="w-full object-top"
            style={{ height: '100%', maxHeight: '100%', minHeight: '100%' }}
          />
        </div>

        {/* Title */}
        <h2 className="font-playfair text-4xl text-white mb-12 relative z-10 pt-16">Our Day</h2>

        {/* Column Layout */}
        <div className="font-playfair container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

            {/* Rome Image */}
            <div className="flex flex-col items-center text-center p-6 md:-mt-80 rotate-[-3deg]">
              <img
                src={rome}
                alt="Rome"
                className="w-80 h-auto"
              />
            </div>

            {/* Left Column */}
            <div className="flex flex-col items-center text-center text-[0.9rem] p-6">
              <div className="w-20 h-20 mb-4">
                <img
                  src={shuttle}
                  alt="Shuttle Icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Transportation</h3>
              <p className="text-white/90">
                Available from and to Hilton, Tel-Aviv.
                <br />
                Leaving at 16:30.
                <br />
                Returning at 00:00, 00:30 and 1:30.
              </p>
            </div>

            {/* Center Column */}
            <div className="flex flex-col items-center text-center text-[0.9rem] p-6">
              <div className="w-20 h-20 mb-4">
                <img
                  src={cheers}
                  alt="Cheers Icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Reception</h3>
              <p className="text-white/90">
                Celebrate with us at our reception!
                <br />
                Kedma, Neve Ilan.
                <br />
                Starting at 18:00.
              </p>
            </div>

            {/* Right Column */}
            <div className="flex flex-col items-center text-center text-[0.9rem] p-6">
              <div className="w-20 h-20 mb-4">
                <img
                  src={huppa}
                  alt="Huppa Icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Ceremony</h3>
              <p className="text-white/90">
                Join us for our ceremony under the huppa.
                <br />
                Starting at 19:00.
              </p>
            </div>

            {/* Party Image */}
            <div className="flex flex-col items-center text-center p-6 md:-mt-80 rotate-[3deg]">
              <img
                src={party}
                alt="Party"
                className="w-80 h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection; 