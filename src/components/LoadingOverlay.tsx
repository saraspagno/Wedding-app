import React from 'react';
import logo from '../assets/logo.png';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <img 
        src={logo} 
        alt="Logo" 
        className="w-24 h-24 mb-6 animate-bounce drop-shadow-lg"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.10))' }}
      />
      <div className="text-2xl font-semibold tracking-wide text-gray-700 animate-pulse">
        Loading...
      </div>
    </div>
  );
};

export default LoadingOverlay; 