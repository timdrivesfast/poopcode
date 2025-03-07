import React, { useState } from 'react';
import { marked } from 'marked';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function SolutionApproaches({ problem }) {
  const [activeApproach, setActiveApproach] = useState(0);
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Solution Approaches</h2>
      
      <div className="flex mb-4 border-b border-gray-800">
        {problem.approaches.map((approach, index) => (
          <button
            key={index}
            className={`px-4 py-2 font-medium ${
              activeApproach === index ? 'border-b-2 border-white text-white' : 'text-gray-400'
            }`}
            onClick={() => setActiveApproach(index)}
          >
            {approach.name}
          </button>
        ))}
      </div>
      
      <div>
        <div className="mb-4">
          <div className="flex items-center gap-4 mb-2">
            <h3 className="text-lg font-semibold">{problem.approaches[activeApproach].name}</h3>
            <span className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-sm">
              {problem.approaches[activeApproach].timeComplexity}
            </span>
            <span className="px-2 py-1 bg-purple-900 text-purple-300 rounded text-sm">
              {problem.approaches[activeApproach].spaceComplexity}
            </span>
          </div>
          
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: marked(problem.approaches[activeApproach].description) }}
          />
        </div>
        
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-2">Implementation:</h4>
          <div className="rounded overflow-hidden">
            <SyntaxHighlighter 
              language="python" 
              style={vscDarkPlus}
              showLineNumbers={true}
              customStyle={{ background: '#1e1e1e', padding: '16px' }}
            >
              {problem.approaches[activeApproach].code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
} 