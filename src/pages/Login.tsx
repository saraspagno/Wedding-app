import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../types/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto my-32 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="font-heading text-primary text-center mb-8 text-4xl">
        {isSignUp ? 'Create Account' : 'Welcome Back'}
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-body text-gray-800 text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 border border-gray-200 rounded font-body text-base transition-colors duration-300 focus:outline-none focus:border-primary"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-body text-gray-800 text-sm">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 border border-gray-200 rounded font-body text-base transition-colors duration-300 focus:outline-none focus:border-primary"
            required
          />
        </div>

        {error && (
          <p className="text-secondary font-body text-sm text-center mt-4">
            {error}
          </p>
        )}

        <button 
          type="submit" 
          className="bg-primary text-white border-none py-4 px-4 rounded font-body text-base cursor-pointer transition-colors duration-300 hover:bg-gray-900 mt-4"
        >
          {isSignUp ? 'Sign Up' : 'Log In'}
        </button>

        <div className="text-center mt-8 font-body text-gray-800">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => setIsSignUp(false)}
                className="bg-transparent border-none text-primary cursor-pointer font-body p-0 underline hover:text-gray-900"
              >
                Log In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={() => setIsSignUp(true)}
                className="bg-transparent border-none text-primary cursor-pointer font-body p-0 underline hover:text-gray-900"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login; 