export const problem = {
  id: "121",
  slug: "best-time-to-buy-sell-stock",
  title: "Best Time to Buy and Sell Stock",
  description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`ith\` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.`,
  difficulty: "Easy",
  category: "Sliding Window",
  acceptanceRate: 78.9,
  likes: 24500,
  dislikes: 850,
  examples: [
    {
      input: "prices = [7,1,5,3,6,4]",
      output: "5",
      explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5. Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell."
    },
    {
      input: "prices = [7,6,4,3,1]",
      output: "0",
      explanation: "In this case, no transactions are done and the max profit = 0."
    }
  ],
  constraints: [
    "1 <= prices.length <= 10^5",
    "0 <= prices[i] <= 10^4"
  ],
  starterCode: {
    python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # Your code here
        pass`,
    javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // Your code here
};`,
    java: `class Solution {
    public int maxProfit(int[] prices) {
        // Your code here
        return 0;
    }
}`
  },
  testCases: [
    {
      input: [7,1,5,3,6,4],
      output: 5
    },
    {
      input: [7,6,4,3,1],
      output: 0
    },
    {
      input: [2,4,1],
      output: 2
    },
    {
      input: [1,2],
      output: 1,
      isHidden: true
    },
    {
      input: [3,3],
      output: 0,
      isHidden: true
    }
  ],
  approaches: [
    {
      name: "Brute Force",
      description: `The brute force approach is straightforward: we examine every possible pair of buy and sell dates (with the buy date before the sell date) and keep track of the maximum profit.

For each possible buy date, we look at all future days as potential sell dates and calculate the profit. If this profit is greater than our current maximum profit, we update our maximum profit.`,
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      code: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        max_profit = 0
        
        for i in range(len(prices)):
            for j in range(i + 1, len(prices)):
                profit = prices[j] - prices[i]
                max_profit = max(max_profit, profit)
                
        return max_profit`
    },
    {
      name: "One Pass",
      description: `We can solve this problem with a single pass through the array. The key insight is to track the minimum price we've seen so far and compute the maximum profit we could get by selling at the current price.

As we iterate through the array:
1. We update the minimum price seen so far.
2. We calculate the potential profit if we sell at the current price.
3. We update the maximum profit if the current potential profit is greater.`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      code: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        if not prices:
            return 0
            
        max_profit = 0
        min_price = float('inf')
        
        for price in prices:
            # Update the minimum price seen so far
            min_price = min(min_price, price)
            
            # Calculate potential profit if we sell at current price
            current_profit = price - min_price
            
            # Update max profit if current profit is greater
            max_profit = max(max_profit, current_profit)
            
        return max_profit`
    }
  ],
  hints: [
    "Try to find the smallest valley followed by the highest peak.",
    "You need to buy before you can sell.",
    "What's the maximum profit you can get by selling on each day if you've already found the minimum price before that day?"
  ],
  relatedProblems: [
    {
      id: "122",
      title: "Best Time to Buy and Sell Stock II",
      difficulty: "Medium"
    },
    {
      id: "123",
      title: "Best Time to Buy and Sell Stock III",
      difficulty: "Hard"
    },
    {
      id: "188",
      title: "Best Time to Buy and Sell Stock IV",
      difficulty: "Hard"
    }
  ]
}; 