'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserMenu from './UserMenu';
import ProButton from './ProButton';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const pathname = usePathname();
  
  return (
    <nav className="bg-gray-900 border-b border-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and primary navigation */}
        <div className="flex items-center">
          {/* Just the emoji without the text */}
          <Link href="/" className="flex items-center mr-10">
            <span className="text-3xl" role="img" aria-label="PoopCode Logo">💩</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/practice" 
              className={`text-base font-medium ${
                pathname.startsWith('/practice') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Practice
            </Link>
            <Link 
              href="/roadmap" 
              className={`text-base font-medium ${
                pathname.startsWith('/roadmap') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Roadmap
            </Link>
            <Link 
              href="/courses" 
              className={`text-base font-medium ${
                pathname.startsWith('/courses') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Courses
            </Link>
          </div>
        </div>
        
        {/* User actions */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* Use the ProButton component */}
              <ProButton href="/pro" className="text-lg" />
              
              {/* User dropdown */}
              <UserMenu user={user} />
            </>
          ) : (
            <>
              <Link 
                href="/auth/signin" 
                className="text-base text-gray-300 hover:text-white font-medium"
              >
                Log in
              </Link>
              <Link 
                href="/auth/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base font-medium transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 