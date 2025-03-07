'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock data for practice problems
const PRACTICE_PROBLEMS = {
  'data-structures': [
    {
      id: 'dynamic-array',
      title: 'Design Dynamic Array (Resizable Array)',
      difficulty: 'Easy',
      category: 'data-structures',
      isPremium: false,
      completed: false
    },
    {
      id: 'singly-linked-list',
      title: 'Design Singly Linked List',
      difficulty: 'Easy',
      category: 'data-structures',
      isPremium: false,
      completed: false
    },
    {
      id: 'double-ended-queue',
      title: 'Design Double-ended Queue',
      difficulty: 'Easy',
      category: 'data-structures',
      isPremium: true,
      completed: false
    },
    {
      id: 'binary-search-tree',
      title: 'Design Binary Search Tree',
      difficulty: 'Medium',
      category: 'data-structures',
      isPremium: true,
      completed: false
    },
    {
      id: 'hash-table',
      title: 'Design Hash Table',
      difficulty: 'Medium',
      category: 'data-structures',
      isPremium: true,
      completed: false
    },
    {
      id: 'heap',
      title: 'Design Heap',
      difficulty: 'Medium',
      category: 'data-structures',
      isPremium: true,
      completed: false
    },
    {
      id: 'graph',
      title: 'Design Graph',
      difficulty: 'Medium',
      category: 'data-structures',
      isPremium: true,
      completed: false
    },
    {
      id: 'disjoint-set',
      title: 'Design Disjoint Set (Union-Find)',
      difficulty: 'Medium',
      category: 'data-structures',
      isPremium: true,
      completed: false
    },
    {
      id: 'segment-tree',
      title: 'Design Segment Tree',
      difficulty: 'Hard',
      category: 'data-structures',
      isPremium: true,
      completed: false
    }
  ],
  'sorting': [
    {
      id: 'bubble-sort',
      title: 'Implement Bubble Sort',
      difficulty: 'Easy',
      category: 'sorting',
      isPremium: false,
      completed: false
    },
    {
      id: 'insertion-sort',
      title: 'Implement Insertion Sort',
      difficulty: 'Easy',
      category: 'sorting',
      isPremium: false,
      completed: false
    },
    {
      id: 'merge-sort',
      title: 'Implement Merge Sort',
      difficulty: 'Medium',
      category: 'sorting',
      isPremium: true,
      completed: false
    },
    {
      id: 'quick-sort',
      title: 'Implement Quick Sort',
      difficulty: 'Medium',
      category: 'sorting',
      isPremium: true,
      completed: false
    }
  ],
  'algorithms': [
    {
      id: 'binary-search',
      title: 'Implement Binary Search',
      difficulty: 'Easy',
      category: 'algorithms',
      isPremium: false,
      completed: false
    },
    {
      id: 'dfs',
      title: 'Implement Depth-First Search',
      difficulty: 'Medium',
      category: 'algorithms',
      isPremium: true,
      completed: false
    },
    {
      id: 'bfs',
      title: 'Implement Breadth-First Search',
      difficulty: 'Medium',
      category: 'algorithms',
      isPremium: true,
      completed: false
    }
  ],
  'design-patterns': [
    {
      id: 'singleton',
      title: 'Implement Singleton Pattern',
      difficulty: 'Easy',
      category: 'design-patterns',
      isPremium: true,
      completed: false
    },
    {
      id: 'factory',
      title: 'Implement Factory Pattern',
      difficulty: 'Medium',
      category: 'design-patterns',
      isPremium: true,
      completed: false
    }
  ]
};

export default function PracticePage() {
  const [activeCategory, setActiveCategory] = useState('data-structures');
  
  // Calculate stats
  const allProblems = Object.values(PRACTICE_PROBLEMS).flat();
  const easyProblems = allProblems.filter(p => p.difficulty === 'Easy');
  const mediumProblems = allProblems.filter(p => p.difficulty === 'Medium');
  const hardProblems = allProblems.filter(p => p.difficulty === 'Hard');
  
  // Current category problems
  const categoryProblems = PRACTICE_PROBLEMS[activeCategory as keyof typeof PRACTICE_PROBLEMS] || [];
  
  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800">
        <div className="p-5 border-b border-gray-800">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button className="mt-4 p-2 hover:bg-gray-800 rounded-lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        
        <nav className="p-4">
          <Link href="/practice" className="flex items-center p-4 bg-gray-800 rounded-lg mb-2">
            <span className="font-medium">Practice Problems</span>
            <span className="ml-auto">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </span>
          </Link>
          
          <Link href="/quizzes" className="flex items-center p-4 hover:bg-gray-800 rounded-lg mb-2 transition-colors">
            <span className="font-medium">Quizzes</span>
            <span className="ml-auto">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
            </span>
          </Link>
          
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Stats</h3>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-500">Easy</span>
                <span>0 / {easyProblems.length}</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-yellow-500">Medium</span>
                <span>0 / {mediumProblems.length}</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-yellow-500 h-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-red-500">Hard</span>
                <span>0 / {hardProblems.length}</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 bg-gray-900 p-8">
        {/* Category Tabs */}
        <div className="flex gap-4 mb-12 justify-center">
          <button 
            className={`py-2 px-4 rounded-full flex items-center gap-2 ${activeCategory === 'algorithms' ? 'bg-gray-800' : 'bg-gray-800/50'}`}
            onClick={() => setActiveCategory('algorithms')}
          >
            <span className="text-yellow-400">📊</span>
            <span>Algorithms</span>
          </button>
          
          <button 
            className={`py-2 px-4 rounded-full flex items-center gap-2 ${activeCategory === 'data-structures' ? 'bg-gray-800' : 'bg-gray-800/50'}`}
            onClick={() => setActiveCategory('data-structures')}
          >
            <span className="text-green-400">🌲</span>
            <span>Data Structures</span>
          </button>
          
          <button 
            className={`py-2 px-4 rounded-full flex items-center gap-2 ${activeCategory === 'design-patterns' ? 'bg-gray-800' : 'bg-gray-800/50'}`}
            onClick={() => setActiveCategory('design-patterns')}
          >
            <span className="text-purple-400">🧩</span>
            <span>Design Patterns</span>
          </button>
          
          <button 
            className={`py-2 px-4 rounded-full flex items-center gap-2 ${activeCategory === 'machine-learning' ? 'bg-gray-800' : 'bg-gray-800/50'}`}
            onClick={() => setActiveCategory('machine-learning')}
          >
            <span className="text-orange-400">🤖</span>
            <span>Machine Learning</span>
          </button>
        </div>
        
        {/* Section Title */}
        <h1 className="text-2xl font-bold mb-8 text-center">Implement Data Structures</h1>
        
        {/* Problems Table */}
        <div className="w-full">
          <table className="min-w-full bg-transparent">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-4 px-6 text-left w-24">Status</th>
                <th className="py-4 px-6 text-left">Problem</th>
                <th className="py-4 px-6 text-right">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {categoryProblems.map((problem) => (
                <tr key={problem.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-4 px-6">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-gray-700"
                      checked={problem.completed}
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <Link 
                        href={`/practice/${problem.id}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        {problem.title} 
                      </Link>
                      {problem.isPremium && (
                        <span className="ml-2 text-amber-400">
                          <span className="text-lg">🏆</span>
                        </span>
                      )}
                    </div>
                  </td>
                  <td className={`py-4 px-6 text-right ${
                    problem.difficulty === 'Easy' ? 'text-green-500' : 
                    problem.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {problem.difficulty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Section divider for Sorting category */}
          {activeCategory === 'data-structures' && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8 text-center">Sorting</h2>
              <table className="min-w-full bg-transparent">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-4 px-6 text-left w-24">Status</th>
                    <th className="py-4 px-6 text-left">Problem</th>
                    <th className="py-4 px-6 text-right">Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {PRACTICE_PROBLEMS.sorting.map((problem) => (
                    <tr key={problem.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="py-4 px-6">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 rounded border-gray-700"
                          checked={problem.completed}
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <Link 
                            href={`/practice/${problem.id}`}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            {problem.title} 
                          </Link>
                          {problem.isPremium && (
                            <span className="ml-2 text-amber-400">
                              <span className="text-lg">🏆</span>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className={`py-4 px-6 text-right ${
                        problem.difficulty === 'Easy' ? 'text-green-500' : 
                        problem.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {problem.difficulty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 