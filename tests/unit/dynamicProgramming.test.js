import { describe, expect, it } from 'vitest';
import { runDpAlgorithm } from '@/services/algorithms/dynamicProgramming';

function lastFrame(frames) {
  return frames[frames.length - 1];
}

describe('dynamic programming visualizations', () => {
  it('computes fibonacci result', () => {
    const final = lastFrame(runDpAlgorithm('fibonacci'));

    expect(final.visualData.result).toBe(21);
  });

  it('computes knapsack best value', () => {
    const final = lastFrame(runDpAlgorithm('knapsack'));

    expect(final.visualData.result).toBe(9);
  });

  it('computes LCS length', () => {
    const final = lastFrame(runDpAlgorithm('lcs'));

    expect(final.visualData.result).toBe(4);
  });
});
