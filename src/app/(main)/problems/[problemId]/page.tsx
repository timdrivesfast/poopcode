'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Editor } from '@monaco-editor/react';
import { useAuth } from '@/contexts/AuthContext';
import { getProblemById } from '@/lib/services/problemService';
import { supabase } from '@/lib/supabase';
import AuthCheck from '@/components/common/AuthCheck';
import ReactMarkdown from 'react-markdown';

const CODE_TEMPLATES = {
  'python': `class Solution:
    def solve(self, nums):
        # Write your solution here
        pass`,
  'javascript': `/**
 * @param {array} nums
 * @return {boolean}
 */
var solution = function(nums) {
    // Write your solution here
};`,
  'java': `class Solution {
    public boolean solve(int[] nums) {
        // Write your solution here
        return false;
    }
}`
};

export default function ProblemPage() {
  const params = useParams();
  const { problemId } = params;
  const { user } = useAuth();
  const router = useRouter();

  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(CODE_TEMPLATES.python);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('question');

  // Load problem
  useEffect(() => {
    async function loadProblem() {
      const data = await getProblemById(problemId);
      if (data) {
        setProblem(data);
        // Use stored template if available, otherwise use default
        setCode(data.starter_code?.[language] || CODE_TEMPLATES[language]);
      }
    }
    loadProblem();
  }, [problemId, language]);

  // Handle language change
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    setCode(problem?.starter_code?.[newLanguage] || CODE_TEMPLATES[newLanguage]);
  };

  // Handle run code
  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running code...');
    
    try {
      // Simulated execution delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This is a mockup - in a real app, you would send to a backend
      setOutput(`
=== Test Case 1 ===
Input: nums = [1, 2, 2, 3]
Output: true
Expected: true
✅ Passed

=== Test Case 2 ===
Input: nums = [1, 2, 3, 4]
Output: false
Expected: false
✅ Passed

All test cases passed!
Execution time: 12ms
Memory usage: 14.3MB
      `);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!user) {
      router.push('/auth/signin');
      return;
    }
    
    setIsSubmitting(true);
    setOutput('Submitting solution...');
    
    try {
      // Simulated submission delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save submission to database
      await supabase.from('code_submissions').insert({
        user_id: user.id,
        problem_id: problemId,
        language,
        code,
        status: 'Accepted',
        execution_time: 12,
        memory_used: 14300
      });
      
      // Mark problem as solved
      await supabase.from('user_problem_attempts').upsert({
        user_id: user.id, 
        problem_id: problemId,
        is_solved: true,
        last_attempt_date: new Date().toISOString()
      });
      
      setOutput(`
Your solution has been accepted!
All test cases passed.

Runtime: 12ms (faster than 92% of submissions)
Memory: 14.3MB (better than 78% of submissions)
      `);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!problem) {
    return <div className="flex justify-center items-center min-h-screen">Loading problem...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gray-900 border-b border-gray-800 py-2 px-4">
        <div className="flex items-center space-x-4">
          <Link href="/problems" className="text-gray-400 hover:text-white">
            &larr; Problems
          </Link>
          <h1 className="text-lg font-medium">{problem.title}</h1>
          <span className={`px-2 py-1 rounded text-xs ${
            problem.difficulty === 'Easy' ? 'bg-green-900 text-green-300' : 
            problem.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' : 
            'bg-red-900 text-red-300'
          }`}>
            {problem.difficulty}
          </span>
        </div>
      </div>
      
      <div className="flex-grow flex">
        <div className="w-1/2 flex flex-col border-r border-gray-800">
          <div className="bg-gray-900 border-b border-gray-800">
            <div className="flex">
              <button 
                className={`px-4 py-3 font-medium text-sm ${
                  activeTab === 'question' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('question')}
              >
                Question
              </button>
              <button 
                className={`px-4 py-3 font-medium text-sm ${
                  activeTab === 'solution' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('solution')}
              >
                Solution
              </button>
              <button 
                className={`px-4 py-3 font-medium text-sm ${
                  activeTab === 'submissions' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('submissions')}
              >
                Submissions
              </button>
            </div>
          </div>
          
          <div className="overflow-y-auto p-6 flex-grow">
            {activeTab === 'question' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">{problem.title}</h2>
                <div className="mb-6">
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    problem.difficulty === 'Easy' ? 'bg-green-900 text-green-300' : 
                    problem.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' : 
                    'bg-red-900 text-red-300'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
                
                <div className="prose prose-invert prose-code:bg-gray-800 prose-code:p-1 prose-code:rounded max-w-none">
                  <ReactMarkdown>
                    {problem.description}
                  </ReactMarkdown>
                </div>
                
                {problem.constraints && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Constraints:</h3>
                    <div className="bg-gray-800 p-3 rounded">
                      <ReactMarkdown>
                        {problem.constraints}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'solution' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Solution</h2>
                {user ? (
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>
                      {problem.solution || "No solution available yet. Solve it yourself first!"}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="bg-gray-800 p-4 rounded flex flex-col items-center justify-center">
                    <p className="text-center mb-4">Sign in to view the solution</p>
                    <Link 
                      href="/auth/signin"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'submissions' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Submissions</h2>
                {user ? (
                  <div>
                    {/* This would be populated from the database */}
                    <p className="text-gray-400">Your past submissions will appear here.</p>
                  </div>
                ) : (
                  <div className="bg-gray-800 p-4 rounded flex flex-col items-center justify-center">
                    <p className="text-center mb-4">Sign in to view your submissions</p>
                    <Link 
                      href="/auth/signin"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="w-1/2 flex flex-col">
          <div className="bg-gray-900 border-b border-gray-800 p-2 flex justify-between items-center">
            <div>
              <select 
                value={language}
                onChange={handleLanguageChange}
                className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-700"
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-4 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded disabled:opacity-50"
              >
                {isRunning ? 'Running...' : 'Run'}
              </button>
              
              <AuthCheck fallback={
                <button 
                  onClick={() => router.push('/auth/signin')}
                  className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Sign in to Submit
                </button>
              }>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </AuthCheck>
            </div>
          </div>
          
          <div className="flex-grow">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(value) => setCode(value)}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
              }}
            />
          </div>
          
          {output && (
            <div className="bg-gray-800 p-4 border-t border-gray-700 h-1/4 overflow-y-auto">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <span>Console</span>
                <button 
                  className="ml-2 text-gray-400 hover:text-white"
                  onClick={() => setOutput('')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </h3>
              <pre className="text-sm text-gray-300 whitespace-pre-wrap">{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 