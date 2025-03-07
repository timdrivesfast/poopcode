import React from 'react';
import Link from 'next/link';
import AlgorithmRoadmap from '@/components/home/AlgorithmRoadmap';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center">
      <div className="w-full lg:w-2/5 lg:pr-16 mb-12 lg:mb-0">
        <h1 className="text-6xl font-bold text-white mb-8">
          <span className="inline-block mr-4">💩</span>
          PoopCode
        </h1>
        <p className="text-3xl text-gray-300 mb-12 leading-relaxed">
          A better way to prepare for coding interviews.
        </p>
        
        <Link href="/pro" className="inline-block">
          <button className="bg-transparent hover:bg-green-600 text-green-500 hover:text-white font-semibold text-lg py-3 px-12 border-2 border-green-500 hover:border-green-600 rounded-full transition-all duration-300">
            Get Pro
          </button>
        </Link>
      </div>

      <div className="w-full lg:w-3/5">
        <AlgorithmRoadmap />
      </div>
    </div>
  );
} 