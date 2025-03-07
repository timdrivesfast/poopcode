import React from 'react';
import QuizProgressWidget from '@/components/dashboard/QuizProgressWidget';
import RecentProblemsWidget from '@/components/dashboard/RecentProblemsWidget';
import CourseProgressWidget from '@/components/dashboard/CourseProgressWidget';

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseProgressWidget />
        <QuizProgressWidget />
        <RecentProblemsWidget />
      </div>
    </div>
  );
} 