import { createDsFrame, initStats } from '@/services/dataStructures/base';

const DEFAULT_GRAPH = {
  nodes: [
    { id: 'A', label: 'A', x: 110, y: 90 },
    { id: 'B', label: 'B', x: 280, y: 60 },
    { id: 'C', label: 'C', x: 280, y: 180 },
    { id: 'D', label: 'D', x: 460, y: 90 },
    { id: 'E', label: 'E', x: 460, y: 220 },
    { id: 'F', label: 'F', x: 620, y: 150 },
  ],
  edges: [
    { id: 'A-B', from: 'A', to: 'B', weight: 4 },
    { id: 'A-C', from: 'A', to: 'C', weight: 2 },
    { id: 'B-D', from: 'B', to: 'D', weight: 5 },
    { id: 'B-E', from: 'B', to: 'E', weight: 10 },
    { id: 'C-D', from: 'C', to: 'D', weight: 1 },
    { id: 'C-E', from: 'C', to: 'E', weight: 3 },
    { id: 'D-F', from: 'D', to: 'F', weight: 2 },
    { id: 'E-F', from: 'E', to: 'F', weight: 4 },
  ],
};

const DAG_GRAPH = {
  nodes: DEFAULT_GRAPH.nodes,
  edges: [
    { id: 'A-B', from: 'A', to: 'B', weight: 1 },
    { id: 'A-C', from: 'A', to: 'C', weight: 1 },
    { id: 'B-D', from: 'B', to: 'D', weight: 1 },
    { id: 'C-D', from: 'C', to: 'D', weight: 1 },
    { id: 'C-E', from: 'C', to: 'E', weight: 1 },
    { id: 'D-F', from: 'D', to: 'F', weight: 1 },
    { id: 'E-F', from: 'E', to: 'F', weight: 1 },
  ],
};

function cloneGraph(graph) {
  return {
    nodes: graph.nodes.map((node) => ({ ...node })),
    edges: graph.edges.map((edge) => ({ ...edge })),
    distances: {},
    order: [],
    queue: [],
    stack: [],
  };
}

function neighbors(graph, nodeId, directed = false) {
  return graph.edges
    .filter((edge) => edge.from === nodeId || (!directed && edge.to === nodeId))
    .map((edge) => ({
      node: edge.from === nodeId ? edge.to : edge.from,
      edge,
      weight: edge.weight,
    }));
}

function frame(graph, highlights, stats, startTime, message, extra = {}) {
  return createDsFrame(
    { ...cloneGraph(graph), ...extra },
    highlights,
    { ...stats, executionTime: performance.now() - startTime },
    { message },
  );
}

function pickMinDistance(distances, visited) {
  return Object.entries(distances)
    .filter(([node]) => !visited.has(node))
    .sort((a, b) => a[1] - b[1])[0]?.[0] || null;
}

export function* bfsGraph() {
  const graph = cloneGraph(DEFAULT_GRAPH);
  const stats = initStats();
  const startTime = performance.now();
  const visited = new Set(['A']);
  const queue = ['A'];
  const order = [];

  yield frame(graph, { current: ['A'], visited: ['A'] }, stats, startTime, 'Starting BFS from A', { queue: [...queue], order });

  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    stats.steps++;
    yield frame(graph, { current: [node], visited: [...visited] }, stats, startTime, `Dequeued ${node}`, { queue: [...queue], order: [...order] });

    for (const next of neighbors(graph, node)) {
      stats.comparisons++;
      yield frame(graph, { current: [node], inspecting: [next.node], activeEdges: [next.edge.id], visited: [...visited] }, stats, startTime, `Inspect edge ${node}-${next.node}`, { queue: [...queue], order: [...order] });
      if (!visited.has(next.node)) {
        visited.add(next.node);
        queue.push(next.node);
        stats.swaps++;
        yield frame(graph, { current: [next.node], activeEdges: [next.edge.id], visited: [...visited] }, stats, startTime, `Visited ${next.node} and enqueued it`, { queue: [...queue], order: [...order] });
      }
    }
  }

  yield frame(graph, { visited: [...visited] }, stats, startTime, `BFS order: ${order.join(' -> ')}`, { queue: [], order });
}

export function* dfsGraph() {
  const graph = cloneGraph(DEFAULT_GRAPH);
  const stats = initStats();
  const startTime = performance.now();
  const visited = new Set();
  const stack = ['A'];
  const order = [];

  yield frame(graph, { current: ['A'] }, stats, startTime, 'Starting DFS from A', { stack: [...stack], order });

  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);
    stats.steps++;
    yield frame(graph, { current: [node], visited: [...visited] }, stats, startTime, `Visited ${node}`, { stack: [...stack], order: [...order] });

    const nextNodes = neighbors(graph, node).reverse();
    for (const next of nextNodes) {
      stats.comparisons++;
      if (!visited.has(next.node)) {
        stack.push(next.node);
        yield frame(graph, { current: [node], inspecting: [next.node], activeEdges: [next.edge.id], visited: [...visited] }, stats, startTime, `Pushed ${next.node}`, { stack: [...stack], order: [...order] });
      }
    }
  }

  yield frame(graph, { visited: [...visited] }, stats, startTime, `DFS order: ${order.join(' -> ')}`, { stack: [], order });
}

export function* dijkstraGraph() {
  const graph = cloneGraph(DEFAULT_GRAPH);
  const stats = initStats();
  const startTime = performance.now();
  const distances = Object.fromEntries(graph.nodes.map((node) => [node.id, Infinity]));
  const visited = new Set();
  distances.A = 0;

  yield frame(graph, { current: ['A'] }, stats, startTime, 'Starting Dijkstra from A', { distances });

  while (visited.size < graph.nodes.length) {
    const node = pickMinDistance(distances, visited);
    if (!node) break;
    visited.add(node);
    stats.steps++;
    yield frame(graph, { current: [node], visited: [...visited] }, stats, startTime, `Process ${node} with distance ${distances[node]}`, { distances });

    for (const next of neighbors(graph, node)) {
      if (visited.has(next.node)) continue;
      stats.comparisons++;
      const candidate = distances[node] + next.weight;
      yield frame(graph, { current: [node], inspecting: [next.node], activeEdges: [next.edge.id], visited: [...visited] }, stats, startTime, `Relax ${node}-${next.node}: ${candidate}`, { distances });
      if (candidate < distances[next.node]) {
        distances[next.node] = candidate;
        stats.swaps++;
        yield frame(graph, { current: [next.node], activeEdges: [next.edge.id], visited: [...visited] }, stats, startTime, `Updated ${next.node} distance to ${candidate}`, { distances });
      }
    }
  }

  yield frame(graph, { visited: [...visited] }, stats, startTime, 'Shortest distances finalized', { distances });
}

export function* bellmanFordGraph() {
  const graph = cloneGraph(DEFAULT_GRAPH);
  const stats = initStats();
  const startTime = performance.now();
  const distances = Object.fromEntries(graph.nodes.map((node) => [node.id, Infinity]));
  distances.A = 0;

  yield frame(graph, { current: ['A'] }, stats, startTime, 'Starting Bellman-Ford from A', { distances });

  for (let pass = 1; pass < graph.nodes.length; pass++) {
    for (const edge of graph.edges) {
      stats.steps++;
      stats.comparisons++;
      yield frame(graph, { activeEdges: [edge.id], current: [edge.from], inspecting: [edge.to] }, stats, startTime, `Pass ${pass}: relax ${edge.from}-${edge.to}`, { distances });
      if (distances[edge.from] + edge.weight < distances[edge.to]) {
        distances[edge.to] = distances[edge.from] + edge.weight;
        stats.swaps++;
        yield frame(graph, { activeEdges: [edge.id], current: [edge.to] }, stats, startTime, `Updated ${edge.to} to ${distances[edge.to]}`, { distances });
      }
    }
  }

  yield frame(graph, {}, stats, startTime, 'No negative cycle detected; distances finalized', { distances });
}

export function* primGraph() {
  const graph = cloneGraph(DEFAULT_GRAPH);
  const stats = initStats();
  const startTime = performance.now();
  const visited = new Set(['A']);
  const mstEdges = [];

  yield frame(graph, { visited: ['A'] }, stats, startTime, 'Starting Prim from A');

  while (visited.size < graph.nodes.length) {
    const candidate = graph.edges
      .filter((edge) => (visited.has(edge.from) && !visited.has(edge.to)) || (visited.has(edge.to) && !visited.has(edge.from)))
      .sort((a, b) => a.weight - b.weight)[0];
    if (!candidate) break;
    stats.steps++;
    stats.comparisons++;
    const nextNode = visited.has(candidate.from) ? candidate.to : candidate.from;
    yield frame(graph, { activeEdges: [candidate.id], inspecting: [nextNode], visited: [...visited], mstEdges }, stats, startTime, `Pick cheapest edge ${candidate.id}`);
    visited.add(nextNode);
    mstEdges.push(candidate.id);
    stats.swaps++;
    yield frame(graph, { current: [nextNode], visited: [...visited], mstEdges: [...mstEdges] }, stats, startTime, `Added ${nextNode} to MST`);
  }

  yield frame(graph, { visited: [...visited], mstEdges }, stats, startTime, `MST complete with ${mstEdges.length} edges`);
}

class UnionFind {
  constructor(nodes) {
    this.parent = Object.fromEntries(nodes.map((node) => [node.id, node.id]));
  }

  find(node) {
    if (this.parent[node] !== node) this.parent[node] = this.find(this.parent[node]);
    return this.parent[node];
  }

  union(a, b) {
    const rootA = this.find(a);
    const rootB = this.find(b);
    if (rootA === rootB) return false;
    this.parent[rootB] = rootA;
    return true;
  }
}

export function* kruskalGraph() {
  const graph = cloneGraph(DEFAULT_GRAPH);
  const stats = initStats();
  const startTime = performance.now();
  const uf = new UnionFind(graph.nodes);
  const mstEdges = [];

  yield frame(graph, {}, stats, startTime, 'Sorting edges by weight');

  for (const edge of [...graph.edges].sort((a, b) => a.weight - b.weight)) {
    stats.steps++;
    stats.comparisons++;
    yield frame(graph, { activeEdges: [edge.id], current: [edge.from], inspecting: [edge.to], mstEdges }, stats, startTime, `Check ${edge.id}`);
    if (uf.union(edge.from, edge.to)) {
      mstEdges.push(edge.id);
      stats.swaps++;
      yield frame(graph, { mstEdges: [...mstEdges], activeEdges: [edge.id] }, stats, startTime, `Accepted ${edge.id}`);
    } else {
      yield frame(graph, { rejectedEdges: [edge.id], mstEdges: [...mstEdges] }, stats, startTime, `Rejected ${edge.id}; it forms a cycle`);
    }
  }

  yield frame(graph, { mstEdges }, stats, startTime, `Kruskal MST complete with ${mstEdges.length} edges`);
}

export function* topologicalSortGraph() {
  const graph = cloneGraph(DAG_GRAPH);
  const stats = initStats();
  const startTime = performance.now();
  const inDegree = Object.fromEntries(graph.nodes.map((node) => [node.id, 0]));
  graph.edges.forEach((edge) => {
    inDegree[edge.to]++;
  });
  const queue = Object.keys(inDegree).filter((node) => inDegree[node] === 0);
  const order = [];

  yield frame(graph, { current: [...queue] }, stats, startTime, 'Starting Kahn topological sort', { queue: [...queue], order, inDegree });

  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    stats.steps++;
    yield frame(graph, { current: [node], visited: [...order] }, stats, startTime, `Output ${node}`, { queue: [...queue], order: [...order], inDegree });

    for (const edge of graph.edges.filter((item) => item.from === node)) {
      stats.comparisons++;
      inDegree[edge.to]--;
      yield frame(graph, { activeEdges: [edge.id], current: [node], inspecting: [edge.to], visited: [...order] }, stats, startTime, `Decrease in-degree of ${edge.to}`, { queue: [...queue], order: [...order], inDegree: { ...inDegree } });
      if (inDegree[edge.to] === 0) queue.push(edge.to);
    }
  }

  yield frame(graph, { visited: [...order] }, stats, startTime, `Topological order: ${order.join(' -> ')}`, { queue: [], order, inDegree });
}

const GRAPH_GENERATORS = {
  bfs: bfsGraph,
  dfs: dfsGraph,
  dijkstra: dijkstraGraph,
  'bellman-ford': bellmanFordGraph,
  prim: primGraph,
  kruskal: kruskalGraph,
  'topological-sort': topologicalSortGraph,
};

export function runGraphAlgorithm(algorithmId) {
  const generator = GRAPH_GENERATORS[algorithmId];
  if (!generator) throw new Error(`Unknown graph algorithm: ${algorithmId}`);
  const frames = [];
  for (const item of generator()) frames.push(item);
  return frames;
}
