'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getCourseById } from '@/lib/services/courseService';
import { getLessonsByCourseId } from '@/lib/services/lessonService';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    courseId: string;
  };
}

// Mock course data
const COURSES_DATA = {
  'algorithms-data-structures': {
    title: 'Algorithms & Data Structures for Beginners',
    description: 'Learn the foundations of coding interviews with our step-by-step lessons and interactive exercises.',
    color: 'bg-purple-700',
    lessons: [
      {
        id: 'arrays-101',
        title: 'Arrays 101',
        description: 'Learn the basics of arrays and how they work in memory.',
        videoId: 'dQw4w9WgXcQ',
        duration: '12:30',
        slug: 'arrays-101'
      },
      {
        id: 'linked-lists-basics',
        title: 'Linked Lists Basics',
        description: 'Understanding the foundation of linked data structures.',
        videoId: 'dQw4w9WgXcQ',
        duration: '15:45',
        slug: 'linked-lists-basics'
      },
      {
        id: 'python-for-coding-interviews',
        title: 'Python for Coding Interviews',
        description: 'Essential Python concepts for acing technical interviews.',
        videoId: 'dQw4w9WgXcQ',
        duration: '18:20',
        slug: 'python-for-coding-interviews'
      }
    ]
  },
  'advanced-algorithms': {
    title: 'Advanced Algorithms',
    description: 'Take your algorithm skills to the next level with complex problems and optimization techniques.',
    color: 'bg-red-700',
    lessons: [
      {
        id: 'dynamic-programming',
        title: 'Dynamic Programming Deep Dive',
        description: 'Master complex DP problems with this comprehensive guide.',
        videoId: 'dQw4w9WgXcQ',
        duration: '22:15',
        slug: 'dynamic-programming'
      },
      {
        id: 'graph-algorithms',
        title: 'Graph Algorithms Masterclass',
        description: 'From Dijkstra to A*, learn all the essential graph algorithms.',
        videoId: 'dQw4w9WgXcQ',
        duration: '25:40',
        slug: 'graph-algorithms'
      }
    ]
  },
  'system-design': {
    title: 'System Design for Beginners',
    description: 'Learn how to design scalable systems for technical interviews.',
    color: 'bg-blue-700',
    lessons: [
      {
        id: 'system-design-basics',
        title: 'System Design Fundamentals',
        description: 'Learn the core concepts behind designing scalable systems.',
        videoId: 'dQw4w9WgXcQ',
        duration: '20:10',
        slug: 'system-design-basics'
      },
      {
        id: 'database-design',
        title: 'Database Design and Scaling',
        description: 'Choosing the right database and scaling strategies.',
        videoId: 'dQw4w9WgXcQ',
        duration: '18:30',
        slug: 'database-design'
      }
    ]
  }
};

export default function CoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const [course, setCourse] = useState<any>(null);
  
  useEffect(() => {
    // In a real app, you would fetch the course data from an API
    setCourse(COURSES_DATA[courseId]);
  }, [courseId]);
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-400">Loading course...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Course Header */}
      <div className={`${course.color} p-8 rounded-lg mb-8`}>
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-xl opacity-80">{course.description}</p>
      </div>
      
      {/* Lessons List */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Course Lessons</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {course.lessons.map((lesson: any) => (
            <Link href={`/courses/lessons/${lesson.slug}`} key={lesson.id}>
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors">
                {/* Video Thumbnail */}
                <div className="aspect-video bg-gray-900 relative group">
                  <img 
                    src={`https://img.youtube.com/vi/${lesson.videoId}/maxresdefault.jpg`} 
                    alt={lesson.title}
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-blue-600 rounded-full p-3 opacity-90 group-hover:opacity-100 transition-opacity">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" fillRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {lesson.duration}
                  </div>
                </div>
                
                {/* Lesson Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
                  <p className="text-gray-400 text-sm">{lesson.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 