'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AlgorithmRoadmap from '@/components/home/AlgorithmRoadmap';
import Link from 'next/link';

// Define problem interfaces
interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  isCompleted?: boolean;
  isPremium?: boolean;
}

interface Quiz {
  id: string;
  title: string;
  category: string;
  questionCount: number;
  isCompleted?: boolean;
}

export default function RoadmapPage() {
  const { user } = useAuth();
  const [activeRoadmap, setActiveRoadmap] = useState('algorithms');
  const [activeTab, setActiveTab] = useState('roadmap'); // 'roadmap', 'quizzes', or 'problems'
  
  // Replace this with your actual roadmap stats or fetch from an API
  const roadmapStats = {
    algorithms: { completed: 2, total: 150 },
    dataStructures: { completed: 0, total: 45 },
    systemDesign: { completed: 0, total: 30 },
  };
  
  // Sample quizzes data
  const quizzes: Quiz[] = [
    { id: 'arrays-basics', title: 'Arrays Basics', category: 'Arrays & Hashing', questionCount: 10 },
    { id: 'two-pointers', title: 'Two Pointers Technique', category: 'Two Pointers', questionCount: 8 },
    { id: 'binary-search', title: 'Binary Search Applications', category: 'Binary Search', questionCount: 12 },
    { id: 'tree-traversal', title: 'Tree Traversal Methods', category: 'Trees', questionCount: 15 },
    { id: 'dynamic-programming', title: 'Introduction to DP', category: '1-D DP', questionCount: 10 },
  ];
  
  // Sample problems data
  const problems: Problem[] = [
    { id: 'two-sum', title: 'Two Sum', difficulty: 'Easy', category: 'Arrays & Hashing', isCompleted: true },
    { id: 'valid-anagram', title: 'Valid Anagram', difficulty: 'Easy', category: 'Arrays & Hashing', isCompleted: true },
    { id: 'contains-duplicate', title: 'Contains Duplicate', difficulty: 'Easy', category: 'Arrays & Hashing' },
    { id: 'valid-palindrome', title: 'Valid Palindrome', difficulty: 'Easy', category: 'Two Pointers' },
    { id: 'binary-search', title: 'Binary Search', difficulty: 'Easy', category: 'Binary Search' },
    { id: 'valid-bst', title: 'Validate Binary Search Tree', difficulty: 'Medium', category: 'Trees' },
    { id: 'climbing-stairs', title: 'Climbing Stairs', difficulty: 'Easy', category: '1-D DP' },
    { id: 'longest-substring', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'Sliding Window' },
    { id: 'merge-intervals', title: 'Merge Intervals', difficulty: 'Medium', category: 'Intervals', isPremium: true },
  ];
  
  // Group problems by category for easier display
  const problemsByCategory = problems.reduce((acc, problem) => {
    if (!acc[problem.category]) {
      acc[problem.category] = [];
    }
    acc[problem.category].push(problem);
    return acc;
  }, {} as Record<string, Problem[]>);
  
  const getRoadmapProgress = (type) => {
    return roadmapStats[type] || { completed: 0, total: 0 };
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Roadmap</h1>
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-full ${activeRoadmap === 'algorithms' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setActiveRoadmap('algorithms')}
          >
            Algorithms
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${activeRoadmap === 'data-structures' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setActiveRoadmap('data-structures')}
          >
            Data Structures
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${activeRoadmap === 'system-design' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setActiveRoadmap('system-design')}
          >
            System Design
          </button>
        </div>
      </div>
      
      {/* Show progress */}
      <div className="mb-4 text-center">
        <span className="text-xl">
          ({getRoadmapProgress(activeRoadmap).completed} / {getRoadmapProgress(activeRoadmap).total})
        </span>
      </div>
      
      <div className="mb-8">
        <div className="w-full bg-gray-700 h-2 rounded-full">
          <div 
            className="bg-blue-500 h-2 rounded-full" 
            style={{ 
              width: `${(getRoadmapProgress(activeRoadmap).completed / getRoadmapProgress(activeRoadmap).total) * 100}%` 
            }}
          ></div>
        </div>
      </div>
      
      {/* Navigation tabs */}
      <div className="border-b border-gray-700 mb-8">
        <div className="flex">
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'roadmap' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('roadmap')}
          >
            🗺️ Roadmap
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'quizzes' ? 'border-b-2 border-yellow-500 text-yellow-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('quizzes')}
          >
            ⚡ Quizzes
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'problems' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('problems')}
          >
            📝 Problems
          </button>
        </div>
      </div>
      
      {/* Roadmap content based on active tab */}
      {activeTab === 'roadmap' && (
        <div className="relative">
          {activeRoadmap === 'algorithms' && (
            <div className="roadmap-container">
              <AlgorithmRoadmap />
            </div>
          )}
          
          {activeRoadmap === 'data-structures' && (
            <div className="text-center p-8">
              <h2 className="text-xl font-bold mb-4">Data Structures Roadmap</h2>
              <p>We're still working on this roadmap. Check back soon!</p>
            </div>
          )}
          
          {activeRoadmap === 'system-design' && (
            <div className="text-center p-8">
              <h2 className="text-xl font-bold mb-4">System Design Roadmap</h2>
              <p>We're still working on this roadmap. Check back soon!</p>
            </div>
          )}
        </div>
      )}
      
      {/* Quizzes tab content */}
      {activeTab === 'quizzes' && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-3 text-left w-20">STATUS</th>
                <th className="p-3 text-left">QUIZ</th>
                <th className="p-3 text-left">CATEGORY</th>
                <th className="p-3 text-right">QUESTIONS</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr key={quiz.id} className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="p-3">
                    <div className="flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        checked={quiz.isCompleted || false}
                        readOnly
                        className="h-5 w-5 rounded border-gray-600"
                      />
                    </div>
                  </td>
                  <td className="p-3">
                    <Link 
                      href={`/quizzes/${quiz.id}`}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {quiz.title}
                    </Link>
                  </td>
                  <td className="p-3 text-gray-300">
                    {quiz.category}
                  </td>
                  <td className="p-3 text-right">
                    {quiz.questionCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Problems tab content */}
      {activeTab === 'problems' && (
        <div>
          {Object.entries(problemsByCategory).map(([category, categoryProblems]) => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-bold mb-4">{category}</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="p-3 text-left w-20">STATUS</th>
                      <th className="p-3 text-left">PROBLEM</th>
                      <th className="p-3 text-right">DIFFICULTY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryProblems.map((problem) => (
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Controls */}
      <div className="flex justify-end mt-8 space-x-4">
        <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
          <span className="text-xl">🔄</span>
        </button>
        <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
          <span className="text-xl">❓</span>
        </button>
        <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
          <span className="text-xl">⚙️</span>
        </button>
      </div>
    </div>
  );
} 