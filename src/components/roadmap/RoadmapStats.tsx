'use client';

import React from 'react';

interface RoadmapStatsProps {
  nodes: any[];
  difficulty: string;
}

export default function RoadmapStats({ nodes, difficulty }: RoadmapStatsProps) {
  const totalNodes = nodes.length;
  const completedNodes = nodes.filter(node => node.completed).length;
  const completionPercentage = totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0;
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg h-full">
      <h2 className="text-xl font-bold mb-6">Roadmap Stats</h2>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Completion</span>
          <span className="font-medium">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Difficulty</span>
          <span 
            className={`font-medium ${
              difficulty === 'Easy' ? 'text-green-500' : 
              difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'
            }`}
          >
            {difficulty || 'Intermediate'}
          </span>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Topics</span>
          <span className="font-medium">{totalNodes}</span>
        </div>
      </div>
    </div>
  );
} 