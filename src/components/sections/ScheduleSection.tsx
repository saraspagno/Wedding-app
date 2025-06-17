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
        <h2 className="font-regular text-4xl text-white mb-12 relative z-10 pt-16">Our Day</h2>

        {/* Column Layout */}
        <div className="font-regular container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

            {/* Rome Image */}
            <div className="flex flex-col items-center text-center p-6 md:-mt-80 rotate-[-3deg]">
              <img
                src={rome}
                alt="Rome"
                className="w-80 h-auto"
              />
            </div>

            {/* Shuttles */}
            <div className="flex flex-col items-center text-center text-base p-6">
              <div className="w-20 h-20 mb-4">
                <img src={shuttle} alt="Shuttle Icon" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white tracking-wide">SHUTTLES</h3>
              <ul className="text-white font-medium space-y-1">
                <li>From and to <a href="https://maps.app.goo.gl/kdoVxGmJQtbLiUe27" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200"><strong>Hilton, Tel-Aviv</strong></a></li>
                <li><strong>Departs:</strong> <span className="text-lg font-semibold">16:30</span></li>
                <li><strong>Returns:</strong> <span className="text-lg font-semibold">00:30, 01:30</span></li>
              </ul>
            </div>

            {/* Reception */}
            <div className="flex flex-col items-center text-center text-base p-6">
              <div className="w-20 h-20 mb-4">
                <img src={cheers} alt="Cheers Icon" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white tracking-wide">RECEPTION</h3>
              <ul className="text-white font-medium space-y-1">
                <li>Venue <a href="https://maps.app.goo.gl/iiBAHSEuLnpYvqQQA" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200"><strong>Gioia Mia</strong></a></li>
                <li>Nahshonim</li>
                <li><strong>Starts:</strong> <span className="text-lg font-semibold">18:00</span></li>
              </ul>
            </div>

            {/* Chuppà */}
            <div className="flex flex-col items-center text-center text-base p-6">
              <div className="w-20 h-20 mb-4">
                <img src={huppa} alt="Chuppà Icon" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white tracking-wide">CHUPPÀ</h3>
              <ul className="text-white font-medium space-y-1">
                <li>Under the chuppà</li>
                <li><strong>Starts:</strong> <span className="text-lg font-semibold">19:00</span></li>
              </ul>
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