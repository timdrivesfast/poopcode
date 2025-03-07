'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProblemDetailPage() {
  const params = useParams();
  const { problemId } = params;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link 
          href="/practice"
          className="inline-flex items-center text-gray-400 hover:text-white"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Practice
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">Problem: {problemId}</h1>
        <div className="prose prose-invert max-w-none">
          <p>This is a placeholder for the problem description. In a real implementation, this would load the details for problem ID: {problemId}</p>
          
          <h2>Example Input:</h2>
          <pre className="bg-gray-900 p-4 rounded">
            {`Input: nums = [1,2,3,4]
Output: [24,12,8,6]`}
          </pre>
          
          <h2>Constraints:</h2>
          <ul>
            <li>2 ≤ nums.length ≤ 10^5</li>
            <li>-30 ≤ nums[i] ≤ 30</li>
            <li>The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Your Solution</h2>
        <div className="mb-4">
          <select className="bg-gray-900 border border-gray-700 rounded-md px-4 py-2 w-40">
            <option>JavaScript</option>
            <option>Python</option>
            <option>Java</option>
            <option>C++</option>
          </select>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4 min-h-80 font-mono text-sm">
          {`// Write your code here
function solution(nums) {
    // Your implementation
}
`}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
} 