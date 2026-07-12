import { createSearchFrame, initSearchStats } from './base';

export function* binarySearch(array, target) {
  const arr = [...array];
  const stats = initSearchStats();
  const startTime = performance.now();
  let low = 0;
  let high = arr.length - 1;

  yield createSearchFrame(
    arr,
    { target, range: [low, high] },
    { ...stats, executionTime: 0 },
    { message: `Binary Search for ${target} in sorted array` },
  );

  while (low <= high) {
    stats.steps++;
    const mid = Math.floor((low + high) / 2);
    stats.comparisons++;

    yield createSearchFrame(
      arr,
      { current: [mid], comparing: [mid], range: [low, high], low, high, mid, target },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Checking mid index ${mid}: ${arr[mid]}` },
    );

    if (arr[mid] === target) {
      stats.found = true;
      stats.foundIndex = mid;
      yield createSearchFrame(
        arr,
        { found: [mid], target },
        { ...stats, executionTime: performance.now() - startTime },
        { message: `Found ${target} at index ${mid}!` },
      );
      return;
    }

    if (arr[mid] < target) {
      low = mid + 1;
      yield createSearchFrame(
        arr,
        { range: [low, high], low, high, target, eliminated: Array.from({ length: mid - low + 1 }, (_, i) => low + i) },
        { ...stats, executionTime: performance.now() - startTime },
        { message: `${arr[mid]} < ${target}, search right half` },
      );
    } else {
      high = mid - 1;
      yield createSearchFrame(
        arr,
        { range: [low, high], low, high, target },
        { ...stats, executionTime: performance.now() - startTime },
        { message: `${arr[mid]} > ${target}, search left half` },
      );
    }
  }

  yield createSearchFrame(
    arr,
    { target },
    { ...stats, executionTime: performance.now() - startTime },
    { message: `${target} not found` },
  );
}
