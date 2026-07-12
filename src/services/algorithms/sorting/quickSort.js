import { createFrame, initStats, compare, doSwap } from './base';

function* partition(arr, stats, startTime, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  yield createFrame(
    arr,
    { pivot: high, partitioning: Array.from({ length: high - low + 1 }, (_, k) => low + k) },
    { ...stats, executionTime: performance.now() - startTime },
    { message: `Pivot: ${pivot}` },
  );

  for (let j = low; j < high; j++) {
    stats.steps++;
    yield createFrame(
      arr,
      { comparing: [j, high], pivot: high },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Comparing ${arr[j]} with pivot ${pivot}` },
    );

    if (compare(stats, arr[j], pivot) < 0) {
      i++;
      if (i !== j) {
        doSwap(arr, stats, i, j);
        yield createFrame(
          arr,
          { swapping: [i, j], pivot: high },
          { ...stats, executionTime: performance.now() - startTime },
          { message: `Swapped ${arr[i]} and ${arr[j]}` },
        );
      }
    }
  }

  doSwap(arr, stats, i + 1, high);
  yield createFrame(
    arr,
    { pivot: i + 1, sorted: [i + 1] },
    { ...stats, executionTime: performance.now() - startTime },
    { message: `Pivot ${pivot} placed at index ${i + 1}` },
  );

  return i + 1;
}

function* quickSortHelper(arr, stats, startTime, low, high) {
  if (low < high) {
    const pi = yield* partition(arr, stats, startTime, low, high);
    yield* quickSortHelper(arr, stats, startTime, low, pi - 1);
    yield* quickSortHelper(arr, stats, startTime, pi + 1, high);
  }
}

export function* quickSort(array) {
  const arr = [...array];
  const stats = initStats();
  const startTime = performance.now();

  yield createFrame(arr, {}, { ...stats, executionTime: 0 }, { message: 'Starting Quick Sort' });
  yield* quickSortHelper(arr, stats, startTime, 0, arr.length - 1);
  yield createFrame(
    arr,
    { sorted: arr.map((_, i) => i) },
    { ...stats, executionTime: performance.now() - startTime },
    { message: 'Sorting complete!' },
  );
}
