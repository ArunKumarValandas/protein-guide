import { createFrame, initStats, compare, doSwap } from './base';

export function* bubbleSort(array) {
  const arr = [...array];
  const stats = initStats();
  const n = arr.length;
  const startTime = performance.now();

  yield createFrame(arr, {}, { ...stats, executionTime: 0 }, { message: 'Starting Bubble Sort' });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      stats.steps++;
      yield createFrame(
        arr,
        { comparing: [j, j + 1], sorted: Array.from({ length: i }, (_, k) => n - 1 - k) },
        { ...stats, executionTime: performance.now() - startTime },
        { message: `Comparing ${arr[j]} and ${arr[j + 1]}` },
      );

      if (compare(stats, arr[j], arr[j + 1]) > 0) {
        doSwap(arr, stats, j, j + 1);
        swapped = true;
        yield createFrame(
          arr,
          { swapping: [j, j + 1], sorted: Array.from({ length: i }, (_, k) => n - 1 - k) },
          { ...stats, executionTime: performance.now() - startTime },
          { message: `Swapped ${arr[j]} and ${arr[j + 1]}` },
        );
      }
    }

    yield createFrame(
      arr,
      { sorted: [n - 1 - i] },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Element ${arr[n - 1 - i]} in correct position` },
    );

    if (!swapped) break;
  }

  yield createFrame(
    arr,
    { sorted: arr.map((_, i) => i) },
    { ...stats, executionTime: performance.now() - startTime },
    { message: 'Sorting complete!' },
  );
}
