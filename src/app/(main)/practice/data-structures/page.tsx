'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

// Define the Problem interface
interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isCompleted?: boolean;
  isPremium?: boolean;
  hasHint?: boolean;
}

export default function DataStructuresPracticePage() {
  const { user } = useAuth();
  const [problems] = useState<Problem[]>([
    { id: 'dynamic-array', title: 'Design Dynamic Array (Resizable Array)', difficulty: 'Easy' },
    { id: 'linked-list', title: 'Design Singly Linked List', difficulty: 'Easy' },
    { id: 'double-ended-queue', title: 'Design Double-ended Queue', difficulty: 'Easy', hasHint: true },
    { id: 'binary-search-tree', title: 'Design Binary Search Tree', difficulty: 'Medium', hasHint: true },
    { id: 'hash-table', title: 'Design Hash Table', difficulty: 'Medium', hasHint: true },
    { id: 'heap', title: 'Design Heap', difficulty: 'Medium', hasHint: true },
    { id: 'graph', title: 'Design Graph', difficulty: 'Medium', hasHint: true },
    { id: 'disjoint-set', title: 'Design Disjoint Set (Union-Find)', difficulty: 'Medium', hasHint: true },
    { id: 'segment-tree', title: 'Design Segment Tree', difficulty: 'Hard', hasHint: true },
  ]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Implement Data Structures</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3 text-left w-20">Status</th>
              <th className="p-3 text-left">Problem</th>
              <th className="p-3 text-right">Difficulty</th>
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
                  <Link 
                    href={`/practice/data-structures/${problem.id}`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {problem.title}
                    {problem.hasHint && (
                      <span className="ml-2 text-yellow-500">🏆</span>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 