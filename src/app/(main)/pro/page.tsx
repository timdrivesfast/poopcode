'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function ProPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">
          The best investment in your coding future.
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          We will continue to add a growing amount of content. This includes a full
          computer science curriculum, made up of interactive courses and problems.
        </p>
      </div>

      <div className="w-full max-w-md bg-gray-800 rounded-lg overflow-hidden shadow-xl">
        <div className="flex justify-center pt-8 pb-4">
          <div className="bg-blue-600 rounded-full p-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <div className="text-center px-6 pb-6">
          <h2 className="text-2xl font-bold mb-3">Lifetime Access</h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-gray-400 line-through text-xl">$199</span>
            <span className="text-4xl font-bold">$19.99</span>
          </div>
          <p className="text-gray-400 text-sm">One-time payment</p>
        </div>
        
        <div className="px-8 py-6 border-t border-gray-700">
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Unlimited access to all current & future content</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Premium video explanations for all problems</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Access to exclusive Discord community</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Code execution for all supported languages</span>
            </li>
          </ul>
          
          <div className="mt-8">
            {user ? (
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
                onClick={() => alert("In a real app, this would process payment!")}
              >
                Upgrade Now
              </button>
            ) : (
              <Link
                href="/auth/signin"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
              >
                Sign in to Upgrade
              </Link>
            )}
            
            <p className="text-center text-gray-400 text-sm mt-4">
              30-day money-back guarantee, no questions asked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 