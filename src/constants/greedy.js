export const GREEDY_ALGORITHMS = {
  'activity-selection': {
    id: 'activity-selection',
    name: 'Activity Selection',
    category: 'greedy',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(1)',
    description: 'Selects the maximum number of non-overlapping activities by always choosing the earliest finishing compatible activity.',
    working: 'Sort activities by finish time, choose the first, then keep choosing the next activity whose start is after the last selected finish.',
    dryRun: 'Activities sorted by finish: A(1,3), B(2,5), C(4,7). Choose A, skip B, choose C.',
    advantages: ['Simple optimal greedy rule', 'Efficient after sorting', 'Classic interval scheduling pattern'],
    disadvantages: ['Requires proof of greedy choice property', 'Only maximizes count, not weighted value'],
    applications: ['Meeting scheduling', 'Room allocation', 'Event planning'],
    pseudocode: `sort activities by finish time
lastFinish = -infinity
for activity in activities:
  if activity.start >= lastFinish:
    select activity
    lastFinish = activity.finish`,
    interviewQuestions: ['Why sort by finish time?', 'Why not choose shortest duration first?', 'What changes for weighted intervals?'],
    commonMistakes: ['Sorting by start time', 'Using > instead of >= when boundaries can touch', 'Applying it to weighted scheduling'],
  },
  'fractional-knapsack': {
    id: 'fractional-knapsack',
    name: 'Fractional Knapsack',
    category: 'greedy',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(1)',
    description: 'Maximizes value by taking items in descending value-per-weight ratio, allowing fractions of an item.',
    working: 'Sort by value density, take full items while capacity allows, then take the needed fraction of the next best item.',
    dryRun: 'Capacity 50: take item ratio 6 fully, ratio 5 fully, then part of ratio 4 item.',
    advantages: ['Optimal with divisible items', 'Simple density rule', 'Fast after sorting'],
    disadvantages: ['Does not solve 0/1 knapsack', 'Requires divisible items', 'Floating-point fractions may appear'],
    applications: ['Resource allocation', 'Cargo loading with divisible goods', 'Investment allocation'],
    pseudocode: `sort items by value / weight descending
for item in items:
  if item.weight <= capacity:
    take all
  else:
    take capacity / item.weight fraction
    stop`,
    interviewQuestions: ['Why does ratio work here?', 'Why does it fail for 0/1 knapsack?', 'What is the sorting cost?'],
    commonMistakes: ['Using total value instead of ratio', 'Applying fractional logic to indivisible items', 'Forgetting the final partial item'],
  },
  huffman: {
    id: 'huffman',
    name: 'Huffman Coding',
    category: 'greedy',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    description: 'Builds an optimal prefix code by repeatedly merging the two lowest-frequency nodes.',
    working: 'Push all frequencies into a min-heap. Pop the two smallest, merge them, and push the combined node until one root remains.',
    dryRun: 'Frequencies 5, 9, 12: merge 5+9=14, then merge 12+14=26.',
    advantages: ['Optimal prefix code', 'Lossless compression foundation', 'Elegant greedy merge rule'],
    disadvantages: ['Needs frequency table', 'Tree overhead for small inputs', 'Static Huffman needs two-pass encoding'],
    applications: ['Compression', 'Encoding systems', 'Data transmission'],
    pseudocode: `heap = all frequencies
while heap size > 1:
  a = extractMin()
  b = extractMin()
  heap.insert(a + b)`,
    interviewQuestions: ['Why merge two smallest frequencies?', 'What is a prefix code?', 'Why use a min-heap?'],
    commonMistakes: ['Merging largest nodes', 'Not reinserting combined frequency', 'Confusing Huffman with encryption'],
  },
};

export const GREEDY_ALGO_LIST = Object.values(GREEDY_ALGORITHMS);
