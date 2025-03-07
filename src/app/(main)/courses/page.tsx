import React from 'react';
import Link from 'next/link';
import { getCourses } from '@/lib/services/courseService';
import CourseTabs from '@/components/courses/CourseTabs';

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Courses</h1>
        <p className="text-gray-400">Master algorithms and data structures with our comprehensive courses</p>
      </div>

      <CourseTabs />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Link href={`/courses/${course.id}`} key={course.id} className="block">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:bg-gray-750 transition duration-300">
              <div className="h-48 bg-gray-700 relative">
                {/* If there's an image URL, display it */}
                {course.image_url && (
                  <img 
                    src={course.image_url} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-2 right-2 bg-gray-900 text-xs px-2 py-1 rounded">
                  {course.difficulty}
                </div>
                {course.is_premium && (
                  <div className="absolute top-2 left-2 bg-yellow-600 text-white text-xs px-2 py-1 rounded">
                    PRO
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">{course.total_lessons} lessons</span>
                  <span className="text-xs text-gray-400">
                    {course.completed_lessons}/{course.total_lessons} completed
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 