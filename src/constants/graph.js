export const GRAPH_ALGORITHMS = {
  bfs: {
    id: 'bfs',
    name: 'Breadth-First Search',
    category: 'graph',
    timeComplexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
    spaceComplexity: 'O(V)',
    description:
      'Explores a graph level by level using a queue, visiting all neighbors before moving deeper.',
    working:
      'Enqueue start node, dequeue front, mark visited, enqueue unvisited neighbors, repeat until queue empty.',
    dryRun: 'Graph A-B-C, start A: Visit A, enqueue B,C. Visit B, enqueue neighbors. Visit C. Done.',
    advantages: ['Finds shortest path in unweighted graphs', 'Complete and optimal for unweighted', 'Simple implementation'],
    disadvantages: ['Uses O(V) extra space for queue', 'Not suitable for deep graphs without limits'],
    applications: ['Social network friend suggestions', 'Web crawlers', 'GPS shortest routes (unweighted)'],
    pseudocode: `function BFS(graph, start):
  queue = [start], visited = {start}
  while queue not empty:
    node = queue.dequeue()
    for neighbor in graph[node]:
      if neighbor not in visited:
        visited.add(neighbor)
        queue.enqueue(neighbor)`,
  },
  dfs: {
    id: 'dfs',
    name: 'Depth-First Search',
    category: 'graph',
    timeComplexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
    spaceComplexity: 'O(V)',
    description: 'Explores as far as possible along each branch before backtracking.',
    working: 'Push start onto stack, pop top, mark visited, push unvisited neighbors, repeat.',
    dryRun: 'Graph A-B-D, A-C: Visit A, go to B, go to D, backtrack to C.',
    advantages: ['Uses less memory than BFS in some cases', 'Good for topological sort', 'Detects cycles'],
    disadvantages: ['May not find shortest path', 'Can get stuck in deep paths'],
    applications: ['Maze solving', 'Topological sorting', 'Connected components', 'Cycle detection'],
    pseudocode: `function DFS(graph, start):
  stack = [start], visited = {}
  while stack not empty:
    node = stack.pop()
    if node not in visited:
      visited.add(node)
      for neighbor in graph[node]:
        stack.push(neighbor)`,
  },
  dijkstra: {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'graph',
    timeComplexity: { best: 'O(E log V)', average: 'O(E log V)', worst: 'O(E log V)' },
    spaceComplexity: 'O(V)',
    description: 'Finds shortest paths from a source to all vertices in a weighted graph with non-negative edges.',
    working: 'Use priority queue, relax edges of minimum-distance unvisited node until all processed.',
    dryRun: 'Source A: dist[A]=0. Relax A→B(4), A→C(2). Process C, relax C→B. Shortest B=3 via C.',
    advantages: ['Optimal for non-negative weights', 'Widely used in routing', 'Greedy and efficient'],
    disadvantages: ['Fails with negative weights', 'Slower than BFS for unweighted graphs'],
    applications: ['GPS navigation', 'Network routing protocols', 'Flight connections'],
    pseudocode: `function dijkstra(graph, source):
  dist[source] = 0
  pq = priority queue with (0, source)
  while pq not empty:
    d, u = pq.extractMin()
    for (v, w) in graph[u]:
      if dist[u] + w < dist[v]:
        dist[v] = dist[u] + w
        pq.insert(dist[v], v)`,
  },
  'bellman-ford': {
    id: 'bellman-ford',
    name: 'Bellman-Ford Algorithm',
    category: 'graph',
    timeComplexity: { best: 'O(VE)', average: 'O(VE)', worst: 'O(VE)' },
    spaceComplexity: 'O(V)',
    description: 'Computes shortest paths from a source, handling negative edge weights and detecting negative cycles.',
    working: 'Relax all edges V-1 times. One more pass detects negative cycles.',
    dryRun: '3 nodes, edges (A,B,-1),(B,C,2),(A,C,4): After relaxations dist[C]=1 via A→B→C.',
    advantages: ['Handles negative weights', 'Detects negative cycles', 'Works on directed graphs'],
    disadvantages: ['Slower O(VE) than Dijkstra', 'Multiple relaxation passes'],
    applications: ['Currency arbitrage detection', 'Network routing with costs', 'Difference constraints'],
    pseudocode: `function bellmanFord(graph, source):
  dist[source] = 0
  for i = 1 to V-1:
    for each edge (u,v,w):
      if dist[u] + w < dist[v]:
        dist[v] = dist[u] + w
  for each edge (u,v,w):
    if dist[u] + w < dist[v]: return "negative cycle"`,
  },
  prim: {
    id: 'prim',
    name: "Prim's Algorithm",
    category: 'graph',
    timeComplexity: { best: 'O(E log V)', average: 'O(E log V)', worst: 'O(E log V)' },
    spaceComplexity: 'O(V)',
    description: 'Builds a minimum spanning tree by greedily adding the cheapest edge connecting tree to a new vertex.',
    working: 'Start from any node, add minimum weight edge to unvisited node, repeat until all connected.',
    dryRun: 'Start A: pick A-B(1), then B-C(2), then C-D(3). MST weight = 6.',
    advantages: ['Efficient for dense graphs', 'Guarantees MST', 'Simple with priority queue'],
    disadvantages: ['Requires connected graph', 'Less efficient than Kruskal on sparse graphs sometimes'],
    applications: ['Network design', 'Cluster analysis', 'Approximation for TSP'],
    pseudocode: `function prim(graph):
  MST = empty, start =任意 node
  pq = edges from start
  while MST has < V-1 edges:
    pick min edge (u,v) where u in MST, v not in MST
    add v to MST`,
  },
  kruskal: {
    id: 'kruskal',
    name: "Kruskal's Algorithm",
    category: 'graph',
    timeComplexity: { best: 'O(E log E)', average: 'O(E log E)', worst: 'O(E log E)' },
    spaceComplexity: 'O(V)',
    description: 'Builds MST by sorting edges by weight and adding edges that do not form cycles.',
    working: 'Sort edges ascending, use Union-Find to add edges connecting different components.',
    dryRun: 'Edges (A,B,1),(B,C,2),(A,C,3): Add A-B, add B-C, skip A-C (cycle). MST = 3.',
    advantages: ['Great for sparse graphs', 'Simple greedy approach', 'Easy with Union-Find'],
    disadvantages: ['Requires edge sorting', 'Needs Union-Find structure'],
    applications: ['Network cabling', 'Clustering', 'Image segmentation'],
    pseudocode: `function kruskal(edges):
  sort edges by weight
  MST = empty, UF = UnionFind(V)
  for (u,v,w) in edges:
    if UF.find(u) != UF.find(v):
      MST.add(u,v,w)
      UF.union(u,v)`,
  },
  'topological-sort': {
    id: 'topological-sort',
    name: 'Topological Sort',
    category: 'graph',
    timeComplexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
    spaceComplexity: 'O(V)',
    description: 'Linear ordering of vertices in a DAG such that for every edge u→v, u comes before v.',
    working: "Use Kahn's algorithm: remove nodes with in-degree 0, update neighbors, repeat.",
    dryRun: 'DAG: A→B, A→C, B→D. Order: A, B, C, D or A, C, B, D.',
    advantages: ['O(V+E) time', 'Detects cycles in DAG check', 'Essential for scheduling'],
    disadvantages: ['Only works on DAGs', 'Multiple valid orderings exist'],
    applications: ['Course prerequisites', 'Build systems', 'Task scheduling', 'Dependency resolution'],
    pseudocode: `function topologicalSort(graph):
  inDegree = compute in-degrees
  queue = nodes with inDegree 0
  order = []
  while queue not empty:
    u = queue.dequeue()
    order.append(u)
    for v in graph[u]:
      inDegree[v]--
      if inDegree[v] == 0: queue.enqueue(v)`,
  },
};

export const GRAPH_ALGO_LIST = Object.values(GRAPH_ALGORITHMS);
