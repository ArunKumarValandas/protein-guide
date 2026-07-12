import { createFrame, initStats } from './base';

export function* countingSort(array) {
  const arr = [...array];
  const stats = initStats();
  const startTime = performance.now();
  const n = arr.length;
  const maxVal = Math.max(...arr, 0);
  const minVal = Math.min(...arr, 0);
  const range = maxVal - minVal + 1;

  yield createFrame(arr, {}, { ...stats, executionTime: 0 }, { message: 'Starting Counting Sort' });

  const count = new Array(range).fill(0);

  for (let i = 0; i < n; i++) {
    stats.steps++;
    const idx = arr[i] - minVal;
    count[idx]++;
    yield createFrame(
      arr,
      { current: [i], counting: true },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Counting ${arr[i]}: count[${arr[i]}] = ${count[idx]}` },
    );
  }

  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
    stats.steps++;
  }

  yield createFrame(
    arr,
    { counting: true },
    { ...stats, executionTime: performance.now() - startTime },
    { message: 'Computed cumulative counts' },
  );

  const output = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    stats.steps++;
    const idx = arr[i] - minVal;
    output[count[idx] - 1] = arr[i];
    count[idx]--;
    stats.swaps++;

    for (let j = 0; j < n; j++) arr[j] = output[j] || arr[j];

    yield createFrame(
      arr,
      { placing: [count[idx]], current: [i] },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Placed ${arr[i]} in output` },
    );
  }

  for (let i = 0; i < n; i++) arr[i] = output[i];

  yield createFrame(
    arr,
    { sorted: arr.map((_, i) => i) },
    { ...stats, executionTime: performance.now() - startTime },
    { message: 'Sorting complete!' },
  );
}
