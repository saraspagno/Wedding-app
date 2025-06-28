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
            alt="Background decoration"
            className="w-full object-top"
            style={{ height: '100%', maxHeight: '100%', minHeight: '100%' }}
          />
        </div>

        {/* Title */}
        <h2 className="font-cursive text-4xl text-white mb-12 relative z-10 pt-16 tracking-wide">Our day</h2>

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
              <ul className="text-white font-semibold space-y-1 text-lg">
                <li>From and to <a href="https://maps.app.goo.gl/kdoVxGmJQtbLiUe27" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400 text-gray-300">Hilton, Tel-Aviv</a></li>
                <li className="flex items-center justify-center gap-1">
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <strong>Departs:</strong> <span className="text-xl font-bold">16:30</span>
                </li>
                <li className="flex items-center justify-center gap-1">
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <strong>Returns:</strong> <span className="text-xl font-bold">00:30, 01:30</span>
                </li>
              </ul>
            </div>

            {/* Reception */}
            <div className="flex flex-col items-center text-center text-base p-6">
              <div className="w-20 h-20 mb-4">
                <img src={cheers} alt="Cheers Icon" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white tracking-wide">RECEPTION</h3>
              <ul className="text-white font-semibold space-y-1 text-lg">
                <li>Venue <a href="https://maps.app.goo.gl/iiBAHSEuLnpYvqQQA" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400 text-gray-300">Gioia Mia</a></li>
                <li className="flex items-center justify-center gap-1">
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Nahshonim
                </li>
                <li className="flex items-center justify-center gap-1">
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <strong>Starts:</strong> <span className="text-xl font-bold">18:00</span>
                </li>
              </ul>
            </div>

            {/* Chuppà */}
            <div className="flex flex-col items-center text-center text-base p-6">
              <div className="w-20 h-20 mb-4">
                <img src={huppa} alt="Chuppà Icon" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white tracking-wide">CHUPPÀ</h3>
              <ul className="text-white font-semibold space-y-1 text-lg">
                <li>Under the chuppà</li>
                <li className="flex items-center justify-center gap-1">
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <strong>Starts:</strong> <span className="text-xl font-bold">19:00</span>
                </li>
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