export const problem = {
  id: "242",
  slug: "valid-anagram",
  title: "Valid Anagram",
  description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
  difficulty: "Easy",
  category: "Arrays & Hashing",
  acceptanceRate: 78.4,
  likes: 7300,
  dislikes: 220,
  examples: [
    {
      input: 's = "anagram", t = "nagaram"',
      output: "true"
    },
    {
      input: 's = "rat", t = "car"',
      output: "false"
    }
  ],
  constraints: [
    "1 <= s.length, t.length <= 5 * 10^4",
    "s and t consist of lowercase English letters."
  ],
  starterCode: {
    python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        # Your code here
        pass`,
    javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    // Your code here
};`,
    java: `class Solution {
    public boolean isAnagram(String s, String t) {
        // Your code here
        return false;
    }
}`
  },
  testCases: [
    {
      input: ["anagram", "nagaram"],
      output: true
    },
    {
      input: ["rat", "car"],
      output: false
    },
    {
      input: ["a", "a"],
      output: true
    },
    {
      input: ["ab", "a"],
      output: false
    },
    {
      input: ["anagram", "nagaramm"],
      output: false,
      isHidden: true
    }
  ],
  approaches: [
    {
      name: "Sorting",
      description: `A simple approach is to sort both strings and then compare them. If they are anagrams, the sorted strings will be identical.

This approach is straightforward and easy to understand.`,
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      code: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        # If the lengths are different, they can't be anagrams
        if len(s) != len(t):
            return False
        
        # Sort both strings and compare them
        return sorted(s) == sorted(t)`
    },
    {
      name: "Hash Map",
      description: `We can use a hash map to count the frequency of each character in the first string, and then decrement the counts while iterating through the second string.

The steps are:
1. If the strings have different lengths, return false.
2. Create a hash map to store character frequencies.
3. Iterate through the first string, incrementing the count for each character.
4. Iterate through the second string, decrementing the count for each character.
   - If a character doesn't exist in the hash map or its count is already 0, return false.
5. Return true if we successfully processed both strings.

This approach is more efficient than sorting for large strings.`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(k)",
      code: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        # If the lengths are different, they can't be anagrams
        if len(s) != len(t):
            return False
        
        # Create a hash map for character counts
        char_count = {}
        
        # Count characters in the first string
        for char in s:
            char_count[char] = char_count.get(char, 0) + 1
        
        # Decrement counts for the second string
        for char in t:
            # If character doesn't exist or count is already 0, not an anagram
            if char not in char_count or char_count[char] == 0:
                return False
            char_count[char] -= 1
        
        # If we've processed both strings successfully, they're anagrams
        return True`
    }
  ],
  hints: [
    "Could you solve it in O(n) time?",
    "If two strings are anagrams, they must have the same characters with the same frequencies.",
    "Try using a hash map to count character frequencies."
  ],
  relatedProblems: [
    {
      id: "49",
      title: "Group Anagrams",
      difficulty: "Medium"
    },
    {
      id: "438",
      title: "Find All Anagrams in a String",
      difficulty: "Medium"
    }
  ]
}; 