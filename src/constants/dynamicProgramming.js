export const DP_ALGORITHMS = {
  fibonacci: {
    id: 'fibonacci',
    name: 'Fibonacci DP',
    category: 'dp',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    description: 'Computes Fibonacci numbers bottom-up by storing previously solved subproblems.',
    working: 'Initialize dp[0] and dp[1], then fill dp[i] = dp[i-1] + dp[i-2].',
    dryRun: 'n=6: dp=[0,1], dp[2]=1, dp[3]=2, dp[4]=3, dp[5]=5, dp[6]=8.',
    advantages: ['Avoids exponential recursion', 'Simple recurrence', 'Great intro to tabulation'],
    disadvantages: ['Can be optimized to O(1) space', 'Only applies when overlapping subproblems exist'],
    applications: ['Recurrence optimization', 'Counting problems', 'DP teaching'],
    pseudocode: `dp[0] = 0, dp[1] = 1
for i = 2 to n:
  dp[i] = dp[i-1] + dp[i-2]`,
    interviewQuestions: ['Why is naive Fibonacci exponential?', 'How do you reduce space to O(1)?', 'What are overlapping subproblems?'],
    commonMistakes: ['Wrong base cases', 'Off-by-one table size', 'Using recursion without memoization'],
  },
  knapsack: {
    id: 'knapsack',
    name: '0/1 Knapsack',
    category: 'dp',
    timeComplexity: { best: 'O(nW)', average: 'O(nW)', worst: 'O(nW)' },
    spaceComplexity: 'O(nW)',
    description: 'Maximizes value under a capacity limit when each item can be taken at most once.',
    working: 'For each item and capacity, choose max of excluding or including the current item.',
    dryRun: 'Capacity 5, item weight 3 value 4: dp[i][5] = max(skip, 4 + dp[i-1][2]).',
    advantages: ['Guarantees optimal answer', 'Clear include/exclude choice', 'Classic DP pattern'],
    disadvantages: ['Pseudo-polynomial in capacity', 'Table can be large', 'Requires integer capacity'],
    applications: ['Resource allocation', 'Budget optimization', 'Cargo loading'],
    pseudocode: `for i = 1 to n:
  for w = 0 to capacity:
    dp[i][w] = dp[i-1][w]
    if weight[i] <= w:
      dp[i][w] = max(dp[i][w], value[i] + dp[i-1][w-weight[i]])`,
    interviewQuestions: ['Why is 0/1 different from unbounded knapsack?', 'How can space be optimized?', 'Why is complexity O(nW)?'],
    commonMistakes: ['Iterating capacity forward in 1D 0/1 DP', 'Mixing item indexes', 'Using greedy value/weight ratio for 0/1 knapsack'],
  },
  lcs: {
    id: 'lcs',
    name: 'Longest Common Subsequence',
    category: 'dp',
    timeComplexity: { best: 'O(mn)', average: 'O(mn)', worst: 'O(mn)' },
    spaceComplexity: 'O(mn)',
    description: 'Finds the longest sequence appearing in two strings without requiring contiguous characters.',
    working: 'If characters match, extend diagonal. Otherwise take max of top and left cells.',
    dryRun: 'ABCBDAB and BDCABA share subsequences like BCBA and BDAB of length 4.',
    advantages: ['Foundational string DP', 'Handles non-contiguous matches', 'Can reconstruct the sequence'],
    disadvantages: ['O(mn) memory for reconstruction', 'Not substring matching', 'Table grows quickly for long strings'],
    applications: ['Diff tools', 'Bioinformatics', 'Version comparison'],
    pseudocode: `if a[i-1] == b[j-1]:
  dp[i][j] = 1 + dp[i-1][j-1]
else:
  dp[i][j] = max(dp[i-1][j], dp[i][j-1])`,
    interviewQuestions: ['How is subsequence different from substring?', 'How do you reconstruct the LCS?', 'Can memory be optimized?'],
    commonMistakes: ['Treating it as contiguous substring', 'Incorrect index offsets', 'Forgetting empty-prefix row and column'],
  },
};

export const DP_ALGO_LIST = Object.values(DP_ALGORITHMS);
