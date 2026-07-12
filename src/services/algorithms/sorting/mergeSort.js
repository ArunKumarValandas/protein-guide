import { createFrame, initStats } from './base';

function* merge(arr, stats, startTime, left, mid, right) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  let i = 0,
    j = 0,
    k = left;

  yield createFrame(
    arr,
    { merging: Array.from({ length: right - left + 1 }, (_, idx) => left + idx) },
    { ...stats, executionTime: performance.now() - startTime },
    { message: `Merging subarrays [${left}-${mid}] and [${mid + 1}-${right}]` },
  );

  while (i < leftArr.length && j < rightArr.length) {
    stats.steps++;
    stats.comparisons++;
    yield createFrame(
      arr,
      { comparing: [k], merging: Array.from({ length: right - left + 1 }, (_, idx) => left + idx) },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Comparing ${leftArr[i]} and ${rightArr[j]}` },
    );

    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i++];
    } else {
      arr[k] = rightArr[j++];
      stats.swaps++;
    }
    k++;
    yield createFrame(
      arr,
      { current: [k - 1], merging: Array.from({ length: right - left + 1 }, (_, idx) => left + idx) },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Placed ${arr[k - 1]} at index ${k - 1}` },
    );
  }

  while (i < leftArr.length) {
    arr[k++] = leftArr[i++];
    stats.swaps++;
  }
  while (j < rightArr.length) {
    arr[k++] = rightArr[j++];
    stats.swaps++;
  }
}

function* mergeSortHelper(arr, stats, startTime, left, right) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);

    yield createFrame(
      arr,
      { dividing: [left, mid, right] },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Dividing [${left}-${right}] at mid ${mid}` },
    );

    yield* mergeSortHelper(arr, stats, startTime, left, mid);
    yield* mergeSortHelper(arr, stats, startTime, mid + 1, right);
    yield* merge(arr, stats, startTime, left, mid, right);
  }
}

export function* mergeSort(array) {
  const arr = [...array];
  const stats = initStats();
  const startTime = performance.now();

  yield createFrame(arr, {}, { ...stats, executionTime: 0 }, { message: 'Starting Merge Sort' });
  yield* mergeSortHelper(arr, stats, startTime, 0, arr.length - 1);
  yield createFrame(
    arr,
    { sorted: arr.map((_, i) => i) },
    { ...stats, executionTime: performance.now() - startTime },
    { message: 'Sorting complete!' },
  );
}
