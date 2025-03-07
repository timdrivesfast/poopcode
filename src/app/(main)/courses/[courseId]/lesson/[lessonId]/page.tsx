import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLessonById } from '@/lib/services/lessonService';
import { getCourseById } from '@/lib/services/courseService';
import LessonContent from '@/components/lessons/LessonContent';
import LessonNavigation from '@/components/lessons/LessonNavigation';
import { getLessonsByCourseId } from '@/lib/services/lessonService';

interface Props {
  params: {
    courseId: string;
    lessonId: string;
  };
}

export default async function LessonPage({ params }: Props) {
  const { courseId, lessonId } = params;
  
  const lesson = await getLessonById(lessonId);
  if (!lesson) {
    notFound();
  }
  
  const course = await getCourseById(courseId);
  if (!course) {
    notFound();
  }
  
  // Get all lessons for navigation
  const lessons = await getLessonsByCourseId(courseId);
  
  // Find current lesson index
  const currentIndex = lessons.findIndex(l => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  
  // Add YouTube video embed function
  function getYoutubeEmbedForCourse(courseId: string, lessonIndex: number = 0): string {
    // Map of course IDs to arrays of YouTube video IDs
    const courseVideos = {
      'algorithms-for-beginners': [
        'BBpAmxU_NQo', // Data Structures Easy to Advanced
        '0IAPZzGSbME', // Data Structures Full Course
        'RBSGKlAvoiM', // Data Structures & Algorithms #1
        'zg9ih6SVACc', // Algorithms: Recursion
      ],
      'python-cheat-sheet': [
        '_uQrJ0TkZlc', // Python Tutorial for Beginners
        'rfscVS0vtbw', // Python Full Course for Beginners
        'kqtD5dpn9C8', // Python for Beginners - Learn Python in 1 Hour
        'HGOBQPFzWKo', // Python OOP Tutorial
      ],
      'big-o-notation': [
        'v4cd1O4zkGw', // Big O Notation - Full Course
        'Mo4vesaut8g', // Introduction to Big O Notation
        'D6xkbGLQesk', // Big O Explained with Examples
        'itn8highTRo', // Big O in 5 Minutes
      ],
      'data-structures-for-interviews': [
        'RBSGKlAvoiM', // Data Structures Easy to Advanced Course
        '41GSinwoMYA', // Coding Interview Prep - Data Structures
        'sVxBVvlnJsM', // 8 Common Data Structures Every Programmer Must Know
        'QUUSvQgMO7k', // Data Structures and Algorithms in 15 Minutes
      ]
    };

    // Default video if course or lesson not found
    const defaultVideo = 'XVv6mJpFOb0'; // General coding interview prep
    
    // Get videos for course or default to empty array
    const videos = courseVideos[courseId] || [];
    
    // Get specific video or first video or default
    const videoId = videos[lessonIndex] || videos[0] || defaultVideo;
    
    // Return embed URL
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-800 md:h-[calc(100vh-64px)] md:overflow-y-auto">
        <div className="p-4">
          <Link 
            href={`/courses/${courseId}`}
            className="text-sm text-gray-400 hover:text-white flex items-center mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to course
          </Link>
          
          <h2 className="font-bold text-lg mb-2">{course.title}</h2>
          
          <div className="mt-6 mb-2">
            <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">Lessons</h3>
            <ul className="space-y-1">
              {lessons.map((l) => (
                <li key={l.id}>
                  <Link 
                    href={`/courses/${courseId}/lesson/${l.id}`}
                    className={`flex items-center text-sm p-2 rounded-md ${
                      l.id === lessonId 
                        ? 'bg-gray-700 text-white' 
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border mr-2 flex items-center justify-center ${
                      l.is_completed ? 'bg-green-500 border-green-500' : 'border-gray-600'
                    }`}>
                      {l.is_completed && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 bg-gray-900 md:h-[calc(100vh-64px)] md:overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
          
          <div className="flex items-center space-x-4 mb-6 text-sm text-gray-400">
            {lesson.duration && (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {lesson.duration} min
              </span>
            )}
            
            {lesson.is_premium && (
              <span className="bg-yellow-900 text-yellow-400 px-2 py-0.5 rounded text-xs">
                PRO
              </span>
            )}
          </div>
          
          {/* Video player using YouTube embed */}
          <div className="mt-4 mb-8">
            <h2 className="text-xl font-bold mb-4">Video Tutorial</h2>
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <iframe 
                className="w-full h-full"
                src={getYoutubeEmbedForCourse(courseId, currentIndex)} 
                title={lesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
          
          {/* Display lesson content */}
          <LessonContent content={lesson.content || ''} />
          
          {/* Lesson navigation */}
          <LessonNavigation 
            courseId={courseId} 
            prevLesson={prevLesson} 
            nextLesson={nextLesson} 
            currentLesson={lesson}
          />
        </div>
      </div>
    </div>
  );
} 