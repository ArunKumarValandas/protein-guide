import { createFrame, initStats, doSwap } from './base';

function* heapify(arr, stats, startTime, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    stats.comparisons++;
    yield createFrame(
      arr,
      { comparing: [largest, left], heapifying: true },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Comparing parent ${arr[largest]} with left child ${arr[left]}` },
    );
    if (arr[left] > arr[largest]) largest = left;
  }

  if (right < n) {
    stats.comparisons++;
    yield createFrame(
      arr,
      { comparing: [largest, right], heapifying: true },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Comparing with right child ${arr[right]}` },
    );
    if (arr[right] > arr[largest]) largest = right;
  }

  if (largest !== i) {
    doSwap(arr, stats, i, largest);
    yield createFrame(
      arr,
      { swapping: [i, largest], heapifying: true },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Swapped to maintain heap property` },
    );
    yield* heapify(arr, stats, startTime, n, largest);
  }
}

export function* heapSort(array) {
  const arr = [...array];
  const stats = initStats();
  const n = arr.length;
  const startTime = performance.now();

  yield createFrame(arr, {}, { ...stats, executionTime: 0 }, { message: 'Starting Heap Sort - Building Max Heap' });

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    stats.steps++;
    yield* heapify(arr, stats, startTime, n, i);
  }

  yield createFrame(
    arr,
    { heapBuilt: true },
    { ...stats, executionTime: performance.now() - startTime },
    { message: 'Max heap built' },
  );

  for (let i = n - 1; i > 0; i--) {
    doSwap(arr, stats, 0, i);
    yield createFrame(
      arr,
      { swapping: [0, i], sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k) },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Extracted max ${arr[i]} to position ${i}` },
    );
    yield* heapify(arr, stats, startTime, i, 0);
  }

  yield createFrame(
    arr,
    { sorted: arr.map((_, i) => i) },
    { ...stats, executionTime: performance.now() - startTime },
    { message: 'Sorting complete!' },
  );
}
