import { createDsFrame, initStats } from '@/services/dataStructures/base';

function uniqueValues(values) {
  const seen = new Set();
  const input = values.length > 0 ? values : [40, 20, 60, 10, 30, 50, 70];
  return input.filter((value) => {
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  }).slice(0, 11);
}

function createNode(value) {
  return { id: `tree-${value}`, value, left: null, right: null };
}

function insert(root, value) {
  if (!root) return createNode(value);
  if (value < root.value) root.left = insert(root.left, value);
  if (value > root.value) root.right = insert(root.right, value);
  return root;
}

function buildBst(values) {
  return uniqueValues(values).reduce((root, value) => insert(root, value), null);
}

function inorderNodes(node, result = []) {
  if (!node) return result;
  inorderNodes(node.left, result);
  result.push(node);
  inorderNodes(node.right, result);
  return result;
}

function collectEdges(node, edges = []) {
  if (!node) return edges;
  if (node.left) edges.push({ from: node.id, to: node.left.id });
  if (node.right) edges.push({ from: node.id, to: node.right.id });
  collectEdges(node.left, edges);
  collectEdges(node.right, edges);
  return edges;
}

function layoutTree(root) {
  if (!root) return { nodes: [], edges: [], rootId: null, traversal: [] };
  const ordered = inorderNodes(root);
  const spacing = 620 / Math.max(ordered.length, 1);
  const positions = new Map();

  ordered.forEach((node, index) => {
    positions.set(node.id, 50 + spacing * index + spacing / 2);
  });

  const nodes = [];
  const walk = (node, depth = 0) => {
    if (!node) return;
    nodes.push({
      id: node.id,
      value: node.value,
      x: positions.get(node.id),
      y: 55 + depth * 82,
      left: node.left?.id || null,
      right: node.right?.id || null,
    });
    walk(node.left, depth + 1);
    walk(node.right, depth + 1);
  };
  walk(root);

  return { nodes, edges: collectEdges(root), rootId: root.id, traversal: [] };
}

function frame(root, highlights, stats, startTime, message, traversal = []) {
  return createDsFrame(
    { ...layoutTree(root), traversal },
    highlights,
    { ...stats, executionTime: performance.now() - startTime },
    { message },
  );
}

export function* bstInsert(values, value) {
  const stats = initStats();
  const startTime = performance.now();
  let root = buildBst(values);
  const target = value ?? 25;

  yield frame(root, {}, stats, startTime, `Starting BST insert for ${target}`);

  if (!root) {
    root = createNode(target);
    stats.steps++;
    yield frame(root, { inserted: [root.id] }, stats, startTime, `${target} inserted as root`);
    return;
  }

  let current = root;
  const visited = [];
  while (current) {
    stats.steps++;
    stats.comparisons++;
    visited.push(current.id);
    yield frame(root, { current: [current.id], visited }, stats, startTime, `Compare ${target} with ${current.value}`);

    if (target < current.value) {
      if (!current.left) {
        current.left = createNode(target);
        stats.swaps++;
        yield frame(root, { inserted: [current.left.id], visited }, stats, startTime, `Inserted ${target} as left child of ${current.value}`);
        return;
      }
      current = current.left;
    } else if (target > current.value) {
      if (!current.right) {
        current.right = createNode(target);
        stats.swaps++;
        yield frame(root, { inserted: [current.right.id], visited }, stats, startTime, `Inserted ${target} as right child of ${current.value}`);
        return;
      }
      current = current.right;
    } else {
      yield frame(root, { found: [current.id], visited }, stats, startTime, `${target} already exists`);
      return;
    }
  }
}

export function* bstSearch(values, target) {
  const stats = initStats();
  const startTime = performance.now();
  const root = buildBst(values);
  const searchValue = target ?? 30;
  let current = root;
  const visited = [];

  yield frame(root, {}, stats, startTime, `Starting BST search for ${searchValue}`);

  while (current) {
    stats.steps++;
    stats.comparisons++;
    visited.push(current.id);
    yield frame(root, { current: [current.id], visited }, stats, startTime, `Compare ${searchValue} with ${current.value}`);

    if (current.value === searchValue) {
      yield frame(root, { found: [current.id], visited }, stats, startTime, `Found ${searchValue}`);
      return;
    }
    current = searchValue < current.value ? current.left : current.right;
  }

  yield frame(root, { visited }, stats, startTime, `${searchValue} was not found`);
}

function traversalOrder(root, algorithmId) {
  const order = [];
  const walk = (node) => {
    if (!node) return;
    if (algorithmId === 'preorder-traversal') order.push(node);
    walk(node.left);
    if (algorithmId === 'inorder-traversal') order.push(node);
    walk(node.right);
    if (algorithmId === 'postorder-traversal') order.push(node);
  };
  walk(root);
  return order;
}

export function* treeTraversal(values, algorithmId) {
  const stats = initStats();
  const startTime = performance.now();
  const root = buildBst(values);
  const order = traversalOrder(root, algorithmId);
  const visited = [];
  const traversal = [];

  yield frame(root, {}, stats, startTime, 'Starting tree traversal');

  for (const node of order) {
    stats.steps++;
    visited.push(node.id);
    traversal.push(node.value);
    yield frame(root, { current: [node.id], visited: [...visited] }, stats, startTime, `Visited ${node.value}`, [...traversal]);
  }

  yield frame(root, { visited }, stats, startTime, `Traversal complete: ${traversal.join(', ')}`, traversal);
}

export function runTreeAlgorithm(algorithmId, values, target) {
  const frames = [];
  const generator =
    algorithmId === 'bst-insert'
      ? bstInsert(values, target)
      : algorithmId === 'bst-search'
        ? bstSearch(values, target)
        : treeTraversal(values, algorithmId);

  for (const item of generator) {
    frames.push(item);
  }
  return frames;
}
