export function createFrame(array, highlights = {}, stats = {}, meta = {}) {
  return {
    array: [...array],
    highlights: { ...highlights },
    stats: { ...stats },
    meta: { ...meta },
  };
}

export function initStats() {
  return {
    comparisons: 0,
    swaps: 0,
    steps: 0,
    executionTime: 0,
  };
}

export function compare(stats, a, b) {
  stats.comparisons++;
  return a - b;
}

export function doSwap(array, stats, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
  stats.swaps++;
}
