'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

interface RoadmapTreeProps {
  roadmap: Roadmap;
}

export default function RoadmapTree({ roadmap }: RoadmapTreeProps) {
  // Simplified version of the node tree
  useEffect(() => {
    // Your existing code
  }, [roadmap.nodes]); // Add nodes to the dependency array

  return (
    <div className="relative">
      <div className="flex flex-wrap justify-center gap-4">
        {roadmap.nodes.map((node, index) => (
          <div 
            key={index}
            className="flex flex-col items-center"
          >
            <Link 
              href={`/roadmap/${node.id}`}
              className={`bg-indigo-600 text-white px-4 py-2 rounded-lg 
                ${node.completed ? 'bg-green-600' : ''}
                ${node.prerequisites?.some((p: any) => !p.completed) ? 'opacity-50' : ''}
              `}
            >
              {node.title}
            </Link>
            
            {index < roadmap.nodes.length - 1 && (
              <div className="h-8 w-px bg-gray-600 my-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 