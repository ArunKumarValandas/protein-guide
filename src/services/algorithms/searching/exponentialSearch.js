import { createSearchFrame, initSearchStats } from './base';

function* binarySearchRange(arr, stats, startTime, target, low, high) {
  while (low <= high) {
    stats.steps++;
    const mid = Math.floor((low + high) / 2);
    stats.comparisons++;

    yield createSearchFrame(
      arr,
      { current: [mid], comparing: [mid], range: [low, high], low, high, mid, target },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Binary search in range: mid ${mid} = ${arr[mid]}` },
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
      return mid;
    }

    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

export function* exponentialSearch(array, target) {
  const arr = [...array];
  const stats = initSearchStats();
  const startTime = performance.now();
  const n = arr.length;

  yield createSearchFrame(
    arr,
    { target },
    { ...stats, executionTime: 0 },
    { message: `Exponential Search for ${target}` },
  );

  if (arr[0] === target) {
    stats.found = true;
    stats.foundIndex = 0;
    stats.comparisons = 1;
    yield createSearchFrame(
      arr,
      { found: [0], target },
      { ...stats, executionTime: performance.now() - startTime },
      { message: 'Found at index 0!' },
    );
    return;
  }

  let i = 1;
  while (i < n && arr[i] <= target) {
    stats.steps++;
    stats.comparisons++;
    yield createSearchFrame(
      arr,
      { current: [i], comparing: [i], target },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Doubling: checking index ${i} = ${arr[i]}` },
    );
    i *= 2;
  }

  const low = Math.floor(i / 2);
  const high = Math.min(i, n - 1);

  yield createSearchFrame(
    arr,
    { range: [low, high], low, high, target },
    { ...stats, executionTime: performance.now() - startTime },
    { message: `Range found [${low}, ${high}], applying binary search` },
  );

  yield* binarySearchRange(arr, stats, startTime, target, low, high);

  if (!stats.found) {
    yield createSearchFrame(
      arr,
      { target },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `${target} not found` },
    );
  }
}
