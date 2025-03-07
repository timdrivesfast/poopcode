'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { getRoadmapById, getRoadmapNodes } from '@/lib/services/roadmapService';
import RoadmapTree from '@/components/roadmap/RoadmapTree';
import RoadmapStats from '@/components/roadmap/RoadmapStats';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

// Add more complete data for arrays-hashing
const TOPICS_DATA = {
  'arrays-hashing': {
    title: 'Arrays & Hashing',
    progress: 0,
    total: 9,
    prerequisites: [
      {
        title: 'Dynamic Arrays',
        description: 'Data Structures & Algorithms for Beginners',
        completed: false
      },
      {
        title: 'Hash Usage',
        description: 'Data Structures & Algorithms for Beginners',
        completed: false
      },
      {
        title: 'Hash Implementation',
        description: 'Data Structures & Algorithms for Beginners',
        completed: false
      },
      {
        title: 'Prefix Sums',
        description: 'Advanced Algorithms',
        completed: false
      }
    ],
    problems: [
      {
        id: 'contains-duplicate',
        title: 'Contains Duplicate',
        difficulty: 'Easy',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'valid-anagram',
        title: 'Valid Anagram',
        difficulty: 'Easy',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'two-sum',
        title: 'Two Sum',
        difficulty: 'Easy',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'group-anagrams',
        title: 'Group Anagrams',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'top-k-frequent',
        title: 'Top K Frequent Elements',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'encode-decode',
        title: 'Encode and Decode Strings',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'product-except-self',
        title: 'Product of Array Except Self',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'valid-sudoku',
        title: 'Valid Sudoku',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'longest-consecutive',
        title: 'Longest Consecutive Sequence',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      }
    ]
  },
  'two-pointers': {
    title: 'Two Pointers',
    progress: 0,
    total: 5,
    prerequisites: [
      {
        title: 'Two Pointers',
        description: 'Advanced Algorithms',
        completed: false
      }
    ],
    problems: [
      {
        id: 'valid-palindrome',
        title: 'Valid Palindrome',
        difficulty: 'Easy',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'two-sum-ii',
        title: 'Two Sum II Input Array Is Sorted',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: '3sum',
        title: '3Sum',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'container-with-most-water',
        title: 'Container With Most Water',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'trapping-rain-water',
        title: 'Trapping Rain Water',
        difficulty: 'Hard',
        completed: false,
        starred: false,
        hasVideo: true,
      }
    ]
  },
  'binary-search': {
    title: 'Binary Search',
    progress: 0,
    total: 7,
    prerequisites: [
      {
        title: 'Binary Search Algorithm',
        description: 'Data Structures & Algorithms for Beginners',
        completed: false
      },
      {
        title: 'Logarithmic Time Complexity',
        description: 'Data Structures & Algorithms for Beginners',
        completed: false
      }
    ],
    problems: [
      {
        id: 'binary-search',
        title: 'Binary Search',
        difficulty: 'Easy',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'search-in-rotated-sorted-array',
        title: 'Search in Rotated Sorted Array',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'find-minimum-in-rotated-sorted-array',
        title: 'Find Minimum in Rotated Sorted Array',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'search-a-2d-matrix',
        title: 'Search a 2D Matrix',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'koko-eating-bananas',
        title: 'Koko Eating Bananas',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'find-first-and-last-position',
        title: 'Find First and Last Position of Element in Sorted Array',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'median-of-two-sorted-arrays',
        title: 'Median of Two Sorted Arrays',
        difficulty: 'Hard',
        completed: false,
        starred: false,
        hasVideo: true,
      }
    ]
  },
  'stack': {
    title: 'Stack',
    progress: 0,
    total: 7,
    prerequisites: [
      {
        title: 'Stacks',
        description: 'Data Structures & Algorithms for Beginners',
        completed: false
      }
    ],
    problems: [
      {
        id: 'valid-parentheses',
        title: 'Valid Parentheses',
        difficulty: 'Easy',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'min-stack',
        title: 'Min Stack',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'evaluate-reverse-polish',
        title: 'Evaluate Reverse Polish Notation',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'generate-parentheses',
        title: 'Generate Parentheses',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'daily-temperatures',
        title: 'Daily Temperatures',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'car-fleet',
        title: 'Car Fleet',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'largest-rectangle',
        title: 'Largest Rectangle In Histogram',
        difficulty: 'Hard',
        completed: false,
        starred: false,
        hasVideo: true,
      }
    ]
  },
  'trees': {
    title: 'Trees',
    progress: 0,
    total: 15,
    prerequisites: [
      {
        title: 'Depth-First Search',
        description: 'Data Structures & Algorithms for Beginners',
        completed: false
      },
      {
        title: 'Breadth-First Search',
        description: 'Data Structures & Algorithms for Beginners', 
        completed: false
      },
      {
        title: 'BST Sets and Maps',
        description: 'Data Structures & Algorithms for Beginners', 
        completed: false
      },
      {
        title: 'Iterative DFS',
        description: 'Advanced Algorithms',
        completed: false
      }
    ],
    problems: [
      {
        id: 'invert-binary-tree',
        title: 'Invert Binary Tree',
        difficulty: 'Easy',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'maximum-depth-of-binary-tree',
        title: 'Maximum Depth of Binary Tree',
        difficulty: 'Easy',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'diameter-of-binary-tree',
        title: 'Diameter of Binary Tree',
        difficulty: 'Easy',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'balanced-binary-tree',
        title: 'Balanced Binary Tree',
        difficulty: 'Easy',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'same-tree',
        title: 'Same Tree',
        difficulty: 'Easy',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'subtree-of-another-tree',
        title: 'Subtree of Another Tree',
        difficulty: 'Easy',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'lowest-common-ancestor-of-bst',
        title: 'Lowest Common Ancestor of a Binary Search Tree',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'binary-tree-level-order-traversal',
        title: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'binary-tree-right-side-view',
        title: 'Binary Tree Right Side View',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'count-good-nodes-in-binary-tree',
        title: 'Count Good Nodes In Binary Tree',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'validate-binary-search-tree',
        title: 'Validate Binary Search Tree',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'kth-smallest-element-in-bst',
        title: 'Kth Smallest Element In a Bst',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'construct-binary-tree-from-preorder-inorder',
        title: 'Construct Binary Tree From Preorder And Inorder Traversal',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'binary-tree-max-path-sum',
        title: 'Binary Tree Maximum Path Sum',
        difficulty: 'Hard',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'serialize-deserialize-binary-tree',
        title: 'Serialize And Deserialize Binary Tree',
        difficulty: 'Hard',
        completed: false,
        starred: false,
        hasVideo: true,
      }
    ]
  },
  'sliding-window': {
    title: 'Sliding Window',
    progress: 0,
    total: 6,
    prerequisites: [
      {
        title: 'Sliding Window Fixed Size',
        description: 'Advanced Algorithms',
        completed: false
      },
      {
        title: 'Sliding Window Variable Size',
        description: 'Advanced Algorithms',
        completed: false
      }
    ],
    problems: [
      {
        id: 'best-time-to-buy-sell-stock',
        title: 'Best Time to Buy And Sell Stock',
        difficulty: 'Easy',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'longest-substring-without-repeating',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'longest-repeating-character-replacement',
        title: 'Longest Repeating Character Replacement',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'permutation-in-string',
        title: 'Permutation In String',
        difficulty: 'Medium',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'minimum-window-substring',
        title: 'Minimum Window Substring',
        difficulty: 'Hard',
        completed: false,
        starred: false,
        hasVideo: true,
      },
      {
        id: 'sliding-window-maximum',
        title: 'Sliding Window Maximum',
        difficulty: 'Hard',
        completed: false,
        starred: false,
        hasVideo: true,
      }
    ]
  }
};

// Define a type for the valid topic keys
type TopicKey = keyof typeof TOPICS_DATA;

// Define interface for topic data
interface TopicData {
  title: string;
  progress: number;
  total: number;
  prerequisites: {
    title: string;
    description: string;
    completed: boolean;
  }[];
  problems: {
    id: string;
    title: string;
    difficulty: string;
    completed: boolean;
    starred: boolean;
    hasVideo: boolean;
    link: string;
  }[];
}

// Add this interface at the top of your file with other interfaces
interface Problem {
  id: string;
  title: string;
  difficulty: string;
  completed: boolean;
  starred: boolean;
  hasVideo: boolean;
  link: string;
}

export default function RoadmapDetailPage() {
  // Use useParams hook instead of props.params
  const params = useParams();
  const roadmapId = params.roadmapId as string;
  
  const [roadmap, setRoadmap] = useState<any>(null);
  const [nodes, setNodes] = useState<any[]>([]);
  const [topicData, setTopicData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const router = useRouter();
  
  // Load data based on roadmapId
  useEffect(() => {
    async function fetchRoadmap() {
      try {
        setLoading(true);
        
        // First try to get data from our mocked topics
        if (roadmapId && Object.keys(TOPICS_DATA).includes(roadmapId)) {
          setTopicData(TOPICS_DATA[roadmapId as TopicKey]);
          
          // Still get the roadmap data if available
          try {
            const roadmapData = await getRoadmapById(roadmapId);
            if (roadmapData) {
              setRoadmap(roadmapData);
              const nodesData = await getRoadmapNodes(roadmapId);
              setNodes(nodesData || []);
            }
          } catch (err) {
            console.error('Error fetching roadmap:', err);
            // Continue with just the topic data
          }
        } else {
          // Try to get actual roadmap data
          try {
            const roadmapData = await getRoadmapById(roadmapId);
            if (!roadmapData) {
              // If no data found, use arrays-hashing as fallback
              setTopicData(TOPICS_DATA['arrays-hashing']);
            } else {
              setRoadmap(roadmapData);
              const nodesData = await getRoadmapNodes(roadmapId);
              setNodes(nodesData || []);
              
              // If we have roadmap data but no topic data, use arrays-hashing
              if (!TOPICS_DATA[roadmapId as TopicKey]) {
                setTopicData(TOPICS_DATA['arrays-hashing']);
              }
            }
          } catch (err) {
            console.error('Error fetching roadmap:', err);
            setTopicData(TOPICS_DATA['arrays-hashing']);
          }
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load roadmap data');
      } finally {
        setLoading(false);
      }
    }
    
    if (roadmapId) {
      fetchRoadmap();
    }
  }, [roadmapId]);
  
  // Add this new function to load user progress
  useEffect(() => {
    const loadUserProgress = async () => {
      if (!user || !roadmapId) return;
      
      try {
        // Get the user's progress for this roadmap
        const { data: progressData, error: progressError } = await supabase
          .from('user_progress')
          .select('problem_id, completed')
          .eq('user_id', user.id)
          .eq('topic_id', roadmapId);
          
        if (progressError) {
          console.error('Error loading progress:', progressError);
          return;
        }
        
        // Get the user's starred problems
        const { data: starsData, error: starsError } = await supabase
          .from('user_stars')
          .select('problem_id')
          .eq('user_id', user.id);
          
        if (starsError) {
          console.error('Error loading stars:', starsError);
          return;
        }
        
        // Update the topicData with the user's progress and stars
        if (progressData?.length || starsData?.length) {
          setTopicData((prevData: TopicData) => {
            const starredIds = starsData?.map(s => s.problem_id) || [];
            
            const newProblems = prevData.problems.map(problem => {
              const progress = progressData?.find((p: { problem_id: string; completed: boolean }) => 
                p.problem_id === problem.id
              );
              
              return {
                ...problem,
                completed: progress ? progress.completed : problem.completed,
                starred: starredIds.includes(problem.id)
              };
            });
            
            const completedCount = newProblems.filter(p => p.completed).length;
            
            return {
              ...prevData,
              problems: newProblems,
              progress: completedCount
            };
          });
        }
      } catch (err) {
        console.error('Failed to load user data:', err);
      }
    };

    if (user) {
      loadUserProgress();
    }
  }, [roadmapId, user]);
  
  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }
  
  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }
  
  if (!topicData) {
    return notFound();
  }
  
  // Handle checkbox change
  const handleStatusChange = async (problemId: string) => {
    // If user isn't logged in, this will show the auth prompt
    if (!user) {
      router.push('/auth/signin');
      return;
    }

    // First update the UI optimistically
    setTopicData((prevData: TopicData) => {
      const newProblems = prevData.problems.map(problem => {
        if (problem.id === problemId) {
          return { ...problem, completed: !problem.completed };
        }
        return problem;
      });
      
      const completedCount = newProblems.filter(p => p.completed).length;
      
      return {
        ...prevData,
        problems: newProblems,
        progress: completedCount
      };
    });
    
    // Then save to Supabase if user is logged in
    if (user) {
      try {
        const { error } = await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            topic_id: roadmapId as string,
            problem_id: problemId,
            completed: !topicData.problems.find((p: Problem) => p.id === problemId)?.completed,
            updated_at: new Date().toISOString(),
          });
          
        if (error) {
          console.error('Error saving progress:', error);
        }
      } catch (err) {
        console.error('Failed to save progress:', err);
      }
    }
  };
  
  // Handle star toggle
  const handleStarToggle = async (problemId: string) => {
    // If user isn't logged in, this will show the auth prompt
    if (!user) {
      router.push('/auth/signin');
      return;
    }

    // Update UI optimistically
    setTopicData((prevData: TopicData) => {
      const newProblems = prevData.problems.map(problem => {
        if (problem.id === problemId) {
          return { ...problem, starred: !problem.starred };
        }
        return problem;
      });
      
      return {
        ...prevData,
        problems: newProblems
      };
    });

    // Save to Supabase if user is logged in
    if (user) {
      const isStarred = !topicData.problems.find((p: Problem) => p.id === problemId)?.starred;
      
      try {
        if (isStarred) {
          // Add star
          const { error } = await supabase
            .from('user_stars')
            .insert({
              user_id: user.id,
              problem_id: problemId,
              updated_at: new Date().toISOString(),
            });
            
          if (error) {
            console.error('Error saving star:', error);
          }
        } else {
          // Remove star
          const { error } = await supabase
            .from('user_stars')
            .delete()
            .match({
              user_id: user.id,
              problem_id: problemId
            });
            
          if (error) {
            console.error('Error removing star:', error);
          }
        }
      } catch (err) {
        console.error('Failed to update star:', err);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {roadmap && nodes && nodes.length > 0 && (
        <>
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{roadmap.title}</h1>
              {roadmap.is_premium && (
                <span className="bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium">
                  PRO
                </span>
              )}
            </div>
            <p className="text-gray-400 mt-2">{roadmap.description}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            <div className="lg:col-span-3">
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-6">Your Learning Path</h2>
                <RoadmapTree nodes={nodes} roadmapId={roadmapId} />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <RoadmapStats nodes={nodes} difficulty={roadmap.difficulty} />
            </div>
          </div>
        </>
      )}

      <div className="mb-4">
        <Link 
          href="/roadmap"
          className="inline-flex items-center text-gray-400 hover:text-white"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          ESC
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{topicData.title}</h1>
        <div className="text-gray-400 mb-4">({topicData.progress} / {topicData.total})</div>
        
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4 max-w-3xl mx-auto">
          <div 
            className="bg-white h-2.5 rounded-full" 
            style={{ width: `${(topicData.progress / topicData.total) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Prerequisites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {topicData.prerequisites.map((prereq: TopicData['prerequisites'][number], index: number) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4 relative">
              <div className="absolute top-4 right-4">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-gray-700"
                  checked={prereq.completed}
                  onChange={() => {
                    const newPrereqs = [...topicData.prerequisites];
                    newPrereqs[index].completed = !newPrereqs[index].completed;
                    setTopicData({...topicData, prerequisites: newPrereqs});
                  }}
                />
              </div>
              <h3 className="text-lg font-medium mb-2">{prereq.title}</h3>
              <p className="text-sm text-blue-400">{prereq.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 text-left">Status</th>
              <th className="py-3 text-left">Star</th>
              <th className="py-3 text-left">Problem</th>
              <th className="py-3 text-left">Difficulty</th>
              <th className="py-3 text-left">Solution</th>
            </tr>
          </thead>
          <tbody>
            {topicData.problems.map((problem: TopicData['problems'][number]) => (
              <tr key={problem.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                <td className="py-4">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-gray-700"
                    checked={problem.completed}
                    onChange={() => handleStatusChange(problem.id)}
                  />
                </td>
                <td className="py-4">
                  <button onClick={() => handleStarToggle(problem.id)}>
                    {problem.starred ? (
                      <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                      </svg>
                    )}
                  </button>
                </td>
                <td className="py-4">
                  <Link 
                    href={`/problems/${problem.id}`}
                    className="text-blue-400 hover:text-blue-300 flex items-center"
                  >
                    {problem.title}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </Link>
                </td>
                <td className={`py-4 ${
                  problem.difficulty === 'Easy' ? 'text-green-500' : 
                  problem.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {problem.difficulty}
                </td>
                <td className="py-4">
                  {problem.hasVideo && (
                    <button className="text-gray-400 hover:text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 