import React from 'react';

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface TestCasesProps {
  examples: Example[];
}

export default function TestCases({ examples }: TestCasesProps) {
  if (!examples || examples.length === 0) {
    return <div className="text-gray-400">No examples available</div>;
  }

  return (
    <div className="space-y-6">
      {examples.map((example, index) => (
        <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="px-4 py-2 bg-gray-700/50 border-b border-gray-700 text-sm font-medium">
            Example {index + 1}
          </div>
          <div className="p-4 space-y-3">
            <div>
              <div className="text-gray-400 text-sm mb-1">Input:</div>
              <pre className="bg-gray-900 p-2 rounded text-sm overflow-x-auto">{example.input}</pre>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Output:</div>
              <pre className="bg-gray-900 p-2 rounded text-sm overflow-x-auto">{example.output}</pre>
            </div>
            {example.explanation && (
              <div>
                <div className="text-gray-400 text-sm mb-1">Explanation:</div>
                <div className="text-sm">{example.explanation}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 