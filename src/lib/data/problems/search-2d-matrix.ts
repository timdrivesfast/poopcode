export const problem = {
  id: "74",
  slug: "search-2d-matrix",
  title: "Search a 2D Matrix",
  description: `Write an efficient algorithm that searches for a value \`target\` in an \`m x n\` integer matrix \`matrix\`. This matrix has the following properties:

- Integers in each row are sorted from left to right.
- The first integer of each row is greater than the last integer of the previous row.`,
  difficulty: "Medium",
  category: "Binary Search",
  acceptanceRate: 64.5,
  likes: 11600,
  dislikes: 320,
  examples: [
    {
      input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3',
      output: "true"
    },
    {
      input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13',
      output: "false"
    }
  ],
  constraints: [
    "m == matrix.length",
    "n == matrix[i].length",
    "1 <= m, n <= 100",
    "-10^4 <= matrix[i][j], target <= 10^4"
  ],
  starterCode: {
    python: `class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        # Your code here
        pass`,
    javascript: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    // Your code here
};`,
    java: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        // Your code here
        return false;
    }
}`
  },
  testCases: [
    {
      input: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3],
      output: true
    },
    {
      input: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13],
      output: false
    },
    {
      input: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 1],
      output: true
    },
    {
      input: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 60],
      output: true
    },
    {
      input: [[[1]], 1],
      output: true,
      isHidden: true
    },
    {
      input: [[[1]], 2],
      output: false,
      isHidden: true
    }
  ],
  approaches: [
    {
      name: "Brute Force",
      description: `The brute force approach is to iterate through each element in the matrix and check if it equals the target.

While this approach will work, it doesn't take advantage of the sorted property of the matrix and has a time complexity of O(m * n).`,
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(1)",
      code: `class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        # Get the dimensions of the matrix
        m, n = len(matrix), len(matrix[0])
        
        # Iterate through each element
        for i in range(m):
            for j in range(n):
                if matrix[i][j] == target:
                    return True
        
        # Target not found
        return False`
    },
    {
      name: "Row-wise Binary Search",
      description: `We can use the sorted property of the matrix to first find the row that might contain the target, and then perform binary search on that row.

The steps are:
1. Find the row that might contain the target:
   - If the target is less than the first element of the row, it can't be in this row or any subsequent row.
   - If the target is greater than the last element of the row, it can't be in this row but might be in subsequent rows.
   - If the target is between the first and last elements of the row, it might be in this row.
2. Once a potential row is found, perform binary search on that row.

This approach has O(m + log n) time complexity.`,
      timeComplexity: "O(m + log n)",
      spaceComplexity: "O(1)",
      code: `class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        # Get the dimensions of the matrix
        m, n = len(matrix), len(matrix[0])
        
        # Find the potential row
        row = 0
        while row < m:
            if matrix[row][0] <= target <= matrix[row][n-1]:
                # This row might contain the target, perform binary search
                left, right = 0, n - 1
                while left <= right:
                    mid = left + (right - left) // 2
                    if matrix[row][mid] == target:
                        return True
                    elif matrix[row][mid] < target:
                        left = mid + 1
                    else:
                        right = mid - 1
                return False  # Not found in this row
            elif target < matrix[row][0]:
                return False  # Target is less than the smallest element in this row
            else:
                row += 1  # Check the next row
        
        # Target not found in any row
        return False`
    },
    {
      name: "Treating Matrix as Sorted Array",
      description: `Since the matrix has the property that each row is sorted and the first element of each row is greater than the last element of the previous row, we can treat the entire matrix as a single sorted array and perform binary search.

The steps are:
1. Perform binary search on the entire matrix as if it were a 1D array.
2. Convert the mid index of the binary search to a row and column in the matrix.

This approach has O(log(m*n)) time complexity, which is optimal.`,
      timeComplexity: "O(log(m*n))",
      spaceComplexity: "O(1)",
      code: `class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        # Get the dimensions of the matrix
        m, n = len(matrix), len(matrix[0])
        
        # Perform binary search on the entire matrix
        left, right = 0, m * n - 1
        
        while left <= right:
            mid = left + (right - left) // 2
            
            # Convert the mid index to row and column
            row, col = mid // n, mid % n
            
            if matrix[row][col] == target:
                return True
            elif matrix[row][col] < target:
                left = mid + 1
            else:
                right = mid - 1
        
        # Target not found
        return False`
    }
  ],
  hints: [
    "Think of the matrix as a sorted array laid out in rows.",
    "Can you use binary search to find the right row, then search within that row?",
    "Or can you treat the entire matrix as a single sorted array?"
  ],
  relatedProblems: [
    {
      id: "240",
      title: "Search a 2D Matrix II",
      difficulty: "Medium"
    },
    {
      id: "378",
      title: "Kth Smallest Element in a Sorted Matrix",
      difficulty: "Medium"
    },
    {
      id: "4",
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard"
    }
  ]
}; 