import React from 'react';
import Link from 'next/link';
import AlgorithmRoadmap from '@/components/home/AlgorithmRoadmap';

export default function RoadmapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Algorithm Roadmap</h1>
      <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
        Follow this roadmap to systematically learn data structures and algorithms.
        Start from the top and work your way down through the fundamentals.
      </p>
      
      <div className="flex justify-center mb-12">
        <Link 
          href="/roadmap/arrays-hashing" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
        >
          Start with Arrays & Hashing
        </Link>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <AlgorithmRoadmap />
      </div>
      
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        <Link 
          href="/roadmap/arrays-hashing"
          className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-colors"
        >
          <h2 className="text-xl font-bold mb-2">Arrays & Hashing</h2>
          <p className="text-gray-400">The foundation of data structures, used in most algorithms.</p>
        </Link>
        
        <Link 
          href="/roadmap/two-pointers"
          className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-colors"
        >
          <h2 className="text-xl font-bold mb-2">Two Pointers</h2>
          <p className="text-gray-400">Efficiently solve problems with sorted arrays and linked lists.</p>
        </Link>
        
        <Link 
          href="/roadmap/stack"
          className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-colors"
        >
          <h2 className="text-xl font-bold mb-2">Stack</h2>
          <p className="text-gray-400">Learn LIFO data structures for parsing and backtracking problems.</p>
        </Link>
        
        <Link 
          href="/roadmap/binary-search"
          className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-colors"
        >
          <h2 className="text-xl font-bold mb-2">Binary Search</h2>
          <p className="text-gray-400">Efficiently search sorted arrays with logarithmic time complexity.</p>
        </Link>
        
        <Link 
          href="/roadmap/sliding-window"
          className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-colors"
        >
          <h2 className="text-xl font-bold mb-2">Sliding Window</h2>
          <p className="text-gray-400">Tackle subarray problems with linear time complexity.</p>
        </Link>
        
        <Link 
          href="/roadmap/trees"
          className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-colors"
        >
          <h2 className="text-xl font-bold mb-2">Trees</h2>
          <p className="text-gray-400">Master hierarchical data structures and traversal algorithms.</p>
        </Link>
      </div>
    </div>
  );
} 