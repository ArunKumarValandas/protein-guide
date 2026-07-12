export const PATHFINDING_ALGORITHMS = {
  'path-bfs': {
    id: 'path-bfs',
    name: 'Grid BFS',
    category: 'pathfinding',
    timeComplexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
    spaceComplexity: 'O(V)',
    description: 'Finds the shortest path in an unweighted grid by expanding cells level by level.',
    working: 'Use a queue from the start cell, visit neighbors in layers, and reconstruct the path once the target is reached.',
    dryRun: 'Start at top-left, enqueue open neighbors, continue outward by distance until the target cell is reached.',
    advantages: ['Guarantees shortest path in unweighted grids', 'Simple and complete', 'Great for maze solving'],
    disadvantages: ['Can explore many cells', 'Uses O(V) memory', 'Does not use target direction like A*'],
    applications: ['Maze solving', 'Unweighted map routing', 'Robot grid navigation'],
    pseudocode: `function bfs(grid, start, goal):
  queue = [start]
  visited = {start}
  while queue not empty:
    cell = queue.dequeue()
    if cell == goal: return path
    for neighbor in openNeighbors(cell):
      if neighbor not visited:
        visited.add(neighbor)
        parent[neighbor] = cell
        queue.enqueue(neighbor)`,
    interviewQuestions: ['Why does BFS find shortest paths in unweighted graphs?', 'What data structure does BFS use?', 'How do you reconstruct the path?'],
    commonMistakes: ['Marking cells visited too late', 'Forgetting walls', 'Not storing parents for path reconstruction'],
  },
  'path-dfs': {
    id: 'path-dfs',
    name: 'Grid DFS',
    category: 'pathfinding',
    timeComplexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
    spaceComplexity: 'O(V)',
    description: 'Explores one path deeply before backtracking. It can find a path but not necessarily the shortest one.',
    working: 'Use a stack from the start cell, push open neighbors, and continue until the goal is found or all reachable cells are explored.',
    dryRun: 'Follow one branch of open cells until blocked, backtrack through the stack, then try another branch.',
    advantages: ['Simple implementation', 'Often uses less frontier memory', 'Useful for exhaustive search'],
    disadvantages: ['Does not guarantee shortest path', 'Can go deep in the wrong direction', 'Order-dependent results'],
    applications: ['Maze generation', 'Reachability checks', 'Backtracking search'],
    pseudocode: `function dfs(grid, start, goal):
  stack = [start]
  while stack not empty:
    cell = stack.pop()
    if cell == goal: return path
    for neighbor in openNeighbors(cell):
      if neighbor not visited:
        parent[neighbor] = cell
        stack.push(neighbor)`,
    interviewQuestions: ['Why is DFS not shortest-path optimal?', 'How does stack order affect DFS?', 'When is DFS useful in pathfinding?'],
    commonMistakes: ['Assuming DFS path is shortest', 'Not guarding against revisits', 'Forgetting to backtrack parent state'],
  },
  'path-dijkstra': {
    id: 'path-dijkstra',
    name: 'Grid Dijkstra',
    category: 'pathfinding',
    timeComplexity: { best: 'O(E log V)', average: 'O(E log V)', worst: 'O(E log V)' },
    spaceComplexity: 'O(V)',
    description: 'Finds the shortest weighted path by always expanding the currently closest known cell.',
    working: 'Track distances from start, repeatedly choose the unvisited cell with lowest distance, and relax neighbors.',
    dryRun: 'Start distance is 0. Each open neighbor gets distance + 1. The closest frontier cell is processed next.',
    advantages: ['Optimal for non-negative weights', 'Generalizes BFS to weighted grids', 'Deterministic'],
    disadvantages: ['More overhead than BFS on unweighted grids', 'No heuristic guidance', 'Requires priority selection'],
    applications: ['Weighted maps', 'Network routing', 'Cost-aware robot navigation'],
    pseudocode: `function dijkstra(grid, start, goal):
  dist[start] = 0
  priorityQueue.push(start)
  while queue not empty:
    cell = extractMin()
    for neighbor in openNeighbors(cell):
      if dist[cell] + cost < dist[neighbor]:
        dist[neighbor] = dist[cell] + cost
        parent[neighbor] = cell`,
    interviewQuestions: ['Why can Dijkstra handle weighted paths?', 'What edge weights are invalid?', 'How is it different from BFS?'],
    commonMistakes: ['Using it with negative weights', 'Not updating parent on relaxation', 'Processing stale queue entries incorrectly'],
  },
  'path-a-star': {
    id: 'path-a-star',
    name: 'A* Search',
    category: 'pathfinding',
    timeComplexity: { best: 'O(E)', average: 'O(E)', worst: 'O(E)' },
    spaceComplexity: 'O(V)',
    description: 'Uses path cost plus a heuristic estimate to guide search toward the target while preserving optimality with an admissible heuristic.',
    working: 'Choose the cell with smallest f = g + h, where g is distance from start and h is Manhattan distance to the goal.',
    dryRun: 'Cells closer to the goal by Manhattan distance are preferred when path cost is similar.',
    advantages: ['Usually explores fewer cells than Dijkstra', 'Optimal with admissible heuristics', 'Excellent for grid navigation'],
    disadvantages: ['Heuristic quality matters', 'Worst case can still explore many cells', 'More complex than BFS'],
    applications: ['Game pathfinding', 'Robotics', 'Map routing', 'Puzzle solving'],
    pseudocode: `function aStar(grid, start, goal):
  open = [start]
  g[start] = 0
  while open not empty:
    cell = node with lowest g[cell] + heuristic(cell, goal)
    if cell == goal: return path
    for neighbor in openNeighbors(cell):
      tentative = g[cell] + cost
      if tentative < g[neighbor]:
        parent[neighbor] = cell
        g[neighbor] = tentative`,
    interviewQuestions: ['What makes a heuristic admissible?', 'Why is Manhattan distance common on grids?', 'How does A* differ from Dijkstra?'],
    commonMistakes: ['Using an overestimating heuristic', 'Not updating g scores', 'Forgetting to reconstruct from parent links'],
  },
};

export const PATHFINDING_ALGO_LIST = Object.values(PATHFINDING_ALGORITHMS);
