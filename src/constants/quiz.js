export const QUIZ_QUESTIONS = [
  {
    id: 'binary-search-requirement',
    prompt: 'What is the key requirement for binary search?',
    options: ['The array must be sorted', 'The array must contain only primes', 'The array must be circular', 'The array must be reversed'],
    correctIndex: 0,
    explanation: 'Binary search discards half the search space using sorted ordering.',
  },
  {
    id: 'bfs-shortest',
    prompt: 'Which algorithm guarantees the shortest path in an unweighted graph?',
    options: ['BFS', 'DFS', 'Quick Sort', 'Huffman Coding'],
    correctIndex: 0,
    explanation: 'BFS explores level by level, so the first time it reaches a node is by shortest edge count.',
  },
  {
    id: 'dp-property',
    prompt: 'Dynamic programming is most useful when a problem has:',
    options: ['Overlapping subproblems and optimal substructure', 'Only random inputs', 'No recurrence relation', 'Constant-time sorting'],
    correctIndex: 0,
    explanation: 'DP stores reusable subproblem answers and combines optimal choices.',
  },
  {
    id: 'stack-order',
    prompt: 'A stack follows which access pattern?',
    options: ['LIFO', 'FIFO', 'Sorted order', 'Priority order'],
    correctIndex: 0,
    explanation: 'Stacks remove the last item pushed first.',
  },
  {
    id: 'greedy-knapsack',
    prompt: 'The value/weight greedy rule is optimal for:',
    options: ['Fractional knapsack', '0/1 knapsack', 'Merge sort', 'Sudoku'],
    correctIndex: 0,
    explanation: 'Fractional knapsack allows taking part of an item, which makes density sorting optimal.',
  },
];
