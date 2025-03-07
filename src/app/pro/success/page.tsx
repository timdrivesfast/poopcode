'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function SuccessPage() {
  // Simulate marking the user as Pro
  useEffect(() => {
    localStorage.setItem('user_is_pro', 'true');
  }, []);

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Welcome to PoopCode Pro!</h1>
        
        <p className="text-gray-400 mb-8">
          This is a demo version, so no actual payment was processed. In a real application, this page would confirm your successful subscription.
        </p>
        
        <Link 
          href="/roadmap"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          Start Learning
        </Link>
      </div>
    </div>
  );
} 