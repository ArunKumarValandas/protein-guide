import { bubbleSort } from './bubbleSort';
import { selectionSort } from './selectionSort';
import { insertionSort } from './insertionSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';
import { heapSort } from './heapSort';
import { shellSort } from './shellSort';
import { countingSort } from './countingSort';
import { radixSort } from './radixSort';
import { bucketSort } from './bucketSort';

export const SORTING_GENERATORS = {
  'bubble-sort': bubbleSort,
  'selection-sort': selectionSort,
  'insertion-sort': insertionSort,
  'merge-sort': mergeSort,
  'quick-sort': quickSort,
  'heap-sort': heapSort,
  'shell-sort': shellSort,
  'counting-sort': countingSort,
  'radix-sort': radixSort,
  'bucket-sort': bucketSort,
};

export function runSortingAlgorithm(algorithmId, array) {
  const generator = SORTING_GENERATORS[algorithmId];
  if (!generator) throw new Error(`Unknown sorting algorithm: ${algorithmId}`);

  const frames = [];
  const gen = generator([...array]);

  for (const frame of gen) {
    frames.push(frame);
  }

  return frames;
}

export * from './bubbleSort';
export * from './selectionSort';
export * from './insertionSort';
export * from './mergeSort';
export * from './quickSort';
export * from './heapSort';
export * from './shellSort';
export * from './countingSort';
export * from './radixSort';
export * from './bucketSort';
