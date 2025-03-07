'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';

type AuthContextValue = {
  signUp: (email: string, password: string) => Promise<{data: any, error: any}>;
  signIn: (email: string, password: string) => Promise<{data: any, error: any}>;
  signOut: () => Promise<void>;
  user: any;
  session: any;
  loading: boolean;
};

export default function SignupForm() {
  console.log('SignupForm rendering');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // The form handleSubmit function needs to be defined outside the Consumer
  // but we'll use the auth from the Consumer inside the JSX
  const handleSubmit = async (e: React.FormEvent, auth: AuthContextValue) => {
    e.preventDefault();
    if (!auth) {
      setError('Authentication not available');
      return;
    }
    
    setError('');
    setMessage('');
    
    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await auth.signUp(email, password);
      
      if (error) {
        setError(error.message);
      } else {
        setMessage('Signup successful! Please check your email to confirm your account.');
        // Optional: redirect if email confirmation not required
        if (data?.session) {
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Consumer>
      {(auth) => {
        console.log('Auth context from consumer:', auth);
        
        if (!auth) {
          return <div className="bg-red-800 text-white p-4 rounded">
            Auth context is not available. Please refresh or try again later.
          </div>;
        }
        
        return (
          <div className="max-w-md w-full mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white mb-6">Sign Up</h2>
            
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-100 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {message && (
              <div className="bg-green-900/50 border border-green-700 text-green-100 px-4 py-3 rounded mb-4">
                {message}
              </div>
            )}
            
            <form onSubmit={(e) => handleSubmit(e, auth)}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                  required
                  minLength={6}
                />
                <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters</p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
} 