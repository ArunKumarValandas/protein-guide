import { createFrame, initStats, compare, doSwap } from './base';

export function* selectionSort(array) {
  const arr = [...array];
  const stats = initStats();
  const n = arr.length;
  const startTime = performance.now();
  const sorted = [];

  yield createFrame(arr, {}, { ...stats, executionTime: 0 }, { message: 'Starting Selection Sort' });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    yield createFrame(
      arr,
      { current: [i], sorted },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Finding minimum from index ${i}` },
    );

    for (let j = i + 1; j < n; j++) {
      stats.steps++;
      yield createFrame(
        arr,
        { comparing: [minIdx, j], current: [i], sorted },
        { ...stats, executionTime: performance.now() - startTime },
        { message: `Comparing ${arr[minIdx]} and ${arr[j]}` },
      );

      if (compare(stats, arr[j], arr[minIdx]) < 0) {
        minIdx = j;
        yield createFrame(
          arr,
          { current: [minIdx], sorted },
          { ...stats, executionTime: performance.now() - startTime },
          { message: `New minimum: ${arr[minIdx]}` },
        );
      }
    }

    if (minIdx !== i) {
      doSwap(arr, stats, i, minIdx);
      yield createFrame(
        arr,
        { swapping: [i, minIdx], sorted },
        { ...stats, executionTime: performance.now() - startTime },
        { message: `Placed ${arr[i]} at position ${i}` },
      );
    }

    sorted.push(i);
    yield createFrame(
      arr,
      { sorted: [...sorted] },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Position ${i} sorted` },
    );
  }

  sorted.push(n - 1);
  yield createFrame(
    arr,
    { sorted: arr.map((_, i) => i) },
    { ...stats, executionTime: performance.now() - startTime },
    { message: 'Sorting complete!' },
  );
}
