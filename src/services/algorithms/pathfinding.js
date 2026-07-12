import { createDsFrame, initStats } from '@/services/dataStructures/base';

const ROWS = 10;
const COLS = 14;
const START = '0-0';
const END = '9-13';
const WALLS = new Set([
  '0-4', '1-4', '2-4', '3-4', '4-4',
  '2-1', '2-2', '2-3',
  '4-6', '5-6', '6-6', '7-6',
  '6-8', '6-9', '6-10', '6-11',
  '1-9', '2-9', '3-9',
  '8-2', '8-3', '8-4', '8-5',
]);

function key(row, col) {
  return `${row}-${col}`;
}

function parseKey(cellKey) {
  const [row, col] = cellKey.split('-').map(Number);
  return { row, col };
}

function heuristic(cellKey) {
  const cell = parseKey(cellKey);
  const end = parseKey(END);
  return Math.abs(cell.row - end.row) + Math.abs(cell.col - end.col);
}

function buildGrid(extra = {}) {
  return {
    rows: ROWS,
    cols: COLS,
    start: START,
    end: END,
    walls: [...WALLS],
    ...extra,
  };
}

function neighbors(cellKey) {
  const { row, col } = parseKey(cellKey);
  return [
    [row - 1, col],
    [row, col + 1],
    [row + 1, col],
    [row, col - 1],
  ]
    .filter(([r, c]) => r >= 0 && r < ROWS && c >= 0 && c < COLS)
    .map(([r, c]) => key(r, c))
    .filter((item) => !WALLS.has(item));
}

function reconstruct(parent, endKey) {
  const path = [];
  let current = endKey;
  while (current) {
    path.unshift(current);
    current = parent[current];
  }
  return path[0] === START ? path : [];
}

function frame(highlights, stats, startTime, message, extra = {}) {
  return createDsFrame(
    buildGrid(extra),
    highlights,
    { ...stats, executionTime: performance.now() - startTime },
    { message },
  );
}

function finalPathFrame(parent, visited, stats, startTime) {
  const path = reconstruct(parent, END);
  return frame(
    { visited: [...visited], path, current: [END] },
    stats,
    startTime,
    path.length ? `Path found with ${path.length} cells` : 'No path found',
    { path },
  );
}

export function* gridBfs() {
  const stats = initStats();
  const startTime = performance.now();
  const queue = [START];
  const visited = new Set([START]);
  const parent = {};

  yield frame({ current: [START], visited: [START] }, stats, startTime, 'Starting BFS', { frontier: [...queue] });

  while (queue.length > 0) {
    const cell = queue.shift();
    stats.steps++;
    yield frame({ current: [cell], visited: [...visited] }, stats, startTime, `Dequeued ${cell}`, { frontier: [...queue] });
    if (cell === END) break;

    for (const next of neighbors(cell)) {
      stats.comparisons++;
      if (!visited.has(next)) {
        visited.add(next);
        parent[next] = cell;
        queue.push(next);
        stats.swaps++;
        yield frame({ current: [next], visited: [...visited], frontier: [...queue] }, stats, startTime, `Queued ${next}`, { frontier: [...queue] });
      }
    }
  }

  yield finalPathFrame(parent, visited, stats, startTime);
}

export function* gridDfs() {
  const stats = initStats();
  const startTime = performance.now();
  const stack = [START];
  const visited = new Set();
  const parent = {};

  yield frame({ current: [START] }, stats, startTime, 'Starting DFS', { frontier: [...stack] });

  while (stack.length > 0) {
    const cell = stack.pop();
    if (visited.has(cell)) continue;
    visited.add(cell);
    stats.steps++;
    yield frame({ current: [cell], visited: [...visited] }, stats, startTime, `Visited ${cell}`, { frontier: [...stack] });
    if (cell === END) break;

    for (const next of neighbors(cell).reverse()) {
      stats.comparisons++;
      if (!visited.has(next)) {
        parent[next] = cell;
        stack.push(next);
      }
    }
  }

  yield finalPathFrame(parent, visited, stats, startTime);
}

function pickLowest(open, scores) {
  return [...open].sort((a, b) => scores[a] - scores[b])[0];
}

export function* gridDijkstra() {
  const stats = initStats();
  const startTime = performance.now();
  const open = new Set([START]);
  const visited = new Set();
  const parent = {};
  const dist = { [START]: 0 };

  yield frame({ current: [START] }, stats, startTime, 'Starting Dijkstra', { distances: { ...dist }, frontier: [...open] });

  while (open.size > 0) {
    const cell = pickLowest(open, dist);
    open.delete(cell);
    if (visited.has(cell)) continue;
    visited.add(cell);
    stats.steps++;
    yield frame({ current: [cell], visited: [...visited] }, stats, startTime, `Processing ${cell}`, { distances: { ...dist }, frontier: [...open] });
    if (cell === END) break;

    for (const next of neighbors(cell)) {
      stats.comparisons++;
      const candidate = dist[cell] + 1;
      if (candidate < (dist[next] ?? Infinity)) {
        dist[next] = candidate;
        parent[next] = cell;
        open.add(next);
        stats.swaps++;
        yield frame({ current: [next], visited: [...visited], frontier: [...open] }, stats, startTime, `Relaxed ${next} to ${candidate}`, { distances: { ...dist }, frontier: [...open] });
      }
    }
  }

  yield finalPathFrame(parent, visited, stats, startTime);
}

export function* gridAStar() {
  const stats = initStats();
  const startTime = performance.now();
  const open = new Set([START]);
  const visited = new Set();
  const parent = {};
  const gScore = { [START]: 0 };
  const fScore = { [START]: heuristic(START) };

  yield frame({ current: [START] }, stats, startTime, 'Starting A* search', { scores: { ...fScore }, frontier: [...open] });

  while (open.size > 0) {
    const cell = pickLowest(open, fScore);
    open.delete(cell);
    visited.add(cell);
    stats.steps++;
    yield frame({ current: [cell], visited: [...visited] }, stats, startTime, `Processing ${cell}`, { scores: { ...fScore }, frontier: [...open] });
    if (cell === END) break;

    for (const next of neighbors(cell)) {
      stats.comparisons++;
      const tentative = gScore[cell] + 1;
      if (tentative < (gScore[next] ?? Infinity)) {
        parent[next] = cell;
        gScore[next] = tentative;
        fScore[next] = tentative + heuristic(next);
        open.add(next);
        stats.swaps++;
        yield frame({ current: [next], visited: [...visited], frontier: [...open] }, stats, startTime, `Updated ${next}: f=${fScore[next]}`, { scores: { ...fScore }, frontier: [...open] });
      }
    }
  }

  yield finalPathFrame(parent, visited, stats, startTime);
}

const PATHFINDING_GENERATORS = {
  'path-bfs': gridBfs,
  'path-dfs': gridDfs,
  'path-dijkstra': gridDijkstra,
  'path-a-star': gridAStar,
};

export function runPathfindingAlgorithm(algorithmId) {
  const generator = PATHFINDING_GENERATORS[algorithmId];
  if (!generator) throw new Error(`Unknown pathfinding algorithm: ${algorithmId}`);
  const frames = [];
  for (const item of generator()) frames.push(item);
  return frames;
}
