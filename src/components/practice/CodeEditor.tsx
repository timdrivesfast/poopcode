'use client';

import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';

interface CodeEditorProps {
  initialCode: string;
  language: string;
  height?: string;
  onChange?: (value: string | undefined) => void;
}

export default function CodeEditor({ 
  initialCode, 
  language, 
  height = "500px",
  onChange 
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  
  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
    if (onChange) {
      onChange(value);
    }
  };
  
  return (
    <div className="rounded overflow-hidden border border-gray-700">
      <Editor
        height={height}
        defaultLanguage={language}
        defaultValue={initialCode}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: 'on',
          wordWrap: 'on',
          theme: 'vs-dark',
        }}
      />
    </div>
  );
} 