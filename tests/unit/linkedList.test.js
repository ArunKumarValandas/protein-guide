import { describe, expect, it } from 'vitest';
import { runLinkedListOperation } from '@/services/dataStructures';

function lastVisualData(frames) {
  return frames[frames.length - 1].visualData;
}

describe('linked list visualizations', () => {
  it('inserts a new node at the head', () => {
    const frames = runLinkedListOperation('singly', 'insert', [20, 30], 10);
    const visualData = lastVisualData(frames);

    expect(visualData.nodes.map((node) => node.value)).toEqual([10, 20, 30]);
    expect(visualData.headId).toBe('node-new');
    expect(frames.length).toBeGreaterThan(1);
  });

  it('deletes the first matching node', () => {
    const frames = runLinkedListOperation('singly', 'delete', [10, 20, 30], 20);
    const visualData = lastVisualData(frames);

    expect(visualData.nodes.map((node) => node.value)).toEqual([10, 30]);
  });

  it('marks a searched node as found', () => {
    const frames = runLinkedListOperation('doubly', 'search', [10, 20, 30], 30);
    const lastFrame = frames[frames.length - 1];

    expect(lastFrame.highlights.found).toEqual(['node-2']);
    expect(lastFrame.stats.comparisons).toBe(3);
  });

  it('keeps circular lists linked from tail to head', () => {
    const frames = runLinkedListOperation('circular', 'traverse', [10, 20, 30], null);
    const visualData = lastVisualData(frames);
    const tail = visualData.nodes.find((node) => node.id === visualData.tailId);

    expect(visualData.circular).toBe(true);
    expect(tail.next).toBe(visualData.headId);
  });
});
