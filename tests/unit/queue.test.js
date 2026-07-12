import { describe, expect, it } from 'vitest';
import { runQueueOperation } from '@/services/dataStructures';

function lastVisualData(frames) {
  return frames[frames.length - 1].visualData;
}

describe('queue visualizations', () => {
  it('enqueues at the rear of a normal queue', () => {
    const frames = runQueueOperation('queue', 'enqueue', [10, 20], 30);
    const visualData = lastVisualData(frames);

    expect(visualData.items.map((item) => item.value)).toEqual([10, 20, 30]);
    expect(visualData.rearId).toBe('queue-2');
  });

  it('dequeues from the front of a normal queue', () => {
    const frames = runQueueOperation('queue', 'dequeue', [10, 20, 30], null);
    const visualData = lastVisualData(frames);

    expect(visualData.items.map((item) => item.value)).toEqual([20, 30]);
    expect(visualData.frontId).toBe('queue-0');
  });

  it('keeps priority queue ordered by numeric priority', () => {
    const frames = runQueueOperation('priority-queue', 'enqueue', [40, 20], 10);
    const visualData = lastVisualData(frames);

    expect(visualData.items.map((item) => item.value)).toEqual([10, 20, 40]);
    expect(visualData.priority).toBe(true);
  });

  it('renders circular queue capacity slots', () => {
    const frames = runQueueOperation('circular-queue', 'enqueue', [10, 20], 30);
    const visualData = lastVisualData(frames);

    expect(visualData.circular).toBe(true);
    expect(visualData.capacity).toBe(8);
    expect(visualData.items[2].slot).toBe(2);
  });
});
