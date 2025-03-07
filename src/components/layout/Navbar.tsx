'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from '@/components/auth/UserMenu';

export default function Navbar() {
  const pathname = usePathname();
  const { user, signOut, isAuthenticated } = useAuth();
  
  const navItems = [
    { label: 'Courses', href: '/courses' },
    { label: 'Problems', href: '/problems' },
    { label: 'Roadmaps', href: '/roadmap' },
  ];
  
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.svg"
                alt="NeetCode Clone"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          
          <div className="flex space-x-1">
            <Link 
              href="/courses" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname.startsWith('/courses') 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Courses
            </Link>
            <Link 
              href="/practice" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname.startsWith('/practice') 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Practice
            </Link>
            <Link 
              href="/roadmap" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname.startsWith('/roadmap') 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Roadmap
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link 
            href="/pro"
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm font-medium"
          >
            Pro
          </Link>
          
          {user ? (
            <UserMenu />
          ) : (
            <Link
              href="/auth/signin"
              className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 