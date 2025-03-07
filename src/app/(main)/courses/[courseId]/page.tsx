import React from 'react';
import Link from 'next/link';
import { getCourseById } from '@/lib/services/courseService';
import { getLessonsByCourseId } from '@/lib/services/lessonService';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    courseId: string;
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { courseId } = params;
  
  const course = await getCourseById(courseId);
  if (!course) {
    notFound();
  }
  
  const lessons = await getLessonsByCourseId(courseId);
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar with lesson list */}
      <div className="w-full md:w-64 bg-gray-800 p-4 md:h-[calc(100vh-64px)] md:overflow-y-auto">
        <div className="mb-4 pb-4 border-b border-gray-700">
          <h2 className="font-bold text-xl">{course.title}</h2>
          <p className="text-sm text-gray-400 mt-1">{course.description}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Lessons</h3>
          <ul className="space-y-1">
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link 
                  href={`/courses/${courseId}/lesson/${lesson.id}`}
                  className={`flex items-center justify-between p-2 rounded hover:bg-gray-700 ${
                    lesson.is_completed ? 'bg-green-900/20' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border mr-2 flex items-center justify-center ${
                      lesson.is_completed ? 'bg-green-500 border-green-500' : 'border-gray-600'
                    }`}>
                      {lesson.is_completed && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm">{lesson.title}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {lesson.duration && (
                      <span className="text-xs text-gray-500">{lesson.duration} min</span>
                    )}
                    {lesson.is_premium && (
                      <span className="bg-yellow-900 text-yellow-400 px-2 py-0.5 rounded text-xs">PRO</span>
                    )}
                    {!lesson.is_premium && (
                      <span className="bg-green-900 text-green-400 px-2 py-0.5 rounded text-xs">FREE</span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Main content area - Course overview */}
      <div className="flex-1 bg-black p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{course.title}</h1>
          
          <div className="flex items-center space-x-4 mb-8">
            <span className="bg-gray-800 px-3 py-1 rounded text-sm">{course.difficulty}</span>
            <span className="text-gray-400">{lessons.length} lessons</span>
            {course.is_premium && (
              <span className="bg-yellow-600 text-white px-3 py-1 rounded text-sm">Premium Course</span>
            )}
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 mb-6">{course.description}</p>
            
            <div className="bg-gray-800 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
              <p className="text-gray-300 mb-6">
                This course provides a comprehensive introduction to algorithms and data structures.
                Select a lesson from the sidebar to start learning.
              </p>
              
              {lessons.length > 0 && (
                <Link 
                  href={`/courses/${courseId}/lesson/${lessons[0].id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-block"
                >
                  Start First Lesson
                </Link>
              )}
            </div>
            
            {course.is_premium && (
              <div className="bg-gradient-to-r from-yellow-900 to-yellow-700 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Premium Course</h2>
                <p className="text-gray-200 mb-4">
                  Upgrade to Pro to access all lessons in this premium course.
                </p>
                <Link 
                  href="/pro"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded-md inline-block"
                >
                  Upgrade to Pro
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 