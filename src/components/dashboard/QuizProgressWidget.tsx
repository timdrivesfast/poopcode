import React from 'react';
import Link from 'next/link';
import { getQuizzes, getCompletedQuizzes } from '@/lib/services/quizService';

export default function QuizProgressWidget() {
  // This would be better as a React Query or SWR fetch in a real app
  const quizzes = getQuizzes();
  const completedQuizzes = getCompletedQuizzes();
  
  const totalQuizzes = quizzes.length;
  const completedCount = Object.keys(completedQuizzes).length;
  
  // Get top 3 quizzes with highest scores
  const topQuizzes = Object.entries(completedQuizzes)
    .sort(([, a], [, b]) => b.score - a.score)
    .slice(0, 3)
    .map(([id, data]) => {
      const quiz = quizzes.find(q => q.id === id);
      return {
        id,
        title: quiz?.title || 'Unknown Quiz',
        score: data.score
      };
    });
  
  return (
    <div className="bg-gray-800 rounded-lg p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Quiz Progress</h2>
        <Link href="/quizzes" className="text-blue-400 text-sm hover:text-blue-300">
          View All
        </Link>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">Completion</span>
          <span>{completedCount} / {totalQuizzes}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${(completedCount / totalQuizzes) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {topQuizzes.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-3">Top Scores</h3>
          <div className="space-y-3">
            {topQuizzes.map(quiz => (
              <div key={quiz.id} className="flex justify-between items-center">
                <Link href={`/quizzes/${quiz.id}`} className="hover:text-blue-400">
                  {quiz.title}
                </Link>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                    <span className={`text-sm font-bold ${
                      quiz.score >= 80 ? 'text-green-400' : 
                      quiz.score >= 60 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {quiz.score}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {topQuizzes.length === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-400 mb-3">You haven't completed any quizzes yet.</p>
          <Link
            href="/quizzes"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded inline-block"
          >
            Take Your First Quiz
          </Link>
        </div>
      )}
    </div>
  );
} 