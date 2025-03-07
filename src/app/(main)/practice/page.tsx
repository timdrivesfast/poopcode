'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

// Define the Problem interface
interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isCompleted?: boolean;
  isPremium?: boolean;
  hasHint?: boolean;
}

interface CourseCard {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

interface CategoryCard {
  id: string;
  title: string;
  icon: string;
  color: string;
}

export default function PracticePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('core');
  const [activeSection, setActiveSection] = useState('practice'); // 'practice' or 'quizzes'
  
  const courses: CourseCard[] = [
    {
      id: 'algorithms-data-structures',
      title: 'Algorithms & Data Structures for Beginners',
      description: 'Learn fundamental algorithms and data structures',
      image: '/images/courses/algo-ds.png',
      color: 'bg-purple-600'
    },
    {
      id: 'advanced-algorithms',
      title: 'Advanced Algorithms',
      description: 'Master complex algorithms',
      image: '/images/courses/advanced-algo.png',
      color: 'bg-red-600'
    },
    {
      id: 'system-design',
      title: 'System Design for Beginners',
      description: 'Learn how to design scalable systems',
      image: '/images/courses/system-design.png',
      color: 'bg-blue-600'
    }
  ];
  
  const categories: CategoryCard[] = [
    { id: 'algorithms', title: 'Algorithms', icon: '📊', color: 'bg-green-700' },
    { id: 'data-structures', title: 'Data Structures', icon: '🌲', color: 'bg-green-800' },
    { id: 'design-patterns', title: 'Design Patterns', icon: '🔮', color: 'bg-purple-800' },
    { id: 'machine-learning', title: 'Machine Learning', icon: '🤖', color: 'bg-orange-800' }
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 min-h-screen border-r border-gray-800">
        <h2 className="p-4 text-xl font-bold">Menu</h2>
        
        <div className="border-t border-gray-800">
          <button 
            onClick={() => setActiveSection('practice')}
            className={`block w-full text-left p-4 hover:bg-opacity-20 ${activeSection === 'practice' ? 'bg-gray-200 bg-opacity-10' : 'hover:bg-gray-800'}`}
          >
            <h3 className="font-bold mb-4">Practice Problems</h3>
            <div className="flex items-center">
              <span className="text-3xl">≡</span>
            </div>
          </button>
        </div>
        
        <div className="border-t border-gray-800">
          <button 
            onClick={() => setActiveSection('quizzes')}
            className={`block w-full text-left p-4 hover:bg-opacity-20 ${activeSection === 'quizzes' ? 'bg-gray-200 bg-opacity-10' : 'hover:bg-gray-800'}`}
          >
            <h3 className="font-bold mb-4">Quizzes</h3>
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">⚡</span>
            </div>
            
            {activeSection === 'quizzes' && (
              <div className="pl-3">
                <Link 
                  href="/practice/algorithms"
                  className="block py-2 text-gray-400 hover:text-white"
                >
                  Algorithms
                </Link>
                <Link 
                  href="/practice/data-structures"
                  className="block py-2 text-gray-400 hover:text-white"
                >
                  Data Structures
                </Link>
                <Link 
                  href="/practice/design-patterns"
                  className="block py-2 text-gray-400 hover:text-white"
                >
                  Design Patterns
                </Link>
                <Link 
                  href="/quizzes/coding"
                  className="block py-2 text-gray-400 hover:text-white"
                >
                  Coding Quizzes
                </Link>
              </div>
            )}
          </button>
        </div>
        
        <div className="border-t border-gray-800">
          <div className="block p-4 hover:bg-gray-800">
            <h3 className="font-bold mb-2">Stats</h3>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-green-400">Easy</span>
              <span>0 / 19</span>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full mb-3">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-yellow-400">Medium</span>
              <span>0 / 20</span>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full mb-3">
              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-red-400">Hard</span>
              <span>0 / 6</span>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div className="bg-red-400 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      {activeSection === 'practice' ? (
        // Practice Content
        <div className="flex-1 p-6 bg-gray-900">
          <h1 className="text-2xl font-bold mb-8">Courses</h1>
          
          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {courses.map((course) => (
              <Link href={`/courses/${course.id}`} key={course.id} className="block rounded-lg bg-gray-800 overflow-hidden hover:bg-gray-700 transition">
                <div className={`${course.color} p-4 h-28 flex items-center justify-center`}>
                  {/* You would add real images here */}
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{course.id.includes('algo') ? '📈' : '🌐'}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-700 mb-8">
            <div className="flex">
              <button
                className={`px-6 py-3 font-medium ${activeTab === 'core' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-400'}`}
                onClick={() => setActiveTab('core')}
              >
                🌱 Core Skills
              </button>
              <button
                className={`px-6 py-3 font-medium ${activeTab === 'neetcode' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-400'}`}
                onClick={() => setActiveTab('neetcode')}
              >
                🚀 NeetCode 150
              </button>
            </div>
          </div>
          
          {/* Progress Status */}
          <div className="flex justify-end mb-4">
            <div className="text-xl font-medium">0 / 45</div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-700 rounded-full mb-8">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
          </div>
          
          {/* Search */}
          <div className="flex mb-8">
            <div className="relative flex-1 mr-2">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 pl-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-2">🔍</button>
            </div>
            <div className="flex">
              <button className="bg-blue-900 border border-blue-700 rounded-md p-2 px-4 mx-1">📊</button>
              <button className="bg-blue-900 border border-blue-700 rounded-md p-2 px-4 mx-1">🔄</button>
              <button className="bg-red-900 border border-red-700 rounded-md p-2 px-4 mx-1">🗑️</button>
              <button className="bg-gray-800 border border-gray-700 rounded-md p-2 px-4 mx-1">❓</button>
            </div>
          </div>
          
          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/practice/${category.id}`}
                className={`${category.color} rounded-lg p-4 text-center flex flex-col items-center hover:opacity-90 transition`}
              >
                <span className="text-3xl mb-2">{category.icon}</span>
                <span className="font-medium">{category.title}</span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        // Quizzes Content - Simplified version matching screenshot 3
        <div className="flex-1 p-6 bg-gray-900">
          {/* Progress information */}
          <div className="mb-4 text-right">
            <div className="text-xl font-medium">0 / 45</div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-700 rounded-full mb-10">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
          </div>
          
          {/* Info Box (optional) */}
          <div className="bg-gray-800 rounded-lg p-4 mb-10 float-right max-w-md">
            <div className="flex items-start">
              <span className="text-xl mr-2">ℹ️</span>
              <p className="text-gray-300">
                Implement common data structures, algorithms, and design patterns.
              </p>
            </div>
          </div>
          
          {/* Search and tools */}
          <div className="flex mb-10 mt-20 clear-right">
            <div className="relative flex-1 mr-2">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 pl-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-2">🔍</button>
            </div>
            <div className="flex">
              <button className="bg-blue-900 border border-blue-700 rounded-md p-2 px-4 mx-1">📊</button>
              <button className="bg-blue-900 border border-blue-700 rounded-md p-2 px-4 mx-1">🔄</button>
              <button className="bg-red-900 border border-red-700 rounded-md p-2 px-4 mx-1">🗑️</button>
              <button className="bg-gray-800 border border-gray-700 rounded-md p-2 px-4 mx-1">❓</button>
            </div>
          </div>
          
          {/* Category Pills */}
          <div className="flex justify-center flex-wrap gap-4 mt-20">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/practice/${category.id}`} 
                className={`${category.color} rounded-full py-3 px-6 flex items-center hover:opacity-90 transition`}
              >
                <span className="text-xl mr-2">{category.icon}</span>
                <span className="font-medium">{category.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 