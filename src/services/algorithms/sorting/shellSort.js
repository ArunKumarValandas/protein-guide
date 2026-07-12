import { createFrame, initStats, compare } from './base';

export function* shellSort(array) {
  const arr = [...array];
  const stats = initStats();
  const n = arr.length;
  const startTime = performance.now();

  yield createFrame(arr, {}, { ...stats, executionTime: 0 }, { message: 'Starting Shell Sort' });

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    yield createFrame(
      arr,
      { gap },
      { ...stats, executionTime: performance.now() - startTime },
      { message: `Gap size: ${gap}` },
    );

    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;

      while (j >= gap) {
        stats.steps++;
        yield createFrame(
          arr,
          { comparing: [j - gap, j], gap, current: [i] },
          { ...stats, executionTime: performance.now() - startTime },
          { message: `Comparing ${arr[j - gap]} and ${temp}` },
        );

        if (compare(stats, arr[j - gap], temp) > 0) {
          arr[j] = arr[j - gap];
          stats.swaps++;
          yield createFrame(
            arr,
            { shifting: [j - gap, j], gap },
            { ...stats, executionTime: performance.now() - startTime },
            { message: `Shifting element at gap interval` },
          );
          j -= gap;
        } else {
          break;
        }
      }

      arr[j] = temp;
      yield createFrame(
        arr,
        { current: [j], gap },
        { ...stats, executionTime: performance.now() - startTime },
        { message: `Inserted ${temp} at position ${j}` },
      );
    }
  }

  yield createFrame(
    arr,
    { sorted: arr.map((_, i) => i) },
    { ...stats, executionTime: performance.now() - startTime },
    { message: 'Sorting complete!' },
  );
}
