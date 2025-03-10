import { Problem } from '@/lib/services/problemService';

export const PROBLEM_DATA: Record<string, Problem> = {
  'contains-duplicate': {
    id: 'mock-contains-duplicate',
    title: 'Contains Duplicate',
    description: 'Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.\n\n**Example 1:**\n```\nInput: nums = [1,2,3,1]\nOutput: true\n```\n\n**Example 2:**\n```\nInput: nums = [1,2,3,4]\nOutput: false\n```',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 80.5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  'valid-anagram': {
    id: 'mock-valid-anagram',
    title: 'Valid Anagram',
    description: 'Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.\n\n**Example 1:**\n```\nInput: s = "anagram", t = "nagaram"\nOutput: true\n```\n\n**Example 2:**\n```\nInput: s = "rat", t = "car"\nOutput: false\n```',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 78.4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  'two-sum': {
    id: 'mock-two-sum',
    title: 'Two Sum',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\n**Example:**\n```\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n```',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 75.2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  'group-anagrams': {
    id: 'mock-group-anagrams',
    title: 'Group Anagrams',
    description: 'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.\n\n**Example:**\n```\nInput: strs = ["eat","tea","tan","ate","nat","bat"]\nOutput: [["bat"],["nat","tan"],["ate","eat","tea"]]\n```',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 68.3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  'top-k-frequent': {
    id: 'mock-top-k-frequent',
    title: 'Top K Frequent Elements',
    description: 'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.\n\n**Example 1:**\n```\nInput: nums = [1,1,1,2,2,3], k = 2\nOutput: [1,2]\n```',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 64.7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  // Add more problems as needed
  'valid-palindrome': {
    id: 'mock-valid-palindrome',
    title: 'Valid Palindrome',
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.\n\n**Example 1:**\n```\nInput: s = "A man, a plan, a canal: Panama"\nOutput: true\nExplanation: "amanaplanacanalpanama" is a palindrome.\n```',
    difficulty: 'Easy',
    category: 'Two Pointers',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 79.1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  'two-sum-ii': {
    id: 'mock-two-sum-ii',
    title: 'Two Sum II',
    description: 'Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number. Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.\n\nThe tests are generated such that there is exactly one solution. You may not use the same element twice.\n\n**Example:**\n```\nInput: numbers = [2,7,11,15], target = 9\nOutput: [1,2]\nExplanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].\n```',
    difficulty: 'Medium',
    category: 'Two Pointers',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 71.9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  '3sum': {
    id: 'mock-3sum',
    title: '3Sum',
    description: 'Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.\n\n**Example:**\n```\nInput: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]\n```',
    difficulty: 'Medium',
    category: 'Two Pointers',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 49.8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  'binary-search': {
    id: 'mock-binary-search',
    title: 'Binary Search',
    description: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.\n\n**Example:**\n```\nInput: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4\nExplanation: 9 exists in nums and its index is 4\n```',
    difficulty: 'Easy',
    category: 'Binary Search',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 80.2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  'search-2d-matrix': {
    id: 'mock-search-2d-matrix',
    title: 'Search a 2D Matrix',
    description: 'Write an efficient algorithm that searches for a value `target` in an `m x n` integer matrix `matrix`. This matrix has the following properties:\n\n- Integers in each row are sorted from left to right.\n- The first integer of each row is greater than the last integer of the previous row.\n\n**Example:**\n```\nInput: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3\nOutput: true\n```',
    difficulty: 'Medium',
    category: 'Binary Search',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 64.5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  'best-time-to-buy-sell-stock': {
    id: 'mock-best-time-to-buy-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    description: 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.\n\n**Example:**\n```\nInput: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\n```',
    difficulty: 'Easy',
    category: 'Sliding Window',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 78.9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  'longest-substring': {
    id: 'mock-longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string `s`, find the length of the longest substring without repeating characters.\n\n**Example 1:**\n```\nInput: s = "abcabcbb"\nOutput: 3\nExplanation: The answer is "abc", with the length of 3.\n```\n\n**Example 2:**\n```\nInput: s = "bbbbb"\nOutput: 1\nExplanation: The answer is "b", with the length of 1.\n```',
    difficulty: 'Medium',
    category: 'Sliding Window',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 33.8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  'valid-parentheses': {
    id: 'mock-valid-parentheses',
    title: 'Valid Parentheses',
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n\n**Example 1:**\n```\nInput: s = "()"\nOutput: true\n```\n\n**Example 2:**\n```\nInput: s = "()[]{}\nOutput: true\n```\n\n**Example 3:**\n```\nInput: s = "(]"\nOutput: false\n```',
    difficulty: 'Easy',
    category: 'Stack',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 77.4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  'reverse-linked-list': {
    id: 'mock-reverse-linked-list',
    title: 'Reverse Linked List',
    description: 'Given the `head` of a singly linked list, reverse the list, and return the reversed list.\n\n**Example 1:**\n```\nInput: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]\n```',
    difficulty: 'Easy',
    category: 'Linked List',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 73.1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  'merge-two-sorted-lists': {
    id: 'mock-merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    description: 'You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.\n\n**Example:**\n```\nInput: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]\n```',
    difficulty: 'Easy',
    category: 'Linked List',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 65.3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  'invert-binary-tree': {
    id: 'mock-invert-binary-tree',
    title: 'Invert Binary Tree',
    description: 'Given the `root` of a binary tree, invert the tree, and return its root.\n\n**Example:**\n```\nInput: root = [4,2,7,1,3,6,9]\nOutput: [4,7,2,9,6,3,1]\n```',
    difficulty: 'Easy',
    category: 'Trees',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 76.2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  'maximum-depth-of-binary-tree': {
    id: 'mock-maximum-depth-of-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    description: 'Given the `root` of a binary tree, return its maximum depth.\n\nA binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.\n\n**Example:**\n```\nInput: root = [3,9,20,null,null,15,7]\nOutput: 3\n```',
    difficulty: 'Easy',
    category: 'Trees',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 73.8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  'climbing-stairs': {
    id: 'mock-climbing-stairs',
    title: 'Climbing Stairs',
    description: 'You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\n\n**Example 1:**\n```\nInput: n = 2\nOutput: 2\nExplanation: There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps\n```\n\n**Example 2:**\n```\nInput: n = 3\nOutput: 3\nExplanation: There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step\n```',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 51.2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  'coin-change': {
    id: 'mock-coin-change',
    title: 'Coin Change',
    description: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.\n\nYou may assume that you have an infinite number of each kind of coin.\n\n**Example:**\n```\nInput: coins = [1,2,5], amount = 11\nOutput: 3\nExplanation: 11 = 5 + 5 + 1\n```',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    is_premium: false,
    solution_url: null,
    acceptance_rate: 41.5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
};

export const problemData = [
  {
    id: 1,
    slug: "contains-duplicate",
    title: "Contains Duplicate",
    category: "Arrays & Hashing",
    difficulty: "Easy",
    description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "true",
        explanation: "1 appears twice in the array."
      },
      // ...more examples
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
    
}`,
      // other languages...
    },
    isNeetCode150: true,
  },
  // ... other problems
]; 