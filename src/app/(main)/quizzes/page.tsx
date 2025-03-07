'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

// Mock quiz data
const QUIZZES_DATA = [
  {
    id: 'algorithms-basics',
    title: 'Algorithms Basics',
    description: 'Test your knowledge of fundamental algorithms',
    questionCount: 10,
    timeLimit: 15, // minutes
    difficulty: 'Beginner',
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    description: 'Challenge yourself with data structure concepts',
    questionCount: 15,
    timeLimit: 20,
    difficulty: 'Intermediate',
  },
  {
    id: 'big-o-notation',
    title: 'Big-O Notation',
    description: 'Master algorithm complexity analysis',
    questionCount: 12,
    timeLimit: 15,
    difficulty: 'Intermediate',
  },
  {
    id: 'advanced-algorithms',
    title: 'Advanced Algorithms',
    description: 'Tackle complex algorithm challenges',
    questionCount: 8,
    timeLimit: 30,
    difficulty: 'Advanced',
  },
];

export default function QuizzesPage() {
  const { isPro } = useAuth();
  
  return (
    <div className="min-h-screen">
      {/* Left Sidebar Menu - Same as in practice page for consistency */}
      <div className="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-gray-900 border-r border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Menu</h2>
        </div>
        
        <div className="p-4 border-b border-gray-700">
          <Link 
            href="/practice" 
            className="block text-gray-300 hover:text-white"
          >
            Practice Problems
          </Link>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Quizzes</h3>
          <Link href="/quizzes" className="flex items-center text-blue-400">
            <span className="mr-2">⚡</span>
            Coding Quizzes
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="ml-64 p-6">
        {/* Main content header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Coding Quizzes</h1>
            <p className="text-gray-400">Test your coding knowledge with our interactive quizzes. Compete with others and track your progress.</p>
          </div>
          <Link href="/quizzes/leaderboard">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              View Leaderboard
            </button>
          </Link>
        </div>
        
        {/* Quiz cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUIZZES_DATA.map(quiz => (
            <div key={quiz.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
                <p className="text-gray-400 mb-4">{quiz.description}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                  <div>{quiz.questionCount} questions</div>
                  <div>{quiz.timeLimit} min</div>
                  <div className={`
                    ${quiz.difficulty === 'Beginner' ? 'text-green-400' :
                      quiz.difficulty === 'Intermediate' ? 'text-yellow-400' :
                      'text-red-400'}
                  `}>
                    {quiz.difficulty}
                  </div>
                </div>
                
                <Link
                  href={`/quizzes/${quiz.id}`}
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
                >
                  Start Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 