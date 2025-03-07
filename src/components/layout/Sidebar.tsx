'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <div className="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-gray-900 border-r border-gray-800 z-10">
      <div className="p-5 border-b border-gray-800">
        <h2 className="text-xl font-bold">Menu</h2>
      </div>
      
      <div className="p-5 border-b border-gray-800">
        <h3 className="text-lg font-medium mb-4">Practice Problems</h3>
        <div className="flex flex-col space-y-2">
          <Link 
            href="/practice" 
            className={`${isActive('/practice') ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
          >
            All Problems
          </Link>
          <Link 
            href="/practice?category=Arrays%20%26%20Hashing" 
            className="text-gray-400 hover:text-gray-300"
          >
            Arrays & Hashing
          </Link>
          <Link 
            href="/practice?category=Two%20Pointers" 
            className="text-gray-400 hover:text-gray-300"
          >
            Two Pointers
          </Link>
          <Link 
            href="/practice?category=Stack" 
            className="text-gray-400 hover:text-gray-300"
          >
            Stack
          </Link>
        </div>
      </div>
      
      <div className="p-5 border-b border-gray-800">
        <Link 
          href="/courses" 
          className={`block ${isActive('/courses') ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
        >
          Courses
        </Link>
      </div>
      
      <div className="p-5 border-b border-gray-800">
        <Link 
          href="/roadmap" 
          className={`block ${isActive('/roadmap') ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
        >
          Roadmap
        </Link>
      </div>
      
      <div className="p-5">
        <Link 
          href="/quizzes" 
          className={`flex items-center ${isActive('/quizzes') ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          Coding Quizzes
        </Link>
      </div>
    </div>
  );
} 