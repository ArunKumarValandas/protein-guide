import { createDsFrame, initStats } from './base';

function getNodeId(index) {
  return `node-${index}`;
}

function createNode(value, index) {
  return { id: getNodeId(index), value };
}

function buildLinkedListVisualData(values, type = 'singly') {
  const nodes = values.map((value, index) => createNode(value, index));
  const circular = type === 'circular';
  const doubly = type === 'doubly';

  nodes.forEach((node, index) => {
    const nextNode = nodes[index + 1] || (circular ? nodes[0] : null);
    const prevNode = nodes[index - 1] || (circular && doubly ? nodes[nodes.length - 1] : null);
    node.next = nextNode?.id || null;
    if (doubly) node.prev = prevNode?.id || null;
  });

  return {
    type,
    circular,
    doubly,
    nodes,
    headId: nodes[0]?.id || null,
    tailId: nodes[nodes.length - 1]?.id || null,
  };
}

function listValues(visualData) {
  return visualData.nodes.map((node) => node.value);
}

function frame(visualData, highlights, stats, startTime, message) {
  return createDsFrame(
    visualData,
    highlights,
    { ...stats, executionTime: performance.now() - startTime },
    { message },
  );
}

function normalizeInput(values) {
  return values.length > 0 ? values.slice(0, 12) : [12, 24, 36, 48, 60];
}

export function* insertNode(values, value, type = 'singly') {
  const stats = initStats();
  const startTime = performance.now();
  let visualData = buildLinkedListVisualData(normalizeInput(values), type);

  yield frame(visualData, {}, stats, startTime, 'Starting head insertion');

  const nextHead = visualData.headId;
  const newNode = {
    id: 'node-new',
    value,
    next: nextHead,
    ...(visualData.doubly ? { prev: visualData.circular ? visualData.tailId : null } : {}),
  };
  visualData = { ...visualData, nodes: [newNode, ...visualData.nodes], headId: newNode.id };
  stats.steps++;
  stats.swaps++;

  yield frame(
    visualData,
    { inserted: [newNode.id], current: [newNode.id], rewired: [newNode.id, nextHead].filter(Boolean) },
    stats,
    startTime,
    `Created ${value} and pointed it to the old head`,
  );

  if (visualData.doubly && nextHead) {
    visualData.nodes = visualData.nodes.map((node) =>
      node.id === nextHead ? { ...node, prev: newNode.id } : node,
    );
    stats.steps++;
    stats.swaps++;
    yield frame(
      visualData,
      { inserted: [newNode.id], rewired: [newNode.id, nextHead] },
      stats,
      startTime,
      'Updated the old head previous pointer',
    );
  }

  if (visualData.circular && visualData.tailId) {
    visualData.nodes = visualData.nodes.map((node) =>
      node.id === visualData.tailId ? { ...node, next: newNode.id } : node,
    );
    stats.steps++;
    stats.swaps++;
    yield frame(
      visualData,
      { inserted: [newNode.id], rewired: [visualData.tailId, newNode.id] },
      stats,
      startTime,
      'Updated the tail pointer to preserve the circular link',
    );
  }

  yield frame(
    visualData,
    { inserted: [newNode.id], head: [newNode.id] },
    stats,
    startTime,
    `${value} is now the head node`,
  );
}

export function* deleteNode(values, target, type = 'singly') {
  const stats = initStats();
  const startTime = performance.now();
  let visualData = buildLinkedListVisualData(normalizeInput(values), type);

  yield frame(visualData, {}, stats, startTime, `Searching for ${target} to delete`);

  const nodes = visualData.nodes;
  const targetIndex = nodes.findIndex((node) => {
    stats.steps++;
    stats.comparisons++;
    return node.value === target;
  });

  for (let i = 0; i < nodes.length; i++) {
    yield frame(
      visualData,
      { current: [nodes[i].id], visited: nodes.slice(0, i).map((node) => node.id) },
      stats,
      startTime,
      `Checking node ${nodes[i].value}`,
    );
    if (i === targetIndex) break;
  }

  if (targetIndex === -1) {
    yield frame(visualData, { visited: nodes.map((node) => node.id) }, stats, startTime, `${target} was not found`);
    return;
  }

  const targetNode = nodes[targetIndex];
  const previousNode = nodes[targetIndex - 1] || null;
  const nextNode = nodes[targetIndex + 1] || (visualData.circular ? nodes[0] : null);

  yield frame(
    visualData,
    { deleting: [targetNode.id], current: [targetNode.id] },
    stats,
    startTime,
    `Found ${target}; rewiring pointers around it`,
  );

  const remainingValues = listValues(visualData).filter((_, index) => index !== targetIndex);
  visualData = buildLinkedListVisualData(remainingValues, type);
  stats.steps++;
  stats.swaps += previousNode || targetIndex === 0 ? 1 : 0;
  if (visualData.doubly && nextNode) stats.swaps++;
  if (visualData.circular && visualData.nodes.length > 1) stats.swaps++;

  yield frame(
    visualData,
    { rewired: [previousNode?.id, nextNode?.id].filter(Boolean), deleted: [targetNode.id] },
    stats,
    startTime,
    `Removed ${target} from the list`,
  );
}

export function* searchNode(values, target, type = 'singly') {
  const stats = initStats();
  const startTime = performance.now();
  const visualData = buildLinkedListVisualData(normalizeInput(values), type);

  yield frame(visualData, {}, stats, startTime, `Searching for ${target}`);

  for (let i = 0; i < visualData.nodes.length; i++) {
    const node = visualData.nodes[i];
    stats.steps++;
    stats.comparisons++;
    yield frame(
      visualData,
      { current: [node.id], visited: visualData.nodes.slice(0, i).map((item) => item.id) },
      stats,
      startTime,
      `Comparing ${node.value} with ${target}`,
    );

    if (node.value === target) {
      yield frame(visualData, { found: [node.id] }, stats, startTime, `Found ${target}`);
      return;
    }
  }

  yield frame(
    visualData,
    { visited: visualData.nodes.map((node) => node.id) },
    stats,
    startTime,
    `${target} was not found`,
  );
}

export function* reverseList(values, _target, type = 'singly') {
  const stats = initStats();
  const startTime = performance.now();
  const originalValues = normalizeInput(values);
  let visualData = buildLinkedListVisualData(originalValues, type);
  const reversedIds = [];

  yield frame(visualData, {}, stats, startTime, 'Starting in-place pointer reversal');

  for (let i = 0; i < visualData.nodes.length; i++) {
    const node = visualData.nodes[i];
    stats.steps++;
    stats.swaps++;
    reversedIds.unshift(node.id);
    yield frame(
      visualData,
      { current: [node.id], rewired: [...reversedIds] },
      stats,
      startTime,
      `Reversing pointer for ${node.value}`,
    );
  }

  visualData = buildLinkedListVisualData([...originalValues].reverse(), type);
  yield frame(
    visualData,
    { rewired: visualData.nodes.map((node) => node.id), head: [visualData.headId] },
    stats,
    startTime,
    'List reversal complete',
  );
}

export function* traverseList(values, _target, type = 'singly') {
  const stats = initStats();
  const startTime = performance.now();
  const visualData = buildLinkedListVisualData(normalizeInput(values), type);

  yield frame(visualData, {}, stats, startTime, 'Starting traversal from head');

  for (let i = 0; i < visualData.nodes.length; i++) {
    stats.steps++;
    const node = visualData.nodes[i];
    yield frame(
      visualData,
      { current: [node.id], visited: visualData.nodes.slice(0, i + 1).map((item) => item.id) },
      stats,
      startTime,
      `Visited ${node.value}`,
    );
  }

  yield frame(
    visualData,
    { visited: visualData.nodes.map((node) => node.id) },
    stats,
    startTime,
    visualData.circular ? 'Returned to head after one full cycle' : 'Reached null after the tail',
  );
}

export const LINKED_LIST_GENERATORS = {
  insert: insertNode,
  delete: deleteNode,
  search: searchNode,
  reverse: reverseList,
  traverse: traverseList,
};

export function runLinkedListOperation(type, operation, values, target) {
  const generator = LINKED_LIST_GENERATORS[operation];
  if (!generator) throw new Error(`Unknown linked list operation: ${operation}`);

  const frames = [];
  for (const item of generator(values, target, type)) {
    frames.push(item);
  }
  return frames;
}
