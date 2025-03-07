'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProblem, markProblemComplete } from '@/lib/services/problemService';
import CodeEditor from '@/components/practice/CodeEditor';
import { useAuth } from '@/contexts/AuthContext';

export default function ProblemDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const problemData = getProblem(id);
        if (problemData) {
          setProblem(problemData);
          // Set initial code template based on problem
          setCode(problemData.codeTemplate || '// Write your solution here');
        }
      } catch (error) {
        console.error('Error fetching problem:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProblem();
  }, [id]);
  
  const handleRunCode = () => {
    // In a real app, this would send the code to a server for execution
    setOutput('Running your code...\n\nTest Case 1: Passed\nTest Case 2: Passed\n\nAll test cases passed!');
  };
  
  const handleSubmitSolution = () => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setOutput('Evaluating your solution...\n\nAll test cases passed! Your solution is correct.');
      
      // Mark the problem as complete
      if (user) {
        markProblemComplete(id);
      }
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!problem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-400">Problem not found</h1>
        <p className="mt-4 text-gray-400">The problem you're looking for doesn't exist or has been removed.</p>
        <Link href="/practice" className="mt-4 inline-block text-blue-500 hover:underline">
          Back to all problems
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Problem header */}
      <div className="border-b border-gray-800 bg-gray-900 p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">{problem.title}</h1>
            <span 
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                problem.difficulty === 'Easy' ? 'bg-green-900 text-green-300' :
                problem.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                'bg-red-900 text-red-300'
              }`}
            >
              {problem.difficulty}
            </span>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Problem description */}
        <div className="w-1/2 overflow-y-auto p-6 bg-gray-900">
          <div className="prose prose-sm prose-invert max-w-none">
            <h2 className="text-white">Problem</h2>
            <p className="text-gray-300 whitespace-pre-line">{problem.description}</p>
            
            <h3 className="text-white mt-6">Examples</h3>
            {problem.examples && problem.examples.map((example, index) => (
              <div key={index} className="mt-4 bg-gray-800 p-4 rounded">
                <p className="font-bold text-gray-300">Example {index + 1}:</p>
                <pre className="mt-2 bg-gray-700 p-2 rounded overflow-x-auto">
                  <code className="text-gray-300">Input: {example.input}</code>
                </pre>
                <pre className="mt-2 bg-gray-700 p-2 rounded overflow-x-auto">
                  <code className="text-gray-300">Output: {example.output}</code>
                </pre>
                {example.explanation && (
                  <p className="mt-2 text-gray-400">Explanation: {example.explanation}</p>
                )}
              </div>
            ))}
            
            <h3 className="text-white mt-6">Constraints</h3>
            <ul className="list-disc pl-5 text-gray-300">
              {problem.constraints && problem.constraints.map((constraint, index) => (
                <li key={index}>{constraint}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Code editor */}
        <div className="w-1/2 flex flex-col border-l border-gray-800">
          <div className="flex-1 overflow-hidden">
            <CodeEditor 
              code={code} 
              setCode={setCode} 
              language="javascript"
            />
          </div>
          
          {/* Output panel */}
          <div className="h-1/3 bg-gray-900 border-t border-gray-800 overflow-hidden flex flex-col">
            <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-sm font-medium text-white">Output</h3>
              <div className="space-x-2">
                <button
                  onClick={handleRunCode}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  Run
                </button>
                <button
                  onClick={handleSubmitSolution}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
              <pre className="text-gray-300 whitespace-pre-wrap">{output}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 