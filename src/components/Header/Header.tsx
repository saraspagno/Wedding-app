import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow-md">
      <Link to="/" className="text-primary no-underline">
        <h1 className="m-0 text-2xl font-heading">Wedding Logo</h1>
      </Link>
      <nav className="flex gap-4 items-center w-full md:w-auto justify-center">
        <Link 
          to="/rsvp" 
          className="no-underline px-4 py-2 rounded bg-secondary text-white font-body transition-all duration-300 hover:bg-red-600"
        >
          RSVP
        </Link>
        <Link 
          to="/admin" 
          className="no-underline px-4 py-2 rounded border border-primary text-primary font-body transition-all duration-300 hover:bg-primary hover:text-white"
        >
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header; 