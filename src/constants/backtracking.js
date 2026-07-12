export const BACKTRACKING_ALGORITHMS = {
  'n-queens': {
    id: 'n-queens',
    name: 'N-Queens',
    category: 'backtracking',
    timeComplexity: { best: 'O(n!)', average: 'O(n!)', worst: 'O(n!)' },
    spaceComplexity: 'O(n)',
    description: 'Places n queens on an n by n board so no two queens attack each other.',
    working: 'Place one queen per row, try each column, reject unsafe positions, and backtrack when a row has no valid column.',
    dryRun: 'For 4 queens, place row 0, try row 1, reject conflicts, backtrack until all 4 rows are filled safely.',
    advantages: ['Clear constraint-search pattern', 'Prunes invalid branches early', 'Classic recursion practice'],
    disadvantages: ['Exponential search space', 'Sensitive to constraint checks', 'Many dead ends'],
    applications: ['Constraint satisfaction', 'Scheduling', 'Puzzle solving'],
    pseudocode: `solve(row):
  if row == n: return true
  for col in 0..n-1:
    if safe(row, col):
      place queen
      if solve(row+1): return true
      remove queen`,
    interviewQuestions: ['How do you check diagonal conflicts?', 'Why place one queen per row?', 'How do you return all solutions?'],
    commonMistakes: ['Forgetting to remove a queen on backtrack', 'Incorrect diagonal checks', 'Allowing two queens in one column'],
  },
  sudoku: {
    id: 'sudoku',
    name: 'Sudoku Solver',
    category: 'backtracking',
    timeComplexity: { best: 'O(1)', average: 'O(9^m)', worst: 'O(9^m)' },
    spaceComplexity: 'O(m)',
    description: 'Fills empty Sudoku cells by trying valid digits and backtracking when a choice leads to contradiction.',
    working: 'Find an empty cell, try digits 1-9 that satisfy row/column/box constraints, recurse, and undo invalid guesses.',
    dryRun: 'At an empty cell, try 1. If row conflict, reject. Try 4, recurse. If later stuck, clear 4 and try next digit.',
    advantages: ['Prunes by constraints', 'Works for exact puzzle solving', 'Demonstrates recursive search cleanly'],
    disadvantages: ['Worst case is exponential', 'Naive empty-cell choice can be slow', 'Constraint bookkeeping can be error-prone'],
    applications: ['Puzzle solvers', 'Constraint programming', 'Exact cover problems'],
    pseudocode: `solve():
  cell = findEmpty()
  if no cell: return true
  for digit in 1..9:
    if valid(cell, digit):
      place digit
      if solve(): return true
      clear cell`,
    interviewQuestions: ['How do you validate a digit?', 'How can you optimize cell choice?', 'What does backtracking undo?'],
    commonMistakes: ['Not clearing failed guesses', 'Ignoring 3x3 boxes', 'Continuing after puzzle is solved'],
  },
  permutations: {
    id: 'permutations',
    name: 'Permutations',
    category: 'backtracking',
    timeComplexity: { best: 'O(n!)', average: 'O(n!)', worst: 'O(n!)' },
    spaceComplexity: 'O(n)',
    description: 'Generates all orderings of a set by choosing each unused item for the next position.',
    working: 'Build a path, choose an unused value, recurse, then remove it to explore the next choice.',
    dryRun: '[1,2,3]: choose 1, choose 2, choose 3 -> [1,2,3], backtrack, then [1,3,2].',
    advantages: ['Canonical recursion pattern', 'Easy to adapt for combinations/subsets', 'Explores complete search tree'],
    disadvantages: ['Factorial output size', 'Needs duplicate handling for repeated values', 'Can consume memory if storing all results'],
    applications: ['Ordering problems', 'Test generation', 'Search and optimization'],
    pseudocode: `backtrack(path):
  if path.length == n: output path
  for value in values:
    if value unused:
      choose value
      backtrack(path)
      unchoose value`,
    interviewQuestions: ['How do you avoid reusing values?', 'How do you handle duplicates?', 'Why is complexity factorial?'],
    commonMistakes: ['Forgetting to unchoose', 'Mutating shared arrays incorrectly', 'Not copying completed paths'],
  },
};

export const BACKTRACKING_ALGO_LIST = Object.values(BACKTRACKING_ALGORITHMS);
