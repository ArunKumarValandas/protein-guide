import { describe, expect, it } from 'vitest';
import { runBacktrackingAlgorithm } from '@/services/algorithms/backtracking';

function lastFrame(frames) {
  return frames[frames.length - 1];
}

describe('backtracking visualizations', () => {
  it('finds a 4-queens solution', () => {
    const final = lastFrame(runBacktrackingAlgorithm('n-queens'));
    const queens = final.visualData.board.flat().filter((cell) => cell === 'Q');

    expect(queens).toHaveLength(4);
  });

  it('solves the sample sudoku cell', () => {
    const final = lastFrame(runBacktrackingAlgorithm('sudoku'));

    expect(final.visualData.board[4][4]).toBe(5);
  });

  it('generates all permutations for three values', () => {
    const final = lastFrame(runBacktrackingAlgorithm('permutations'));

    expect(final.visualData.results).toHaveLength(6);
  });
});
