import { createSearchFrame, initSearchStats } from './base';

export function* jumpSearch(array, target) {
  const arr = [...array];
  const stats = initSearchStats();
  const startTime = performance.now();
  const n = arr.length;
  const jumpStep = Math.floor(Math.sqrt(n));
  let prev = 0;
  let nextJump = jumpStep;

  yield createSearchFrame(
    arr,
    { target, step: jumpStep },
    { ...stats, executionTime: 0 },
    { message: `Jump Search with step size ${jumpStep}` },
  );

  while (nextJump < n && arr[nextJump] < target) {
    stats.steps++;
    stats.comparisons++;

    yield createSearchFrame(
      arr,
      { current: [nextJump], comparing: [nextJump], step: jumpStep, prev, target },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Jump to index ${nextJump}: ${arr[nextJump]} < ${target}` },
    );

    prev = nextJump;
    nextJump += jumpStep;
    if (prev >= n) break;
  }

  const blockEnd = Math.min(prev + jumpStep, n);
  for (let i = prev; i < blockEnd; i++) {
    stats.steps++;
    stats.comparisons++;
    yield createSearchFrame(
      arr,
      { current: [i], comparing: [i], range: [prev, blockEnd - 1], target },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Linear search in block: index ${i}` },
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
    { message: `${target} not found` },
  );
}
