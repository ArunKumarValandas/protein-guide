import { createFrame, initStats } from './base';

function countingSortByDigit(arr, stats, startTime, exp) {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);

  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
    stats.steps++;
  }

  for (let i = 1; i < 10; i++) count[i] += count[i - 1];

  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
    stats.swaps++;
  }

  for (let i = 0; i < n; i++) arr[i] = output[i];
}

export function* radixSort(array) {
  const arr = [...array];
  const stats = initStats();
  const startTime = performance.now();
  const maxVal = Math.max(...arr);

  yield createFrame(arr, {}, { ...stats, executionTime: 0 }, { message: 'Starting Radix Sort' });

  for (let exp = 1; Math.floor(maxVal / exp) > 0; exp *= 10) {
    const digitName = exp === 1 ? 'ones' : exp === 10 ? 'tens' : exp === 100 ? 'hundreds' : `${exp}'s place`;

    yield createFrame(
      arr,
      { radix: exp },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Sorting by ${digitName} digit` },
    );

    countingSortByDigit(arr, stats, startTime, exp);

    yield createFrame(
      arr,
      { radix: exp },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Completed ${digitName} digit pass` },
    );
  }

  yield createFrame(
    arr,
    { sorted: arr.map((_, i) => i) },
    { ...stats, executionTime: performance.now() - startTime },
    { message: 'Sorting complete!' },
  );
}
