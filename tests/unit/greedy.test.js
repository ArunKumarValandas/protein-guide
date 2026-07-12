import { describe, expect, it } from 'vitest';
import { runGreedyAlgorithm } from '@/services/algorithms/greedy';

function lastFrame(frames) {
  return frames[frames.length - 1];
}

describe('greedy visualizations', () => {
  it('selects compatible activities', () => {
    const final = lastFrame(runGreedyAlgorithm('activity-selection'));

    expect(final.visualData.selected).toEqual(['A', 'C', 'E']);
  });

  it('computes fractional knapsack value', () => {
    const final = lastFrame(runGreedyAlgorithm('fractional-knapsack'));

    expect(final.visualData.total).toBe(240);
  });

  it('builds Huffman root frequency', () => {
    const final = lastFrame(runGreedyAlgorithm('huffman'));

    expect(final.visualData.total).toBe(100);
  });
});
