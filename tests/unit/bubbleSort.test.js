import { describe, it, expect } from 'vitest';
import { runSortingAlgorithm } from '@/services/algorithms/sorting';
import { isSorted } from '@/utils/array';

describe('bubble sort', () => {
  it('sorts array correctly', () => {
    const input = [64, 34, 25, 12, 22, 11, 90];
    const frames = runSortingAlgorithm('bubble-sort', input);
    const lastFrame = frames[frames.length - 1];
    expect(isSorted(lastFrame.array)).toBe(true);
    expect(lastFrame.array).toEqual([11, 12, 22, 25, 34, 64, 90]);
  });

  it('generates multiple frames', () => {
    const frames = runSortingAlgorithm('bubble-sort', [5, 3, 1]);
    expect(frames.length).toBeGreaterThan(1);
  });
});
