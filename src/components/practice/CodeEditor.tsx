'use client';

import React, { useRef, useEffect } from 'react';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
}

export default function CodeEditor({ code, setCode, language }: CodeEditorProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  
  // In a real app, you'd use a library like Monaco Editor or CodeMirror
  // This is a simple textarea-based editor for demonstration purposes
  
  useEffect(() => {
    // Auto-resize the textarea to fit its content
    if (editorRef.current) {
      editorRef.current.style.height = 'auto';
      editorRef.current.style.height = `${editorRef.current.scrollHeight}px`;
    }
  }, [code]);
  
  return (
    <div className="h-full bg-gray-800 p-4">
      <div className="flex justify-between items-center mb-2">
        <select
          className="bg-gray-700 text-white px-2 py-1 rounded text-sm"
          value={language}
          onChange={(e) => console.log('Language changed:', e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        
        <div className="text-xs text-gray-400">
          Auto-save enabled
        </div>
      </div>
      
      <textarea
        ref={editorRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-full min-h-[300px] bg-gray-900 text-gray-200 p-4 font-mono text-sm resize-none focus:outline-none"
        placeholder="Write your code here..."
        spellCheck={false}
      />
    </div>
  );
} 