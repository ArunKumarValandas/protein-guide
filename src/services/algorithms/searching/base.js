export function createSearchFrame(array, highlights = {}, stats = {}, meta = {}) {
  return {
    array: [...array],
    highlights: { ...highlights },
    stats: { ...stats },
    meta: { ...meta },
  };
}

export function initSearchStats() {
  return {
    comparisons: 0,
    swaps: 0,
    steps: 0,
    executionTime: 0,
    found: false,
    foundIndex: -1,
  };
}
