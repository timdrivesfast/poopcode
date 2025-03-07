'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getQuizzes, getCompletedQuizzes } from '@/lib/services/quizService';
import { useAuth } from '@/contexts/AuthContext';

export default function QuizLeaderboardPage() {
  const { user } = useAuth();
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  
  const quizzes = getQuizzes();
  const completedQuizzes = getCompletedQuizzes();
  
  // This would come from a Supabase query in a real implementation
  // For now, we'll just show the current user's data
  const leaderboardEntries = [
    { 
      id: '1', 
      userId: user?.id || 'anonymous', 
      name: user?.email?.split('@')[0] || 'You', 
      quizId: selectedQuiz,
      score: completedQuizzes[selectedQuiz || '']?.score || 0,
      completedAt: new Date().toISOString()
    }
  ];

  const quiz = quizzes.find(q => q.id === selectedQuiz) || quizzes[0];
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Quiz Leaderboard</h1>
      
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Select Quiz
        </label>
        <select
          value={selectedQuiz || ''}
          onChange={(e) => setSelectedQuiz(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
        >
          <option value="">All Quizzes</option>
          {quizzes.map(quiz => (
            <option key={quiz.id} value={quiz.id}>
              {quiz.title} ({quiz.difficulty})
            </option>
          ))}
        </select>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          {selectedQuiz ? quiz?.title : 'All Quizzes'} 
          {selectedQuiz && <span className="ml-2 text-sm text-gray-400">({quiz?.difficulty})</span>}
        </h2>
        
        <table className="w-full">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="text-left py-3">Rank</th>
              <th className="text-left py-3">Player</th>
              <th className="text-left py-3">Score</th>
              <th className="text-left py-3">Completed</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardEntries.length > 0 ? (
              leaderboardEntries.map((entry, index) => (
                <tr key={entry.id} className="border-b border-gray-700">
                  <td className="py-3">{index + 1}</td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        {entry.name.charAt(0).toUpperCase()}
                      </div>
                      {entry.name}
                      {entry.userId === user?.id && (
                        <span className="ml-2 bg-gray-700 px-2 py-0.5 rounded text-xs">You</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`font-bold ${
                      entry.score >= 80 ? 'text-green-400' : 
                      entry.score >= 60 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {entry.score}%
                    </span>
                  </td>
                  <td className="py-3 text-gray-400">
                    {new Date(entry.completedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400">
                  No leaderboard data available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400 mb-4">
            Complete quizzes to appear on the leaderboard!
          </p>
          <Link
            href="/quizzes"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded inline-block"
          >
            Take a Quiz
          </Link>
        </div>
      </div>
    </div>
  );
} 