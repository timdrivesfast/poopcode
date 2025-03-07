'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CourseTabs() {
  const pathname = usePathname();
  
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <Link 
          href="/courses" 
          className={`inline-block px-8 py-3 ${
            pathname === '/courses' ? 'bg-white text-gray-900' : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          <span className="flex items-center">
            <span className="mr-2">📚</span>
            Courses
          </span>
        </Link>
        
        <Link 
          href="/courses/lessons" 
          className={`inline-block px-8 py-3 ${
            pathname === '/courses/lessons' ? 'bg-white text-gray-900' : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          <span className="flex items-center">
            <span className="mr-2">📝</span>
            Lessons
          </span>
        </Link>
      </div>
    </div>
  );
} 