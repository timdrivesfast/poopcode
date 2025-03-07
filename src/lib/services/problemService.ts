import { Problem } from '@/lib/types/Problem';

// Hard-coded problem data
const PROBLEMS_DATA: Record<string, Problem> = {
  'contains-duplicate': {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: 'true',
        explanation: 'The value 1 appears twice, so there is a duplicate.'
      },
      {
        input: 'nums = [1,2,3,4]',
        output: 'false',
        explanation: 'No value appears more than once, so there are no duplicates.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    codeTemplate: 
`/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
    // Write your solution here
    
};`,
    acceptance: 80,
    submissions: 34100,
    completed: false
  },
  'valid-anagram': {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: 'true'
      },
      {
        input: 's = "rat", t = "car"',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.'
    ],
    codeTemplate: 
`/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
    // Write your solution here
    
};`,
    acceptance: 99,
    submissions: 16300,
    completed: false
  },
  'two-sum': {
    id: 'two-sum',
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    codeTemplate: 
`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Write your solution here
    
};`,
    acceptance: 99,
    submissions: 14400,
    completed: false
  },
  'valid-sudoku': {
    id: 'valid-sudoku',
    title: 'Valid Sudoku',
    slug: 'valid-sudoku',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    description: 'Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:\n\n1. Each row must contain the digits 1-9 without repetition.\n2. Each column must contain the digits 1-9 without repetition.\n3. Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.',
    examples: [
      {
        input: 'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        output: 'true'
      }
    ],
    constraints: ['board.length == 9', 'board[i].length == 9', 'board[i][j] is a digit 1-9 or .'],
    codeTemplate: 
`/**
 * @param {character[][]} board
 * @return {boolean}
 */
function isValidSudoku(board) {
    // Write your solution here
    
};`,
    acceptance: 100,
    submissions: 1200,
    isPremium: true,
    completed: false
  },
  'valid-palindrome': {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    slug: 'valid-palindrome',
    difficulty: 'Easy',
    category: 'Two Pointers',
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string s, return true if it is a palindrome, or false otherwise.',
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: '"amanaplanacanalpanama" is a palindrome.'
      },
      {
        input: 's = "race a car"',
        output: 'false',
        explanation: '"raceacar" is not a palindrome.'
      }
    ],
    constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters.'],
    codeTemplate: 
`/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
    // Write your solution here
    
};`,
    acceptance: 100,
    submissions: 6000,
    completed: false
  }
};

// Get all problems
export function getProblems(): Problem[] {
  return Object.values(PROBLEMS_DATA);
}

// Get a problem by id (which is the same as slug in our case)
export function getProblem(id: string): Problem | null {
  return PROBLEMS_DATA[id] || null;
}

// Track problem completion in localStorage (client-side only)
export function markProblemComplete(id: string): void {
  if (typeof window === 'undefined') return;
  
  const completedProblems = JSON.parse(localStorage.getItem('completedProblems') || '{}');
  completedProblems[id] = true;
  localStorage.setItem('completedProblems', JSON.stringify(completedProblems));
}

// Check if a problem is completed
export function isProblemCompleted(id: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const completedProblems = JSON.parse(localStorage.getItem('completedProblems') || '{}');
  return !!completedProblems[id];
}

// Get completion status for all problems
export function getCompletionStatus(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  
  return JSON.parse(localStorage.getItem('completedProblems') || '{}');
}

export function getProblemBySlug(slug: string) {
  console.log("Looking for problem with slug:", slug);
  const problem = PROBLEMS_DATA.find(p => p.slug === slug);
  console.log("Found problem:", problem);
  return problem;
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  order: number;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  hints?: string[];
  starter_code: {
    javascript?: string;
    python?: string;
    // Add more languages as needed
  };
  solution?: {
    javascript?: string;
    python?: string;
    // Add more languages as needed
  };
  submissions: number;
  acceptance: number;
  isPro?: boolean;
}

// Add example problems with these stats
export const PROBLEM_DATA: Problem[] = [
  {
    id: '1',
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    order: 1,
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: 'true',
        explanation: '1 appears twice'
      },
      {
        input: 'nums = [1,2,3,4]',
        output: 'false',
        explanation: 'All elements are unique'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    starter_code: {
      javascript: 'function containsDuplicate(nums) {\n  // Write your code here\n}',
      python: 'def containsDuplicate(nums):\n    # Write your code here\n    pass'
    },
    submissions: 34100,
    acceptance: 100,
  },
  {
    id: '2',
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    order: 2,
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: 'true'
      },
      {
        input: 's = "rat", t = "car"',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.'
    ],
    starter_code: {
      javascript: 'function isAnagram(s, t) {\n  // Write your code here\n}',
      python: 'def isAnagram(s, t):\n    # Write your code here\n    pass'
    },
    submissions: 16300,
    acceptance: 99,
  },
  {
    id: '3',
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    order: 3,
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    starter_code: {
      javascript: 'function twoSum(nums, target) {\n  // Write your code here\n}',
      python: 'def twoSum(nums, target):\n    # Write your code here\n    pass'
    },
    submissions: 14400,
    acceptance: 99,
  },
  // Add more problems with similar stats as shown in the image
  {
    id: '4',
    title: 'Valid Sudoku',
    slug: 'valid-sudoku',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    order: 4,
    description: 'Determine if a 9 x 9 Sudoku board is valid.',
    examples: [/* ... */],
    constraints: [/* ... */],
    starter_code: {/* ... */},
    submissions: 1200,
    acceptance: 100,
    isPro: true,
  },
  {
    id: '5',
    title: 'Encode and Decode Strings',
    slug: 'encode-decode-strings',
    difficulty: 'Medium',
    category: 'String',
    order: 5,
    description: 'Design an algorithm to encode a list of strings to a string and decode a string to a list of strings.',
    examples: [/* ... */],
    constraints: [/* ... */],
    starter_code: {/* ... */},
    submissions: 5200,
    acceptance: 96,
    isPro: true,
  },
  {
    id: '6',
    title: 'Longest Consecutive Sequence',
    slug: 'longest-consecutive-sequence',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    order: 6,
    description: 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.',
    examples: [/* ... */],
    constraints: [/* ... */],
    starter_code: {/* ... */},
    submissions: 5900,
    acceptance: 98,
    isPro: true,
  },
  {
    id: '7',
    title: 'Valid Palindrome',
    slug: 'valid-palindrome',
    difficulty: 'Easy',
    category: 'Two Pointers',
    order: 7,
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
    examples: [/* ... */],
    constraints: [/* ... */],
    starter_code: {/* ... */},
    submissions: 6000,
    acceptance: 100,
  },
  {
    id: '8',
    title: 'Two Sum II - Input Array Is Sorted',
    slug: 'two-sum-ii',
    difficulty: 'Medium',
    category: 'Two Pointers',
    order: 8,
    description: 'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.',
    examples: [/* ... */],
    constraints: [/* ... */],
    starter_code: {/* ... */},
    submissions: 729,
    acceptance: 100,
    isPro: true,
  },
  {
    id: '9',
    title: '3Sum',
    slug: '3sum',
    difficulty: 'Medium',
    category: 'Two Pointers',
    order: 9,
    description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
    examples: [/* ... */],
    constraints: [/* ... */],
    starter_code: {/* ... */},
    submissions: 4700,
    acceptance: 98,
    isPro: true,
  },
]; 