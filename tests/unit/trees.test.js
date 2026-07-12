import { describe, expect, it } from 'vitest';
import { runTreeAlgorithm } from '@/services/algorithms/trees';

function lastFrame(frames) {
  return frames[frames.length - 1];
}

describe('tree visualizations', () => {
  it('inserts a value into a BST', () => {
    const frames = runTreeAlgorithm('bst-insert', [40, 20, 60, 10, 30], 25);
    const final = lastFrame(frames);

    expect(final.visualData.nodes.some((node) => node.value === 25)).toBe(true);
    expect(final.highlights.inserted).toEqual(['tree-25']);
  });

  it('searches a BST using ordered branches', () => {
    const frames = runTreeAlgorithm('bst-search', [40, 20, 60, 10, 30], 30);
    const final = lastFrame(frames);

    expect(final.highlights.found).toEqual(['tree-30']);
    expect(final.stats.comparisons).toBe(3);
  });

  it('produces sorted order for inorder traversal of a BST', () => {
    const frames = runTreeAlgorithm('inorder-traversal', [40, 20, 60, 10, 30], null);
    const final = lastFrame(frames);

    expect(final.visualData.traversal).toEqual([10, 20, 30, 40, 60]);
  });

  it('produces root-first order for preorder traversal', () => {
    const frames = runTreeAlgorithm('preorder-traversal', [40, 20, 60, 10, 30], null);
    const final = lastFrame(frames);

    expect(final.visualData.traversal[0]).toBe(40);
  });
});
