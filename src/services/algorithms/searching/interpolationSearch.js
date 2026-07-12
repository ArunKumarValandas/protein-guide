import { createSearchFrame, initSearchStats } from './base';

export function* interpolationSearch(array, target) {
  const arr = [...array];
  const stats = initSearchStats();
  const startTime = performance.now();
  let low = 0;
  let high = arr.length - 1;

  yield createSearchFrame(
    arr,
    { target, range: [low, high] },
    { ...stats, executionTime: 0 },
    { message: `Interpolation Search for ${target}` },
  );

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    stats.steps++;
    if (low === high) {
      stats.comparisons++;
      if (arr[low] === target) {
        stats.found = true;
        stats.foundIndex = low;
        yield createSearchFrame(
          arr,
          { found: [low], target },
          { ...stats, executionTime: performance.now() - startTime },
          { message: `Found at index ${low}!` },
        );
        return;
      }
      break;
    }

    const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
    stats.comparisons++;

    yield createSearchFrame(
      arr,
      { current: [pos], comparing: [pos], range: [low, high], low, high, target },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Estimated position ${pos}: value ${arr[pos]}` },
    );

    if (arr[pos] === target) {
      stats.found = true;
      stats.foundIndex = pos;
      yield createSearchFrame(
        arr,
        { found: [pos], target },
        { ...stats, executionTime: performance.now() - startTime },
        { message: `Found ${target} at index ${pos}!` },
      );
      return;
    }

    if (arr[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }

    yield createSearchFrame(
      arr,
      { range: [low, high], low, high, target },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Narrowing search range to [${low}, ${high}]` },
    );
  }

  yield createSearchFrame(
    arr,
    { target },
    { ...stats, executionTime: performance.now() - startTime },
    { message: `${target} not found` },
  );
}
