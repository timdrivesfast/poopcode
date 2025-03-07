'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProblems } from '@/lib/services/problemService';

// Get the display name for a topic ID
function getTopicName(topicId: string): string {
  const topics: Record<string, string> = {
    'arrays-hashing': 'Arrays & Hashing',
    'two-pointers': 'Two Pointers',
    'stack': 'Stack',
    'binary-search': 'Binary Search',
    'sliding-window': 'Sliding Window',
    'linked-list': 'Linked List',
    'trees': 'Trees',
    'tries': 'Tries',
    'heap': 'Heap / Priority Queue',
    'backtracking': 'Backtracking',
    'graphs': 'Graphs',
    '1d-dp': '1-D DP',
    'intervals': 'Intervals',
    'greedy': 'Greedy',
    'advanced-graphs': 'Advanced Graphs',
    '2d-dp': '2-D DP',
    'bit-manipulation': 'Bit Manipulation',
    'math-geometry': 'Math & Geometry',
  };
  
  return topics[topicId] || topicId.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// Get prerequisites for a topic
function getPrerequisites(topicId: string): any[] {
  const prerequisites: Record<string, any[]> = {
    'arrays-hashing': [
      { id: 'dynamic-arrays', name: 'Dynamic Arrays', course: 'Data Structures & Algorithms for Beginners' },
      { id: 'hash-usage', name: 'Hash Usage', course: 'Data Structures & Algorithms for Beginners' },
      { id: 'hash-implementation', name: 'Hash Implementation', course: 'Data Structures & Algorithms for Beginners' },
      { id: 'prefix-sums', name: 'Prefix Sums', course: 'Advanced Algorithms' },
    ],
    // Add prerequisites for other topics as needed
  };
  
  return prerequisites[topicId] || [];
}

export default function TopicPage() {
  const params = useParams();
  const topicId = params.topicId as string;
  const topicName = getTopicName(topicId);
  const prerequisites = getPrerequisites(topicId);
  
  const [problems, setProblems] = useState<any[]>([]);
  
  useEffect(() => {
    // Get problems that match this topic category
    const allProblems = getProblems();
    const topicProblems = allProblems.filter(p => 
      p.category.toLowerCase() === topicName.toLowerCase()
    );
    
    setProblems(topicProblems);
  }, [topicName]);
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Link */}
      <Link href="/roadmap" className="flex items-center text-blue-500 mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
        ESC
      </Link>
      
      {/* Topic Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{topicName}</h1>
        <p className="text-gray-400">({problems.filter(p => p.completed).length} / {problems.length})</p>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-800 rounded-full mb-12">
        <div 
          className="h-full bg-blue-500 rounded-full"
          style={{ 
            width: `${problems.length > 0 ? (problems.filter(p => p.completed).length / problems.length) * 100 : 0}%` 
          }}
        ></div>
      </div>
      
      {/* Prerequisites Section */}
      <h2 className="text-2xl font-bold mb-6 text-center">Prerequisites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {prerequisites.map(prereq => (
          <div 
            key={prereq.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold">{prereq.name}</h3>
              <input 
                type="checkbox" 
                className="h-5 w-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <p className="text-gray-400 text-sm">{prereq.course}</p>
          </div>
        ))}
      </div>
      
      {/* Problems Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-750">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Star</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Problem</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Solution</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {problems.map(problem => (
              <tr key={problem.id} className="hover:bg-gray-750">
                <td className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    checked={problem.completed} 
                    readOnly 
                    className="h-5 w-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-yellow-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                </td>
                <td className="px-6 py-4">
                  <Link 
                    href={`/practice/problems/${problem.slug}`}
                    className="text-blue-500 hover:underline"
                  >
                    {problem.title} {problem.isNeetCode150 && <span className="text-xs text-blue-400">PC75</span>}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    problem.difficulty === 'Easy' ? 'bg-green-900/50 text-green-400' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-900/50 text-yellow-400' :
                    'bg-red-900/50 text-red-400'
                  }`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 