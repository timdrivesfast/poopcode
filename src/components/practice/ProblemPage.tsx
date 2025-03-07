import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import ProblemDescription from './ProblemDescription';
import TestCases from './TestCases';
import SolutionApproaches from './SolutionApproaches';
import SubmissionStatus from './SubmissionStatus';

export default function ProblemPage({ problem }) {
  const [activeTab, setActiveTab] = useState('description');
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(problem.starterCode[language]);
  const [submissionResult, setSubmissionResult] = useState(null);

  const handleRun = async () => {
    // Logic to execute code against example test cases
    // ...
    setSubmissionResult({ status: 'Success', runtime: '42ms', memory: '16.2MB' });
  };

  const handleSubmit = async () => {
    // Logic to submit code against all test cases
    // ...
    setSubmissionResult({ status: 'Accepted', runtime: '48ms', memory: '16.5MB' });
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Left panel: Problem description, approaches, submissions */}
      <div className="w-1/2 border-r border-gray-800 overflow-y-auto">
        <div className="border-b border-gray-800">
          <div className="flex">
            <button 
              onClick={() => setActiveTab('description')} 
              className={`px-4 py-3 font-medium ${activeTab === 'description' ? 'border-b-2 border-white text-white' : 'text-gray-400'}`}
            >
              Problem
            </button>
            <button 
              onClick={() => setActiveTab('approaches')} 
              className={`px-4 py-3 font-medium ${activeTab === 'approaches' ? 'border-b-2 border-white text-white' : 'text-gray-400'}`}
            >
              Approaches
            </button>
            <button 
              onClick={() => setActiveTab('submissions')} 
              className={`px-4 py-3 font-medium ${activeTab === 'submissions' ? 'border-b-2 border-white text-white' : 'text-gray-400'}`}
            >
              Submissions
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'description' && <ProblemDescription problem={problem} />}
          {activeTab === 'approaches' && <SolutionApproaches problem={problem} />}
          {activeTab === 'submissions' && <div>Your past submissions...</div>}
        </div>
      </div>
      
      {/* Right panel: Code editor, language selection, run/submit */}
      <div className="w-1/2 flex flex-col">
        <div className="border-b border-gray-800 p-2 flex justify-between items-center">
          <select 
            value={language} 
            onChange={(e) => {
              setLanguage(e.target.value);
              setCode(problem.starterCode[e.target.value]);
            }}
            className="bg-gray-800 text-white p-2 rounded"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          
          <div>
            <button 
              onClick={handleRun} 
              className="px-4 py-2 bg-gray-700 text-white rounded mr-2"
            >
              Run
            </button>
            <button 
              onClick={handleSubmit} 
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </div>
        
        <CodeEditor code={code} setCode={setCode} language={language} />
        
        {submissionResult && (
          <div className="border-t border-gray-800 p-4">
            <SubmissionStatus result={submissionResult} />
            <TestCases problem={problem} />
          </div>
        )}
      </div>
    </div>
  );
} 