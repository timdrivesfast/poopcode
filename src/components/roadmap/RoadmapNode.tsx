'use client';

import React, { useState } from 'react';
import { RoadmapNodeWithProgress, updateNodeProgress } from '@/lib/services/roadmapService';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PROBLEM_DATA } from '@/lib/data/problemSeed';
import Link from 'next/link';

interface RoadmapNodeProps {
  node: RoadmapNodeWithProgress;
  isExpanded: boolean;
  hasChildren: boolean;
  onToggle: () => void;
  level: number;
}

export default function RoadmapNode({ 
  node, 
  isExpanded, 
  hasChildren, 
  onToggle,
  level
}: RoadmapNodeProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [status, setStatus] = useState<'not_started' | 'in_progress' | 'completed'>(node.status);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Update node status
  const handleStatusChange = async (newStatus: 'not_started' | 'in_progress' | 'completed') => {
    if (!isAuthenticated) {
      router.push('/auth/signin');
      return;
    }
    
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      await updateNodeProgress(node.id, newStatus);
      setStatus(newStatus);
    } catch (error) {
      console.error('Error updating node status:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Get background color based on node type and status
  const getBgColor = () => {
    if (node.is_premium && !isAuthenticated) {
      return 'bg-gray-700';
    }
    
    if (status === 'completed') {
      return 'bg-green-800';
    }
    
    if (status === 'in_progress') {
      return 'bg-blue-800';
    }
    
    // Use the node's custom color if available
    if (node.color) {
      return `bg-${node.color}-900`;
    }
    
    // Default background based on level
    const colors = ['bg-blue-900', 'bg-purple-900', 'bg-indigo-900', 'bg-cyan-900'];
    return colors[level % colors.length];
  };
  
  const handleNodeClick = (node) => {
    console.log("Node clicked:", node);
    if (node.type === 'problem' || node.type === 'challenge') {
      let problemId;
      
      // First priority: Use UUID from related_problems if available
      if (node.related_problems && node.related_problems.length > 0) {
        problemId = node.related_problems[0];
      } 
      // Second priority: Convert title to slug format if it matches a known problem
      else {
        const potentialSlug = node.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        
        // Check if this slug exists in our hardcoded problems
        if (PROBLEM_DATA[potentialSlug]) {
          problemId = potentialSlug;
        }
        // If not, fall back to the problems list
        else {
          console.log("No matching problem found, navigating to problems list");
          router.push('/problems');
          return;
        }
      }
      
      console.log("Navigating to:", `/problems/${problemId}`);
      router.push(`/problems/${problemId}`);
    }
  };
  
  // Generate the practice URL based on the node ID
  const practiceUrl = `/practice/${node.id.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <motion.div 
      className={`rounded-lg p-4 ${getBgColor()} border border-gray-700 shadow-md w-full hover:shadow-lg transition-all duration-300 ${
        (node.type === 'problem' || node.type === 'challenge') ? 'cursor-pointer' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => 
        (node.type === 'problem' || node.type === 'challenge') && handleNodeClick(node)
      }
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center">
            {hasChildren && (
              <button 
                onClick={onToggle} 
                className="mr-2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                {isExpanded ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            )}
            <h3 className="font-bold flex items-center gap-2">
              {node.title}
              {node.is_premium && (
                <span className="text-xs bg-yellow-600 px-1.5 py-0.5 rounded text-white font-medium">
                  PRO
                </span>
              )}
              {(node.type === 'problem' || node.type === 'challenge') && (
                <div 
                  className="flex items-center cursor-pointer text-blue-300 hover:text-blue-200 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNodeClick(node);
                  }}
                >
                  <span className="mr-1">📝</span> 
                  <span className="text-sm underline">Solve Problem</span>
                </div>
              )}
            </h3>
          </div>
          {node.description && (
            <p className="text-gray-300 text-sm mt-1">{node.description}</p>
          )}
          {node.estimated_hours && (
            <div className="text-xs text-gray-400 mt-2">
              Estimated time: {node.estimated_hours} hours
            </div>
          )}
        </div>
        
        {node.type !== 'section' && (
          <div className="ml-4">
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => handleStatusChange('not_started')}
                disabled={node.is_premium && !isAuthenticated}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors 
                  ${status === 'not_started' ? 'bg-gray-600 ring-2 ring-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                title="Not Started"
              >
                <span className="sr-only">Not Started</span>
              </button>
              
              <button 
                onClick={() => handleStatusChange('in_progress')}
                disabled={node.is_premium && !isAuthenticated}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors 
                  ${status === 'in_progress' ? 'bg-blue-600 ring-2 ring-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                title="In Progress"
              >
                <span className="sr-only">In Progress</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button 
                onClick={() => handleStatusChange('completed')}
                disabled={node.is_premium && !isAuthenticated}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors 
                  ${status === 'completed' ? 'bg-green-600 ring-2 ring-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                title="Completed"
              >
                <span className="sr-only">Completed</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="node-actions mt-2">
        <Link 
          href={practiceUrl}
          className="btn btn-sm btn-primary"
        >
          Practice Problems
        </Link>
      </div>
    </motion.div>
  );
} 