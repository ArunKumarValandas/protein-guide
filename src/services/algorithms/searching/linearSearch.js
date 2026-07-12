import { createSearchFrame, initSearchStats } from './base';

export function* linearSearch(array, target) {
  const arr = [...array];
  const stats = initSearchStats();
  const startTime = performance.now();

  yield createSearchFrame(
    arr,
    { target },
    { ...stats, executionTime: 0 },
    { message: `Searching for ${target} using Linear Search` },
  );

  for (let i = 0; i < arr.length; i++) {
    stats.steps++;
    stats.comparisons++;
    yield createSearchFrame(
      arr,
      { current: [i], comparing: [i], target },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Checking index ${i}: ${arr[i]}` },
    );

    if (arr[i] === target) {
      stats.found = true;
      stats.foundIndex = i;
      yield createSearchFrame(
        arr,
        { found: [i], target },
        { ...stats, executionTime: performance.now() - startTime },
        { message: `Found ${target} at index ${i}!` },
      );
      return;
    }
  }

  yield createSearchFrame(
    arr,
    { target },
    { ...stats, executionTime: performance.now() - startTime },
    { message: `${target} not found in array` },
  );
}
