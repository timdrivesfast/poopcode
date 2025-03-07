export const problem = {
  id: "704",
  slug: "binary-search",
  title: "Binary Search",
  description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
  difficulty: "Easy",
  category: "Binary Search",
  acceptanceRate: 80.2,
  likes: 8900,
  dislikes: 150,
  examples: [
    {
      input: "nums = [-1,0,3,5,9,12], target = 9",
      output: "4",
      explanation: "9 exists in nums and its index is 4"
    },
    {
      input: "nums = [-1,0,3,5,9,12], target = 2",
      output: "-1",
      explanation: "2 does not exist in nums so return -1"
    }
  ],
  constraints: [
    "1 <= nums.length <= 10^4",
    "-10^4 < nums[i], target < 10^4",
    "All the integers in nums are unique.",
    "nums is sorted in ascending order."
  ],
  starterCode: {
    python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        # Your code here
        pass`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // Your code here
};`,
    java: `class Solution {
    public int search(int[] nums, int target) {
        // Your code here
        return -1;
    }
}`
  },
  testCases: [
    {
      input: [[-1,0,3,5,9,12], 9],
      output: 4
    },
    {
      input: [[-1,0,3,5,9,12], 2],
      output: -1
    },
    {
      input: [[1,2,3,4,5], 5],
      output: 4
    },
    {
      input: [[1,2,3,4,5], 1],
      output: 0
    },
    {
      input: [[1], 1],
      output: 0,
      isHidden: true
    },
    {
      input: [[1], 2],
      output: -1,
      isHidden: true
    }
  ],
  approaches: [
    {
      name: "Linear Search",
      description: `The linear search approach is straightforward - we simply iterate through the array from left to right, checking if each element equals the target.

While this works, it's not optimal for a sorted array as it has O(n) time complexity.`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      code: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        # Iterate through the array
        for i in range(len(nums)):
            if nums[i] == target:
                return i
        
        # Target not found
        return -1`
    },
    {
      name: "Binary Search",
      description: `Binary search is an efficient algorithm that leverages the sorted nature of the array. It repeatedly divides the search interval in half until the target is found or the interval is empty.

The algorithm works as follows:
1. Initialize pointers \`left\` and \`right\` to the start and end of the array.
2. While \`left\` <= \`right\`:
   - Calculate the middle index as \`mid = (left + right) // 2\`.
   - If the element at \`mid\` equals the target, return \`mid\`.
   - If the element at \`mid\` is less than the target, search the right half by setting \`left = mid + 1\`.
   - If the element at \`mid\` is greater than the target, search the left half by setting \`right = mid - 1\`.
3. If we exit the loop, the target was not found, so return \`-1\`.

This approach has O(log n) time complexity, making it much more efficient for large sorted arrays.`,
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      code: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        
        while left <= right:
            # Calculate the middle index
            # Using (left + right) // 2 can cause integer overflow in languages like Java
            # So we use left + (right - left) // 2
            mid = left + (right - left) // 2
            
            # Check if the middle element is the target
            if nums[mid] == target:
                return mid
            
            # If the target is greater, search the right half
            elif nums[mid] < target:
                left = mid + 1
            
            # If the target is smaller, search the left half
            else:
                right = mid - 1
        
        # Target not found
        return -1`
    },
    {
      name: "Recursive Binary Search",
      description: `We can also implement binary search recursively. The recursive approach follows the same logic as the iterative one but uses function calls instead of a loop.

This approach is elegant but may not be optimal for very large arrays due to the overhead of function calls and potential stack overflow.`,
      timeComplexity: "O(log n)",
      spaceComplexity: "O(log n)",
      code: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        # Helper function for recursive binary search
        def binary_search_recursive(left, right):
            # Base case: if the search space is empty
            if left > right:
                return -1
            
            # Calculate the middle index
            mid = left + (right - left) // 2
            
            # Check if the middle element is the target
            if nums[mid] == target:
                return mid
            
            # If the target is greater, search the right half
            elif nums[mid] < target:
                return binary_search_recursive(mid + 1, right)
            
            # If the target is smaller, search the left half
            else:
                return binary_search_recursive(left, mid - 1)
        
        # Start the recursive binary search
        return binary_search_recursive(0, len(nums) - 1)`
    }
  ],
  hints: [
    "Since the array is sorted, can you use this property to search more efficiently than checking each element?",
    "Think about dividing the search space in half at each step.",
    "Be careful with the boundary conditions in your loop or recursion."
  ],
  relatedProblems: [
    {
      id: "33",
      title: "Search in Rotated Sorted Array",
      difficulty: "Medium"
    },
    {
      id: "34",
      title: "Find First and Last Position of Element in Sorted Array",
      difficulty: "Medium"
    },
    {
      id: "35",
      title: "Search Insert Position",
      difficulty: "Easy"
    },
    {
      id: "74",
      title: "Search a 2D Matrix",
      difficulty: "Medium"
    }
  ]
}; 