'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

// Course data
const COURSES = [
  {
    id: 'algorithms-data-structures',
    title: 'Algorithms & Data Structures for Beginners',
    description: 'Learn the foundations of coding interviews.',
    imageUrl: '/course-dsa.png',
    color: 'bg-purple-700',
    duration: '25 hours',
    difficulty: 'Medium',
    path: '/courses/algorithms-data-structures',
  },
  {
    id: 'advanced-algorithms',
    title: 'Advanced Algorithms',
    description: 'Learn every algorithm you would ever need.',
    imageUrl: '/course-advanced.png',
    color: 'bg-red-700',
    duration: '25 hours',
    difficulty: 'Hard',
    path: '/courses/advanced-algorithms',
  },
  {
    id: 'system-design',
    title: 'System Design for Beginners',
    description: 'Learn how to design scalable systems.',
    imageUrl: '/course-system.png',
    color: 'bg-blue-700',
    duration: '20 hours',
    difficulty: 'Medium',
    path: '/courses/system-design',
  }
];

// Lesson data with YouTube videos
const LESSONS = [
  {
    id: 'arrays-intro',
    title: 'Introduction to Arrays',
    description: 'Learn the basics of arrays and how to use them in coding interviews.',
    videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
    duration: '12:30',
    difficulty: 'Easy',
    path: '/courses/arrays-intro',
  },
  {
    id: 'linked-lists',
    title: 'Mastering Linked Lists',
    description: 'Explore singly and doubly linked lists with practical examples.',
    videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
    duration: '15:45',
    difficulty: 'Medium',
    path: '/courses/linked-lists',
  },
  {
    id: 'binary-trees',
    title: 'Binary Trees & BST',
    description: 'Understanding tree data structures and traversal algorithms.',
    videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
    duration: '18:20',
    difficulty: 'Medium',
    path: '/courses/binary-trees',
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming Basics',
    description: 'Learn the fundamentals of DP with step-by-step examples.',
    videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
    duration: '22:15',
    difficulty: 'Hard',
    path: '/courses/dynamic-programming',
  }
];

export default function CoursesPage() {
  const { isPro } = useAuth();
  const [activeTab, setActiveTab] = useState('courses');
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Course/Lessons Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-gray-800 rounded-lg p-1">
          <button
            className={`px-6 py-2 rounded-md flex items-center ${
              activeTab === 'courses' 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('courses')}
          >
            <span className="mr-2">📚</span>
            Courses
          </button>
          <button
            className={`px-6 py-2 rounded-md flex items-center ${
              activeTab === 'lessons' 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('lessons')}
          >
            <span className="mr-2">📝</span>
            Lessons
          </button>
        </div>
      </div>
      
      {/* Page Title and Description */}
      <div className="mb-16">
        <h1 className="text-4xl font-bold mb-4">Data Structures & Algorithms</h1>
        <p className="text-xl text-gray-400 max-w-3xl">
          Follow a structured path to learn all of the core data structures & algorithms. 
          Perfect for coding interview preparation.
        </p>
      </div>
      
      {activeTab === 'courses' ? (
        /* Course Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {COURSES.map(course => (
            <div key={course.id} className="bg-gray-800 rounded-lg overflow-hidden flex flex-col">
              {/* Course Image */}
              <div className={`${course.color} h-48 p-4 flex items-center justify-center`}>
                {course.id === 'algorithms-data-structures' && (
                  <div className="text-center">
                    <div className="text-xl font-bold bg-black bg-opacity-60 p-2 rounded-lg mb-2">
                      Algorithms & Data Structures for Beginners
                    </div>
                    <div className="bg-green-500 p-1 rounded-lg inline-block">Beginners</div>
                  </div>
                )}
                
                {course.id === 'advanced-algorithms' && (
                  <div className="text-center">
                    <div className="text-xl font-bold bg-black bg-opacity-60 p-2 rounded-lg mb-2">
                      Advanced Algorithms
                    </div>
                  </div>
                )}
                
                {course.id === 'system-design' && (
                  <div className="text-center">
                    <div className="text-xl font-bold bg-black bg-opacity-60 p-2 rounded-lg mb-2">
                      System Design
                    </div>
                    <div className="bg-green-500 p-1 rounded-lg inline-block">Beginners</div>
                  </div>
                )}
              </div>
              
              {/* Course Info */}
              <div className="p-6 bg-gray-800 flex-grow">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-400 mb-4">{course.description}</p>
                
                <div className="flex space-x-4 mb-6">
                  <div className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-sm">
                    {course.duration}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    course.difficulty === 'Easy' ? 'bg-green-900 text-green-300' :
                    course.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {course.difficulty}
                  </div>
                </div>
                
                <Link
                  href={course.path}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex justify-center items-center transition-colors"
                >
                  View Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Lesson Cards with Videos */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {LESSONS.map(lesson => (
            <div key={lesson.id} className="bg-gray-800 rounded-lg overflow-hidden">
              {/* Video Embed */}
              <div className="aspect-w-16 aspect-h-9 bg-black">
                <iframe 
                  src={`https://www.youtube.com/embed/${lesson.videoId}`} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              
              {/* Lesson Info */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold">{lesson.title}</h3>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    lesson.difficulty === 'Easy' ? 'bg-green-900 text-green-300' :
                    lesson.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {lesson.difficulty}
                  </div>
                </div>
                
                <p className="text-gray-400 mb-4">{lesson.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="text-gray-500 text-sm">
                    Duration: {lesson.duration}
                  </div>
                  
                  <Link
                    href={lesson.path}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-md text-sm transition-colors"
                  >
                    Full Lesson
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 