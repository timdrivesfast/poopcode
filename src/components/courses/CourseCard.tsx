import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCourseImage } from '@/lib/data/courseImages';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  lessonCount: number;
  completedCount: number;
  isPro?: boolean;
}

export default function CourseCard({
  id,
  title,
  description,
  difficulty,
  lessonCount,
  completedCount,
  isPro = false
}: CourseCardProps) {
  // Get a relevant image for this course
  const imageUrl = getCourseImage(title);
  
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02]">
      {/* Course image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        {isPro && (
          <div className="absolute top-3 right-3 bg-amber-500 text-black font-bold px-2 py-1 rounded text-xs">
            PRO
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-24"></div>
      </div>
      
      <div className="p-4">
        {/* Difficulty badge */}
        <div className="mb-3">
          <span className={`inline-block px-2 py-1 text-xs rounded ${
            difficulty === 'Beginner' ? 'bg-green-900 text-green-300' :
            difficulty === 'Intermediate' ? 'bg-yellow-900 text-yellow-300' :
            'bg-red-900 text-red-300'
          }`}>
            {difficulty}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        
        {/* Description */}
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        
        {/* Progress */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">{completedCount}/{lessonCount} lessons</span>
          
          <Link 
            href={`/courses/${id}`}
            className="text-blue-400 hover:text-blue-300"
          >
            Continue →
          </Link>
        </div>
      </div>
    </div>
  );
} 