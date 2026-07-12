import { describe, expect, it } from 'vitest';
import { runStackOperation } from '@/services/dataStructures';

function lastVisualData(frames) {
  return frames[frames.length - 1].visualData;
}

describe('stack visualizations', () => {
  it('pushes onto the top of the stack', () => {
    const frames = runStackOperation('push', [10, 20], 30);
    const visualData = lastVisualData(frames);

    expect(visualData.items.map((item) => item.value)).toEqual([10, 20, 30]);
    expect(visualData.topId).toBe('stack-2');
  });

  it('pops from the top of the stack', () => {
    const frames = runStackOperation('pop', [10, 20, 30]);
    const visualData = lastVisualData(frames);

    expect(visualData.items.map((item) => item.value)).toEqual([10, 20]);
    expect(visualData.topId).toBe('stack-1');
  });

  it('peeks without mutating the stack', () => {
    const frames = runStackOperation('peek', [10, 20, 30]);
    const lastFrame = frames[frames.length - 1];

    expect(lastFrame.visualData.items.map((item) => item.value)).toEqual([10, 20, 30]);
    expect(lastFrame.highlights.found).toEqual(['stack-2']);
  });

  it('clears every stack item', () => {
    const frames = runStackOperation('clear', [10, 20, 30]);
    const visualData = lastVisualData(frames);

    expect(visualData.items).toEqual([]);
    expect(visualData.topId).toBeNull();
  });
});
