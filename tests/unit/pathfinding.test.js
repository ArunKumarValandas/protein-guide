import { describe, expect, it } from 'vitest';
import { runPathfindingAlgorithm } from '@/services/algorithms/pathfinding';

function lastFrame(frames) {
  return frames[frames.length - 1];
}

describe('pathfinding visualizations', () => {
  it('finds a BFS path from start to goal', () => {
    const final = lastFrame(runPathfindingAlgorithm('path-bfs'));

    expect(final.visualData.path[0]).toBe('0-0');
    expect(final.visualData.path.at(-1)).toBe('9-13');
  });

  it('finds a DFS path from start to goal', () => {
    const final = lastFrame(runPathfindingAlgorithm('path-dfs'));

    expect(final.visualData.path[0]).toBe('0-0');
    expect(final.visualData.path.at(-1)).toBe('9-13');
  });

  it('finds a Dijkstra path', () => {
    const final = lastFrame(runPathfindingAlgorithm('path-dijkstra'));

    expect(final.visualData.path.length).toBeGreaterThan(0);
    expect(final.highlights.path).toContain('9-13');
  });

  it('finds an A* path', () => {
    const final = lastFrame(runPathfindingAlgorithm('path-a-star'));

    expect(final.visualData.path.length).toBeGreaterThan(0);
    expect(final.highlights.path).toContain('0-0');
  });
});
