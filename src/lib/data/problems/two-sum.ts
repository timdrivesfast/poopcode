export const problem = {
  id: "1",
  slug: "two-sum",
  title: "Two Sum",
  description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
  difficulty: "Easy",
  category: "Arrays & Hashing",
  acceptanceRate: 75.2,
  likes: 42500,
  dislikes: 1380,
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
    }
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists."
  ],
  starterCode: {
    python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
};`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{0, 0};
    }
}`
  },
  testCases: [
    {
      input: [[2,7,11,15], 9],
      output: [0,1]
    },
    {
      input: [[3,2,4], 6],
      output: [1,2]
    },
    {
      input: [[3,3], 6],
      output: [0,1]
    },
    {
      input: [[1,2,3,4,5], 9],
      output: [3,4],
      isHidden: true
    },
    {
      input: [[-1,-2,-3,-4,-5], -8],
      output: [2,4],
      isHidden: true
    }
  ],
  approaches: [
    {
      name: "Brute Force",
      description: `The brute force approach is simple - examine each pair of numbers in the array to see if they sum to the target.

For each number in the array, we check if there's another number that, when added to the current number, equals the target. If we find such a pair, we return their indices.`,
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      code: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        n = len(nums)
        
        # Check each pair of numbers
        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] + nums[j] == target:
                    return [i, j]
        
        # No solution found
        return []`
    },
    {
      name: "Hash Map",
      description: `We can use a hash map to achieve a more efficient solution. The key insight is that for each number \`x\` in the array, we want to find another number \`y\` such that \`x + y = target\`, or \`y = target - x\`.

As we iterate through the array, for each number, we:
1. Calculate its complement (target - current number)
2. Check if the complement exists in our hash map
3. If it does, we've found our pair and return the indices
4. If not, we add the current number and its index to the hash map

This allows us to find pairs in a single pass through the array.`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      code: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Map to store numbers we've seen and their indices
        num_map = {}
        
        # Check each number in the array
        for i, num in enumerate(nums):
            # Calculate the complement
            complement = target - num
            
            # Check if the complement exists in our map
            if complement in num_map:
                # We found the pair!
                return [num_map[complement], i]
            
            # Add the current number and its index to the map
            num_map[num] = i
        
        # No solution found
        return []`
    }
  ],
  hints: [
    "Try using a hash map to store numbers you've already seen.",
    "For each number, check if its complement (target - number) exists in the hash map.",
    "Remember to return the indices, not the numbers themselves!"
  ],
  relatedProblems: [
    {
      id: "167",
      title: "Two Sum II - Input Array Is Sorted",
      difficulty: "Medium"
    },
    {
      id: "15",
      title: "3Sum",
      difficulty: "Medium"
    },
    {
      id: "18",
      title: "4Sum",
      difficulty: "Medium"
    }
  ]
}; 