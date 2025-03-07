'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-white text-xl font-bold">
              PoopCode
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link 
                href="/practice"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === '/practice' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Practice
              </Link>
              
              <Link 
                href="/roadmap"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname.startsWith('/roadmap') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Roadmap
              </Link>
              
              <Link 
                href="/courses"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname.startsWith('/courses') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Courses
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button 
                  className="flex items-center text-gray-300 hover:text-white"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <span className="mr-2">{user.email?.split('@')[0]}</span>
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white uppercase">
                    {user.email?.[0]}
                  </div>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                    <Link 
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      onClick={() => {
                        signOut();
                        setIsProfileOpen(false);
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link 
                  href="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Log in
                </Link>
                <Link 
                  href="/signup"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 