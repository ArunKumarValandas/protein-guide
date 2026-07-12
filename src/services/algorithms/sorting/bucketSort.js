import { createFrame, initStats } from './base';

function insertionSortBucket(bucket, stats) {
  for (let i = 1; i < bucket.length; i++) {
    const key = bucket[i];
    let j = i - 1;
    while (j >= 0 && bucket[j] > key) {
      bucket[j + 1] = bucket[j];
      stats.swaps++;
      stats.comparisons++;
      j--;
    }
    bucket[j + 1] = key;
    stats.steps++;
  }
}

export function* bucketSort(array) {
  const arr = [...array];
  const stats = initStats();
  const startTime = performance.now();
  const n = arr.length;

  if (n === 0) {
    yield createFrame(arr, { sorted: [] }, { ...stats, executionTime: 0 }, { message: 'Empty array' });
    return;
  }

  const maxVal = Math.max(...arr);
  const minVal = Math.min(...arr);
  const range = maxVal - minVal || 1;

  yield createFrame(arr, {}, { ...stats, executionTime: 0 }, { message: 'Starting Bucket Sort' });

  const bucketCount = Math.min(n, 10);
  const buckets = Array.from({ length: bucketCount }, () => []);

  for (let i = 0; i < n; i++) {
    stats.steps++;
    const bucketIndex = Math.min(
      bucketCount - 1,
      Math.floor(((arr[i] - minVal) / range) * (bucketCount - 1)),
    );
    buckets[bucketIndex].push(arr[i]);

    yield createFrame(
      arr,
      { current: [i], bucket: bucketIndex },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Placed ${arr[i]} in bucket ${bucketIndex}` },
    );
  }

  for (let b = 0; b < bucketCount; b++) {
    if (buckets[b].length > 1) {
      insertionSortBucket(buckets[b], stats);
      yield createFrame(
        arr,
        { bucket: b },
        { ...stats, executionTime: performance.now() - startTime },
        { message: `Sorted bucket ${b}` },
      );
    }
  }

  let idx = 0;
  for (let b = 0; b < bucketCount; b++) {
    for (const val of buckets[b]) {
      arr[idx] = val;
      yield createFrame(
        arr,
        { current: [idx], bucket: b },
        { ...stats, executionTime: performance.now() - startTime },
        { message: `Collected ${val} from bucket ${b}` },
      );
      idx++;
    }
  }

  yield createFrame(
    arr,
    { sorted: arr.map((_, i) => i) },
    { ...stats, executionTime: performance.now() - startTime },
    { message: 'Sorting complete!' },
  );
}
