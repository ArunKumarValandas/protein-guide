import { createDsFrame, initStats } from '@/services/dataStructures/base';

function frame(visualData, highlights, stats, startTime, message) {
  return createDsFrame(
    visualData,
    highlights,
    { ...stats, executionTime: performance.now() - startTime },
    { message },
  );
}

export function* nQueens() {
  const stats = initStats();
  const startTime = performance.now();
  const n = 4;
  const board = Array.from({ length: n }, () => Array(n).fill(''));

  const safe = (row, col) => {
    for (let r = 0; r < row; r++) if (board[r][col] === 'Q') return false;
    for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) if (board[r][c] === 'Q') return false;
    for (let r = row - 1, c = col + 1; r >= 0 && c < n; r--, c++) if (board[r][c] === 'Q') return false;
    return true;
  };

  function* solve(row) {
    if (row === n) {
      yield frame({ type: 'board', board }, { solved: board.flatMap((line, r) => line.map((v, c) => (v === 'Q' ? `${r}-${c}` : null))).filter(Boolean) }, stats, startTime, 'Solution found');
      return true;
    }

    for (let col = 0; col < n; col++) {
      stats.steps++;
      stats.comparisons++;
      yield frame({ type: 'board', board }, { current: [`${row}-${col}`] }, stats, startTime, `Try row ${row}, col ${col}`);
      if (safe(row, col)) {
        board[row][col] = 'Q';
        stats.swaps++;
        yield frame({ type: 'board', board }, { placed: [`${row}-${col}`] }, stats, startTime, `Placed queen at ${row},${col}`);
        if (yield* solve(row + 1)) return true;
        board[row][col] = '';
        yield frame({ type: 'board', board }, { rejected: [`${row}-${col}`] }, stats, startTime, `Backtrack from ${row},${col}`);
      } else {
        yield frame({ type: 'board', board }, { rejected: [`${row}-${col}`] }, stats, startTime, `Rejected ${row},${col}`);
      }
    }
    return false;
  }

  yield frame({ type: 'board', board }, {}, stats, startTime, 'Start N-Queens');
  yield* solve(0);
}

export function* sudokuSolver() {
  const stats = initStats();
  const startTime = performance.now();
  const board = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, '', 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ];

  const valid = (row, col, value) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === value || board[i][col] === value) return false;
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) if (board[r][c] === value) return false;
    }
    return true;
  };

  const findEmpty = () => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) if (board[r][c] === '') return [r, c];
    }
    return null;
  };

  function* solve() {
    const cell = findEmpty();
    if (!cell) {
      yield frame({ type: 'board', board }, { solved: [] }, stats, startTime, 'Sudoku solved');
      return true;
    }
    const [row, col] = cell;
    for (let value = 1; value <= 9; value++) {
      stats.steps++;
      stats.comparisons++;
      yield frame({ type: 'board', board }, { current: [`${row}-${col}`] }, stats, startTime, `Try ${value} at ${row},${col}`);
      if (valid(row, col, value)) {
        board[row][col] = value;
        stats.swaps++;
        yield frame({ type: 'board', board }, { placed: [`${row}-${col}`] }, stats, startTime, `Placed ${value}`);
        if (yield* solve()) return true;
        board[row][col] = '';
        yield frame({ type: 'board', board }, { rejected: [`${row}-${col}`] }, stats, startTime, `Backtrack ${row},${col}`);
      }
    }
    return false;
  }

  yield frame({ type: 'board', board }, {}, stats, startTime, 'Start Sudoku solver');
  yield* solve();
}

export function* permutations() {
  const stats = initStats();
  const startTime = performance.now();
  const values = [1, 2, 3];
  const path = [];
  const used = new Set();
  const results = [];

  function* backtrack() {
    if (path.length === values.length) {
      results.push([...path]);
      yield frame({ type: 'sequence', values, path: [...path], results: results.map((item) => item.join('')) }, { solved: path.map(String) }, stats, startTime, `Output ${path.join('')}`);
      return;
    }

    for (const value of values) {
      stats.steps++;
      stats.comparisons++;
      yield frame({ type: 'sequence', values, path: [...path], results: results.map((item) => item.join('')) }, { current: [String(value)] }, stats, startTime, `Try ${value}`);
      if (!used.has(value)) {
        used.add(value);
        path.push(value);
        stats.swaps++;
        yield frame({ type: 'sequence', values, path: [...path], results: results.map((item) => item.join('')) }, { placed: [String(value)] }, stats, startTime, `Choose ${value}`);
        yield* backtrack();
        path.pop();
        used.delete(value);
        yield frame({ type: 'sequence', values, path: [...path], results: results.map((item) => item.join('')) }, { rejected: [String(value)] }, stats, startTime, `Unchoose ${value}`);
      }
    }
  }

  yield frame({ type: 'sequence', values, path, results }, {}, stats, startTime, 'Start permutations');
  yield* backtrack();
}

const BACKTRACKING_GENERATORS = {
  'n-queens': nQueens,
  sudoku: sudokuSolver,
  permutations,
};

export function runBacktrackingAlgorithm(algorithmId) {
  const generator = BACKTRACKING_GENERATORS[algorithmId];
  if (!generator) throw new Error(`Unknown backtracking algorithm: ${algorithmId}`);
  const frames = [];
  for (const item of generator()) frames.push(item);
  return frames;
}
