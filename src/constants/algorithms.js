export const SORTING_ALGORITHMS = {
  'bubble-sort': {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'sorting',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    working: 'Compare adjacent pairs and swap if out of order. After each pass, the largest unsorted element bubbles to its correct position.',
    dryRun: 'Array [5,3,8,1]: Pass 1 compares 5-3 (swap→[3,5,8,1]), 5-8 (no swap), 8-1 (swap→[3,5,1,8]). Largest element 8 is now in place.',
    advantages: ['Simple to understand and implement', 'In-place sorting', 'Stable algorithm', 'Can detect if array is already sorted'],
    disadvantages: ['Very slow O(n²) for large datasets', 'Many unnecessary comparisons', 'Not suitable for production use'],
    applications: ['Educational purposes', 'Small datasets', 'Nearly sorted data with optimizations'],
    pseudocode: `function bubbleSort(arr):
  n = arr.length
  for i = 0 to n-1:
    for j = 0 to n-i-2:
      if arr[j] > arr[j+1]:
        swap(arr[j], arr[j+1])`,
  },
  'selection-sort': {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'sorting',
    timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    description: 'Divides the input into sorted and unsorted regions, repeatedly selecting the smallest element from the unsorted region.',
    working: 'Find minimum element in unsorted portion, swap with first unsorted position, repeat until sorted.',
    dryRun: 'Array [64,25,12,22]: Find min 12 at index 2, swap with index 0 → [12,25,64,22]. Next min 22, swap → [12,22,64,25].',
    advantages: ['Simple implementation', 'In-place', 'Minimal swaps (at most n swaps)', 'Performs well when memory write is costly'],
    disadvantages: ['O(n²) time complexity always', 'Not stable', 'Not adaptive'],
    applications: ['Small arrays', 'Systems with expensive writes', 'When swap cost is high'],
    pseudocode: `function selectionSort(arr):
  n = arr.length
  for i = 0 to n-1:
    minIdx = i
    for j = i+1 to n-1:
      if arr[j] < arr[minIdx]:
        minIdx = j
    swap(arr[i], arr[minIdx])`,
  },
  'insertion-sort': {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'sorting',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    description: 'Builds the sorted array one element at a time by inserting each element into its correct position.',
    working: 'Take each element and insert it into the already sorted portion by shifting larger elements right.',
    dryRun: 'Array [5,2,4,6,1]: Insert 2 before 5 → [5,2,4,6,1] shifts to [2,5,4,6,1]. Insert 4 → [2,4,5,6,1].',
    advantages: ['Efficient for small datasets', 'Adaptive - O(n) for nearly sorted', 'Stable and in-place', 'Online algorithm'],
    disadvantages: ['O(n²) for large/random data', 'Many shifts required', 'Not suitable for large arrays'],
    applications: ['Small arrays', 'Nearly sorted data', 'Used in hybrid sorts (Timsort)', 'Online sorting'],
    pseudocode: `function insertionSort(arr):
  for i = 1 to arr.length-1:
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
      arr[j+1] = arr[j]
      j = j - 1
    arr[j+1] = key`,
  },
  'merge-sort': {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'sorting',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false,
    description: 'Divide-and-conquer algorithm that divides array into halves, sorts them, and merges sorted halves.',
    working: 'Recursively split array in half until single elements, then merge sorted subarrays.',
    dryRun: '[38,27,43,3] → split [38,27][43,3] → [38][27][43][3] → merge [27,38][3,43] → merge [3,27,38,43].',
    advantages: ['Guaranteed O(n log n)', 'Stable', 'Predictable performance', 'Good for linked lists and external sorting'],
    disadvantages: ['O(n) extra space', 'Not in-place', 'Slower than quicksort in practice for arrays'],
    applications: ['Large datasets', 'External sorting', 'Linked list sorting', 'When stability is required'],
    pseudocode: `function mergeSort(arr, l, r):
  if l < r:
    m = (l + r) / 2
    mergeSort(arr, l, m)
    mergeSort(arr, m+1, r)
    merge(arr, l, m, r)`,
  },
  'quick-sort': {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'sorting',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    stable: false,
    inPlace: true,
    description: 'Picks a pivot element and partitions array around pivot, placing smaller elements left and larger right.',
    working: 'Choose pivot, partition array, recursively sort left and right partitions.',
    dryRun: '[10,7,8,9,1,5]: Pivot=5, partition → [1,5,10,7,8,9] with 1,5 sorted relative to pivot region.',
    advantages: ['Fast average case O(n log n)', 'In-place', 'Cache-friendly', 'Most used in practice'],
    disadvantages: ['O(n²) worst case', 'Not stable', 'Pivot choice affects performance'],
    applications: ['General-purpose sorting', 'Standard library implementations', 'Large in-memory datasets'],
    pseudocode: `function quickSort(arr, low, high):
  if low < high:
    pi = partition(arr, low, high)
    quickSort(arr, low, pi-1)
    quickSort(arr, pi+1, high)`,
  },
  'heap-sort': {
    id: 'heap-sort',
    name: 'Heap Sort',
    category: 'sorting',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    description: 'Uses binary heap data structure, building max-heap then repeatedly extracting maximum.',
    working: 'Build max heap from array, swap root with last element, heapify reduced heap, repeat.',
    dryRun: 'Build heap from [4,10,3,5,1], extract max 10 to end, heapify, extract 5, continue until sorted.',
    advantages: ['Guaranteed O(n log n)', 'In-place', 'No worst-case degradation', 'No extra space needed'],
    disadvantages: ['Not stable', 'Slower than quicksort in practice', 'Poor cache locality'],
    applications: ['Priority queue operations', 'When guaranteed O(n log n) needed in-place', 'Embedded systems'],
    pseudocode: `function heapSort(arr):
  buildMaxHeap(arr)
  for i = n-1 down to 1:
    swap(arr[0], arr[i])
    heapify(arr, 0, i)`,
  },
  'shell-sort': {
    id: 'shell-sort',
    name: 'Shell Sort',
    category: 'sorting',
    timeComplexity: { best: 'O(n log n)', average: 'O(n^1.25)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    description: 'Generalization of insertion sort that allows exchange of far-apart elements using diminishing gap sequences.',
    working: 'Sort elements at specific gap intervals, reduce gap, repeat until gap is 1 (standard insertion sort).',
    dryRun: 'Gap=3 on [35,33,42,10,14,19,27,44]: Sort indices 0,3,6 then 1,4,7 etc., then gap=1.',
    advantages: ['Better than O(n²) insertion sort', 'In-place', 'Simple code', 'No extra memory'],
    disadvantages: ['Not stable', 'Complexity depends on gap sequence', 'Less predictable than merge sort'],
    applications: ['Medium-sized arrays', 'Embedded systems', 'When simple in-place sort needed'],
    pseudocode: `function shellSort(arr):
  n = arr.length
  for gap = n/2; gap > 0; gap = gap/2:
    for i = gap to n-1:
      temp = arr[i]
      j = i
      while j >= gap and arr[j-gap] > temp:
        arr[j] = arr[j-gap]
        j -= gap
      arr[j] = temp`,
  },
  'counting-sort': {
    id: 'counting-sort',
    name: 'Counting Sort',
    category: 'sorting',
    timeComplexity: { best: 'O(n+k)', average: 'O(n+k)', worst: 'O(n+k)' },
    spaceComplexity: 'O(k)',
    stable: true,
    inPlace: false,
    description: 'Non-comparison sort that counts occurrences of each distinct element.',
    working: 'Count frequency of each value, compute cumulative counts, place elements in output using counts.',
    dryRun: '[4,2,2,8,3,3,1]: Count 1→1, 2→2, 3→2, 4→1, 8→1. Output using cumulative positions.',
    advantages: ['Linear time for small range k', 'Stable', 'Very fast for integer sorting'],
    disadvantages: ['Only works for integers in limited range', 'Extra space O(k)', 'Not comparison-based'],
    applications: ['Sorting integers in small range', 'Radix sort subroutine', 'Frequency counting'],
    pseudocode: `function countingSort(arr, maxVal):
  count = array of zeros size maxVal+1
  for x in arr: count[x]++
  for i = 1 to maxVal: count[i] += count[i-1]
  output = new array
  for x in reversed(arr):
    output[count[x]-1] = x
    count[x]--`,
  },
  'radix-sort': {
    id: 'radix-sort',
    name: 'Radix Sort',
    category: 'sorting',
    timeComplexity: { best: 'O(nk)', average: 'O(nk)', worst: 'O(nk)' },
    spaceComplexity: 'O(n+k)',
    stable: true,
    inPlace: false,
    description: 'Sorts integers by processing individual digits using counting sort as subroutine.',
    working: 'Sort by least significant digit, then next significant digit, up to most significant digit.',
    dryRun: '[170,45,75,90,802,24,2,66]: Sort by ones digit, then tens, then hundreds → sorted.',
    advantages: ['Linear time O(nk)', 'Stable', 'Good for fixed-length integers'],
    disadvantages: ['Only for integers/strings', 'Extra space required', 'k depends on digit count'],
    applications: ['Sorting large integers', 'String sorting', 'IP address sorting'],
    pseudocode: `function radixSort(arr):
  max = findMax(arr)
  exp = 1
  while max/exp > 0:
    countingSortByDigit(arr, exp)
    exp *= 10`,
  },
  'bucket-sort': {
    id: 'bucket-sort',
    name: 'Bucket Sort',
    category: 'sorting',
    timeComplexity: { best: 'O(n+k)', average: 'O(n+k)', worst: 'O(n²)' },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false,
    description: 'Distributes elements into buckets, sorts each bucket individually, then concatenates.',
    working: 'Create n buckets, distribute elements based on range, sort each bucket, merge buckets.',
    dryRun: 'Values in [0,1): bucket 0 gets 0.42, bucket 1 gets 0.32, sort each, concatenate.',
    advantages: ['Linear average case', 'Stable when bucket sort is stable', 'Good for uniformly distributed data'],
    disadvantages: ['Worst case O(n²)', 'Extra space', 'Performance depends on distribution'],
    applications: ['Uniformly distributed floats', 'External sorting', 'Parallel sorting'],
    pseudocode: `function bucketSort(arr):
  n = arr.length
  buckets = create n empty buckets
  for x in arr:
    bucketIndex = floor(n * x)
    buckets[bucketIndex].append(x)
  for bucket in buckets:
    sort(bucket)
  return concatenate(buckets)`,
  },
};

export const SEARCHING_ALGORITHMS = {
  'linear-search': {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'searching',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    description: 'Sequentially checks each element until target is found or list ends.',
    working: 'Start from first element, compare with target, move to next until found or exhausted.',
    dryRun: 'Search 22 in [10,20,30,22,40]: Check 10(no), 20(no), 30(no), 22(found at index 3).',
    advantages: ['Works on unsorted arrays', 'Simple', 'No preprocessing needed'],
    disadvantages: ['Slow O(n) for large arrays', 'Not suitable for frequent searches'],
    applications: ['Small unsorted lists', 'Single search operations', 'Linked lists'],
    pseudocode: `function linearSearch(arr, target):
  for i = 0 to arr.length-1:
    if arr[i] == target: return i
  return -1`,
  },
  'binary-search': {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'searching',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    description: 'Efficiently finds target in sorted array by repeatedly dividing search interval in half.',
    working: 'Compare target with middle element. If equal, found. If smaller, search left half. If larger, search right half.',
    dryRun: 'Search 23 in [2,5,8,12,16,23,38,56,72,91]: mid=16, 23>16 search right [23,38,56,72,91], mid=56, 23<56 search left [23], found.',
    advantages: ['O(log n) time', 'Very efficient for large sorted arrays', 'Simple iterative/recursive implementation'],
    disadvantages: ['Requires sorted array', 'Not suitable for linked lists', 'Preprocessing cost for sorting'],
    applications: ['Searching sorted databases', 'Finding boundaries', 'Library implementations'],
    pseudocode: `function binarySearch(arr, target):
  low = 0, high = arr.length - 1
  while low <= high:
    mid = (low + high) / 2
    if arr[mid] == target: return mid
    if arr[mid] < target: low = mid + 1
    else: high = mid - 1
  return -1`,
  },
  'jump-search': {
    id: 'jump-search',
    name: 'Jump Search',
    category: 'searching',
    timeComplexity: { best: 'O(1)', average: 'O(√n)', worst: 'O(√n)' },
    spaceComplexity: 'O(1)',
    description: 'Jumps ahead by fixed steps √n then performs linear search in the block.',
    working: 'Jump √n steps until block containing target found, then linear search within block.',
    dryRun: 'Array size 16, jump=4: Check indices 0,4,8,12. If target between 8 and 12, linear search that block.',
    advantages: ['Better than linear O(√n)', 'Simpler than binary search', 'Works on sorted arrays'],
    disadvantages: ['Requires sorted array', 'Slower than binary search', 'Fixed jump size may not be optimal'],
    applications: ['Sorted arrays where binary search overhead is concern', 'Block-based storage systems'],
    pseudocode: `function jumpSearch(arr, target):
  n = arr.length
  step = floor(sqrt(n))
  prev = 0
  while arr[min(step,n)-1] < target:
    prev = step
    step += floor(sqrt(n))
    if prev >= n: return -1
  for i = prev to min(step,n)-1:
    if arr[i] == target: return i
  return -1`,
  },
  'interpolation-search': {
    id: 'interpolation-search',
    name: 'Interpolation Search',
    category: 'searching',
    timeComplexity: { best: 'O(1)', average: 'O(log log n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    description: 'Improves binary search by estimating position based on value distribution.',
    working: 'Estimate position using formula: pos = low + ((target-arr[low])*(high-low))/(arr[high]-arr[low])',
    dryRun: 'Search 45 in [10,20,30,40,50,60]: pos = 0 + (45-10)*5/(60-10) ≈ 3, check arr[3]=40, adjust range.',
    advantages: ['O(1) for uniformly distributed data', 'Faster than binary search on uniform data'],
    disadvantages: ['O(n) worst case', 'Requires sorted uniformly distributed data', 'Division by zero risk'],
    applications: ['Uniformly distributed sorted data', 'Phone book search', 'Numerical tables'],
    pseudocode: `function interpolationSearch(arr, target):
  low = 0, high = arr.length - 1
  while low <= high and target >= arr[low] and target <= arr[high]:
    pos = low + ((target-arr[low])*(high-low))/(arr[high]-arr[low])
    if arr[pos] == target: return pos
    if arr[pos] < target: low = pos + 1
    else: high = pos - 1
  return -1`,
  },
  'exponential-search': {
    id: 'exponential-search',
    name: 'Exponential Search',
    category: 'searching',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    description: 'Finds range where element is present by doubling index, then applies binary search.',
    working: 'Start at index 1, double until arr[i] >= target, then binary search between i/2 and i.',
    dryRun: 'Search 30 in sorted array: Check 1,2,4,8,16,32. 32>30, binary search between 16 and 32.',
    advantages: ['O(log n) time', 'Good for unbounded/infinite arrays', 'Better than binary for front-heavy targets'],
    disadvantages: ['Requires sorted array', 'Two-phase algorithm'],
    applications: ['Unbounded sorted arrays', 'Searching in infinite streams', 'When target likely near beginning'],
    pseudocode: `function exponentialSearch(arr, target):
  if arr[0] == target: return 0
  i = 1
  while i < arr.length and arr[i] <= target:
    i = i * 2
  return binarySearch(arr, target, i/2, min(i, arr.length-1))`,
  },
};

export const ALL_ALGORITHMS = {
  ...SORTING_ALGORITHMS,
  ...SEARCHING_ALGORITHMS,
};

export const SORTING_ALGO_LIST = Object.values(SORTING_ALGORITHMS);
export const SEARCHING_ALGO_LIST = Object.values(SEARCHING_ALGORITHMS);
