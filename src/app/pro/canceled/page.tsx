'use client';

import React from 'react';
import Link from 'next/link';

export default function CanceledPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Checkout Canceled</h1>
        
        <p className="text-gray-400 mb-8">
          Your Pro subscription checkout was canceled. You can try again anytime!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Return Home
          </Link>
          
          <Link 
            href="#"
            onClick={() => window.history.back()}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
} 