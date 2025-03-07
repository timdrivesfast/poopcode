export const problem = {
  id: "20",
  slug: "valid-parentheses",
  title: "Valid Parentheses",
  description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
  difficulty: "Easy",
  category: "Stack",
  acceptanceRate: 77.4,
  likes: 18700,
  dislikes: 950,
  examples: [
    {
      input: 's = "()"',
      output: "true"
    },
    {
      input: 's = "()[]{}"',
      output: "true"
    },
    {
      input: 's = "(]"',
      output: "false"
    },
    {
      input: 's = "([)]"',
      output: "false"
    },
    {
      input: 's = "{[]}"',
      output: "true"
    }
  ],
  constraints: [
    "1 <= s.length <= 10^4",
    "s consists of parentheses only '()[]{}'."
  ],
  starterCode: {
    python: `class Solution:
    def isValid(self, s: str) -> bool:
        # Your code here
        pass`,
    javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // Your code here
};`,
    java: `class Solution {
    public boolean isValid(String s) {
        // Your code here
        return false;
    }
}`
  },
  testCases: [
    {
      input: ["()"],
      output: true
    },
    {
      input: ["()[]{}"],
      output: true
    },
    {
      input: ["(]"],
      output: false
    },
    {
      input: ["([)]"],
      output: false
    },
    {
      input: ["{[]}"],
      output: true
    },
    {
      input: ["((("],
      output: false,
      isHidden: true
    },
    {
      input: [")))"],
      output: false,
      isHidden: true
    },
    {
      input: [""],
      output: true,
      isHidden: true
    }
  ],
  approaches: [
    {
      name: "Stack",
      description: `We can use a stack to keep track of opening brackets and ensure they're properly matched with closing brackets.

The algorithm works as follows:
1. Initialize an empty stack.
2. Iterate through each character in the string:
   - If it's an opening bracket ('(', '{', or '['), push it onto the stack.
   - If it's a closing bracket (')', '}', or ']'):
     - If the stack is empty, return false (there's no matching opening bracket)
     - Pop the top element from the stack
     - Check if the popped element is the matching opening bracket for the current closing bracket
     - If not, return false
3. After iterating through the whole string, return true if the stack is empty (all brackets were matched),
   or false if the stack still has elements (some opening brackets weren't matched).`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      code: `class Solution:
    def isValid(self, s: str) -> bool:
        # Initialize an empty stack
        stack = []
        
        # Define the mapping of closing brackets to their opening brackets
        bracket_map = {
            ')': '(',
            '}': '{',
            ']': '['
        }
        
        # Iterate through each character in the string
        for char in s:
            # If it's a closing bracket
            if char in bracket_map:
                # Pop the top element from the stack if it's not empty, otherwise use a dummy value
                top_element = stack.pop() if stack else '#'
                
                # Check if the popped element is the matching opening bracket
                if bracket_map[char] != top_element:
                    return False
            # If it's an opening bracket
            else:
                # Push it onto the stack
                stack.append(char)
        
        # If the stack is empty, all brackets were properly matched
        return len(stack) == 0`
    }
  ],
  hints: [
    "Think about using a stack to keep track of opening brackets.",
    "When you encounter a closing bracket, check if the top of the stack is its matching opening bracket.",
    "Remember that brackets must be closed in the correct order - the last opened bracket must be the first closed."
  ],
  relatedProblems: [
    {
      id: "22",
      title: "Generate Parentheses",
      difficulty: "Medium"
    },
    {
      id: "32",
      title: "Longest Valid Parentheses",
      difficulty: "Hard"
    },
    {
      id: "678",
      title: "Valid Parenthesis String",
      difficulty: "Medium"
    }
  ]
}; 