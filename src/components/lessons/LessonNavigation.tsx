'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Lesson } from '@/lib/services/lessonService';
import { updateLessonProgress } from '@/lib/services/lessonService';
import AuthCheck from '@/components/common/AuthCheck';

interface LessonNavigationProps {
  courseId: string;
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  currentLesson: Lesson;
}

export default function LessonNavigation({ 
  courseId, 
  prevLesson, 
  nextLesson, 
  currentLesson 
}: LessonNavigationProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [markingComplete, setMarkingComplete] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const handleMarkComplete = async () => {
    if (!user) {
      router.push('/auth/signin');
      return;
    }
    
    setMarkingComplete(true);
    try {
      await updateLessonProgress(user.id, currentLesson.id, true);
      setIsCompleted(true);
      
      // If there's a next lesson, navigate to it
      if (nextLesson) {
        router.push(`/courses/${courseId}/lesson/${nextLesson.id}`);
      }
    } catch (error) {
      console.error('Error marking lesson as complete:', error);
    } finally {
      setMarkingComplete(false);
    }
  };
  
  return (
    <div className="mt-12 pt-6 border-t border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div>
          {prevLesson && (
            <Link 
              href={`/courses/${courseId}/lesson/${prevLesson.id}`}
              className="text-blue-400 hover:text-blue-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Previous: {prevLesson.title}
            </Link>
          )}
        </div>
        
        <div className="my-4 sm:my-0">
          <AuthCheck fallback={
            <Link 
              href="/auth/signin"
              className="px-4 py-2 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700"
            >
              Sign in to track progress
            </Link>
          }>
            <button
              onClick={handleMarkComplete}
              disabled={markingComplete || isCompleted}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                isCompleted 
                  ? 'bg-green-600 cursor-default' 
                  : markingComplete 
                    ? 'bg-blue-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isCompleted 
                ? 'Completed' 
                : markingComplete 
                  ? 'Marking...' 
                  : nextLesson 
                    ? 'Complete & Continue' 
                    : 'Mark as Complete'
              }
            </button>
          </AuthCheck>
        </div>
        
        <div>
          {nextLesson && (
            <Link 
              href={`/courses/${courseId}/lesson/${nextLesson.id}`}
              className="text-blue-400 hover:text-blue-300 flex items-center"
            >
              {nextLesson.title}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 