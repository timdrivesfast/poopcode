'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isCompleted?: boolean;
  isPremium?: boolean;
  hasHint?: boolean;
}

export default function AlgorithmsPracticePage() {
  const { user } = useAuth();
  const [problems] = useState<Problem[]>([
    { id: 'two-sum', title: 'Two Sum', difficulty: 'Easy' },
    { id: 'valid-anagram', title: 'Valid Anagram', difficulty: 'Easy' },
    { id: 'contains-duplicate', title: 'Contains Duplicate', difficulty: 'Easy' },
    { id: 'valid-sudoku', title: 'Valid Sudoku', difficulty: 'Medium', isPremium: true },
    // Add more algorithm problems as needed
  ]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Arrays & Hashing</h1>
      <div className="text-center text-gray-400 mb-2">(0 / 4)</div>
      
      <div className="w-full h-2 bg-gray-700 rounded-full mb-8">
        <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Prerequisites</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between">
            <h3>Dynamic Arrays</h3>
            <input type="checkbox" className="h-5 w-5" />
          </div>
          <p className="text-sm text-gray-400">Data Structures & Algorithms for Beginners</p>
        </div>
        {/* Add more prerequisites as needed */}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3 text-left w-20">STATUS</th>
              <th className="p-3 text-left w-20">STAR</th>
              <th className="p-3 text-left">PROBLEM</th>
              <th className="p-3 text-right">DIFFICULTY</th>
              <th className="p-3 text-right">SOLUTION</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="p-3">
                  <div className="flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      checked={problem.isCompleted || false}
                      readOnly
                      className="h-5 w-5 rounded border-gray-600"
                    />
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center">
                    <button className="text-gray-400 hover:text-yellow-500">★</button>
                  </div>
                </td>
                <td className="p-3">
                  <Link 
                    href={`/practice/problem/${problem.id}`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {problem.title}
                    {problem.isPremium && (
                      <span className="ml-2 text-yellow-500">PRO</span>
                    )}
                  </Link>
                </td>
                <td className="p-3 text-right">
                  <span 
                    className={`px-3 py-1 rounded-full text-sm ${
                      problem.difficulty === 'Easy' 
                        ? 'bg-green-900 text-green-400' 
                        : problem.difficulty === 'Medium'
                          ? 'bg-yellow-900 text-yellow-400'
                          : 'bg-red-900 text-red-400'
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button className="text-gray-400 hover:text-white">👁️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 