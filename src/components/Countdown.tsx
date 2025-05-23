import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-4 mt-6 text-sm">
      <div className="flex flex-col items-center">
        <span className="font-medium text-lg">{timeLeft.days}</span>
        <span className="text-gray-600">days</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-medium text-lg">{timeLeft.hours}</span>
        <span className="text-gray-600">hours</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-medium text-lg">{timeLeft.minutes}</span>
        <span className="text-gray-600">mins</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-medium text-lg">{timeLeft.seconds}</span>
        <span className="text-gray-600">secs</span>
      </div>
    </div>
  );
};

export default Countdown; 