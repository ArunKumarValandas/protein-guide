import { runSortingAlgorithm } from '@/services/algorithms/sorting';

export function extractAlgorithmStats(frames) {
  const lastFrame = frames[frames.length - 1];
  const stats = lastFrame?.stats ?? {};
  return {
    comparisons: stats.comparisons ?? 0,
    swaps: stats.swaps ?? 0,
    steps: stats.steps ?? 0,
    executionTime: stats.executionTime ?? 0,
  };
}

export function runAlgorithmBenchmark(algorithmId, array) {
  const start = performance.now();
  const frames = runSortingAlgorithm(algorithmId, array);
  const stats = extractAlgorithmStats(frames);
  return {
    ...stats,
    executionTime: stats.executionTime || performance.now() - start,
    frames,
  };
}

export function rankBenchmarkResults(results) {
  return [...results]
    .sort((a, b) => {
      if (a.executionTime !== b.executionTime) return a.executionTime - b.executionTime;
      if (a.comparisons !== b.comparisons) return a.comparisons - b.comparisons;
      return a.swaps - b.swaps;
    })
    .map((result, index) => ({ ...result, rank: index + 1 }));
}

export function determineComparisonWinner(resultA, resultB) {
  if (resultA.executionTime < resultB.executionTime) return 'a';
  if (resultB.executionTime < resultA.executionTime) return 'b';
  if (resultA.comparisons < resultB.comparisons) return 'a';
  if (resultB.comparisons < resultA.comparisons) return 'b';
  if (resultA.swaps < resultB.swaps) return 'a';
  if (resultB.swaps < resultA.swaps) return 'b';
  return 'tie';
}
