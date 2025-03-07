export const problem = {
  id: "125",
  slug: "valid-palindrome",
  title: "Valid Palindrome",
  description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` if it is a **palindrome**, or \`false\` otherwise.`,
  difficulty: "Easy",
  category: "Two Pointers",
  acceptanceRate: 79.1,
  likes: 5600,
  dislikes: 6200,
  examples: [
    {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.'
    },
    {
      input: 's = "race a car"',
      output: "false",
      explanation: '"raceacar" is not a palindrome.'
    },
    {
      input: 's = " "',
      output: "true",
      explanation: 's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.'
    }
  ],
  constraints: [
    "1 <= s.length <= 2 * 10^5",
    "s consists only of printable ASCII characters."
  ],
  starterCode: {
    python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Your code here
        pass`,
    javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    // Your code here
};`,
    java: `class Solution {
    public boolean isPalindrome(String s) {
        // Your code here
        return false;
    }
}`
  },
  testCases: [
    {
      input: ["A man, a plan, a canal: Panama"],
      output: true
    },
    {
      input: ["race a car"],
      output: false
    },
    {
      input: [" "],
      output: true
    },
    {
      input: ["0P"],
      output: false
    },
    {
      input: ["a."],
      output: true,
      isHidden: true
    },
    {
      input: [".,"],
      output: true,
      isHidden: true
    }
  ],
  approaches: [
    {
      name: "Two-Pointer Approach",
      description: `We can use two pointers, one starting from the beginning and one from the end of the string. We move the pointers toward each other, skipping non-alphanumeric characters, and compare the alphanumeric characters.

The steps are:
1. Initialize two pointers, 'left' at the start of the string and 'right' at the end.
2. While 'left' is less than 'right':
   - Move 'left' forward if the current character is not alphanumeric.
   - Move 'right' backward if the current character is not alphanumeric.
   - Compare the characters at 'left' and 'right' (case-insensitive).
   - If they don't match, return false.
   - Move both pointers toward each other.
3. Return true if we've checked all characters.

This approach efficiently handles the requirements of the problem without converting the entire string.`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      code: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Initialize two pointers
        left, right = 0, len(s) - 1
        
        while left < right:
            # Skip non-alphanumeric characters from the left
            while left < right and not s[left].isalnum():
                left += 1
            
            # Skip non-alphanumeric characters from the right
            while left < right and not s[right].isalnum():
                right -= 1
            
            # Compare characters (case-insensitive)
            if s[left].lower() != s[right].lower():
                return False
            
            # Move pointers toward each other
            left += 1
            right -= 1
        
        # If we've checked all characters, it's a palindrome
        return True`
    },
    {
      name: "Filtering and Comparing",
      description: `Another approach is to first create a new string containing only alphanumeric characters in lowercase, and then check if this filtered string equals its reverse.

The steps are:
1. Create a new string with only alphanumeric characters, converted to lowercase.
2. Check if this filtered string equals its reverse.

This approach is simpler to understand but less efficient as it requires additional space.`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      code: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Create a filtered string with only alphanumeric characters in lowercase
        filtered_chars = [c.lower() for c in s if c.isalnum()]
        filtered_string = ''.join(filtered_chars)
        
        # Check if the filtered string equals its reverse
        return filtered_string == filtered_string[::-1]`
    }
  ],
  hints: [
    "Consider using two pointers - one at the beginning, one at the end.",
    "Remember to skip non-alphanumeric characters.",
    "Character comparisons should be case-insensitive."
  ],
  relatedProblems: [
    {
      id: "5",
      title: "Longest Palindromic Substring",
      difficulty: "Medium"
    },
    {
      id: "9",
      title: "Palindrome Number",
      difficulty: "Easy"
    },
    {
      id: "680",
      title: "Valid Palindrome II",
      difficulty: "Easy"
    }
  ]
}; 