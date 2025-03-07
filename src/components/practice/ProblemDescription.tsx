import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ProblemDescriptionProps {
  description: string;
}

export default function ProblemDescription({ description }: ProblemDescriptionProps) {
  return (
    <div className="prose prose-invert prose-pre:bg-gray-800 max-w-none">
      <ReactMarkdown>{description}</ReactMarkdown>
    </div>
  );
} 