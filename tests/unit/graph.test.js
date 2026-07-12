import { describe, expect, it } from 'vitest';
import { runGraphAlgorithm } from '@/services/algorithms/graph';

function lastFrame(frames) {
  return frames[frames.length - 1];
}

describe('graph visualizations', () => {
  it('generates BFS order from A', () => {
    const final = lastFrame(runGraphAlgorithm('bfs'));

    expect(final.visualData.order[0]).toBe('A');
    expect(final.visualData.order).toContain('F');
  });

  it('computes Dijkstra distances', () => {
    const final = lastFrame(runGraphAlgorithm('dijkstra'));

    expect(final.visualData.distances.A).toBe(0);
    expect(final.visualData.distances.F).toBe(5);
  });

  it('builds a Prim MST with n - 1 edges', () => {
    const final = lastFrame(runGraphAlgorithm('prim'));

    expect(final.highlights.mstEdges).toHaveLength(final.visualData.nodes.length - 1);
  });

  it('produces a valid topological order for the DAG', () => {
    const final = lastFrame(runGraphAlgorithm('topological-sort'));

    expect(final.visualData.order[0]).toBe('A');
    expect(final.visualData.order.at(-1)).toBe('F');
  });
});
