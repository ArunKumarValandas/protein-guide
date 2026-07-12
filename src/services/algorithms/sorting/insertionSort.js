import { createFrame, initStats, compare } from './base';

export function* insertionSort(array) {
  const arr = [...array];
  const stats = initStats();
  const n = arr.length;
  const startTime = performance.now();
  const sorted = [0];

  yield createFrame(arr, { sorted: [0] }, { ...stats, executionTime: 0 }, { message: 'Starting Insertion Sort' });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    yield createFrame(
      arr,
      { current: [i], key: i, sorted },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Inserting ${key} into sorted portion` },
    );

    while (j >= 0) {
      stats.steps++;
      yield createFrame(
        arr,
        { comparing: [j, i], current: [j], key: i, sorted },
        { ...stats, executionTime: performance.now() - startTime },
        { message: `Comparing ${arr[j]} with key ${key}` },
      );

      if (compare(stats, arr[j], key) > 0) {
        arr[j + 1] = arr[j];
        stats.swaps++;
        yield createFrame(
          arr,
          { shifting: [j, j + 1], current: [j], sorted },
          { ...stats, executionTime: performance.now() - startTime },
          { message: `Shifting ${arr[j + 1]} right` },
        );
        j--;
      } else {
        break;
      }
    }

    arr[j + 1] = key;
    sorted.push(i);
    yield createFrame(
      arr,
      { current: [j + 1], sorted: [...sorted] },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Inserted ${key} at position ${j + 1}` },
    );
  }

  yield createFrame(
    arr,
    { sorted: arr.map((_, i) => i) },
    { ...stats, executionTime: performance.now() - startTime },
    { message: 'Sorting complete!' },
  );
}
