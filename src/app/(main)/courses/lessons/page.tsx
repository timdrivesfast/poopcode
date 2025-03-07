import React from 'react';
import Link from 'next/link';
import { getAllLessons } from '@/lib/services/lessonService';
import CourseTabs from '@/components/courses/CourseTabs';

export default async function LessonsPage() {
  const lessons = await getAllLessons();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Lessons</h1>
        <p className="text-gray-400">Browse all available lessons across courses</p>
      </div>

      <CourseTabs />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {lessons.map((lesson) => (
          <Link 
            href={`/courses/${lesson.course_id}/lesson/${lesson.id}`} 
            key={lesson.id}
            className="block"
          >
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:bg-gray-750 transition duration-300 h-full flex flex-col">
              <div className="bg-gray-700 p-4 relative">
                {lesson.is_premium && (
                  <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs px-2 py-1 rounded">
                    PRO
                  </div>
                )}
                <h3 className="font-bold text-lg">{lesson.title}</h3>
                <p className="text-sm text-gray-400">From: {lesson.course_title}</p>
              </div>
              
              <div className="p-4 flex-grow">
                {lesson.description && (
                  <p className="text-gray-400 text-sm mb-3">{lesson.description}</p>
                )}
                
                <div className="flex items-center text-sm text-gray-400 mt-auto">
                  {lesson.video_url && (
                    <span className="mr-4 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Video
                    </span>
                  )}
                  
                  {lesson.duration && (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {lesson.duration} min
                    </span>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-700 p-3 flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs ${
                  lesson.is_completed ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'
                }`}>
                  {lesson.is_completed ? 'Completed' : 'Not Started'}  
                </span>
                
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 