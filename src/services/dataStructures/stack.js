import { createDsFrame, initStats } from './base';

function buildStackVisualData(values) {
  const items = values.map((value, index) => ({ id: `stack-${index}`, value }));
  return {
    items,
    topId: items[items.length - 1]?.id || null,
  };
}

function normalizeStack(values) {
  return values.length > 0 ? values.slice(0, 8) : [14, 28, 42, 56];
}

function frame(visualData, highlights, stats, startTime, message) {
  return createDsFrame(
    visualData,
    highlights,
    { ...stats, executionTime: performance.now() - startTime },
    { message },
  );
}

export function* pushStack(values, value) {
  const stats = initStats();
  const startTime = performance.now();
  const stack = normalizeStack(values);
  let visualData = buildStackVisualData(stack);

  yield frame(visualData, {}, stats, startTime, 'Starting push operation');

  stack.push(value);
  visualData = buildStackVisualData(stack);
  stats.steps++;
  stats.swaps++;

  yield frame(
    visualData,
    { pushed: [visualData.topId], current: [visualData.topId] },
    stats,
    startTime,
    `Pushed ${value} onto the top of the stack`,
  );
}

export function* popStack(values) {
  const stats = initStats();
  const startTime = performance.now();
  const stack = normalizeStack(values);
  let visualData = buildStackVisualData(stack);

  yield frame(visualData, {}, stats, startTime, 'Starting pop operation');

  if (stack.length === 0) {
    yield frame(visualData, {}, stats, startTime, 'Stack is empty');
    return;
  }

  const topId = visualData.topId;
  const topValue = stack[stack.length - 1];
  yield frame(visualData, { current: [topId], popping: [topId] }, stats, startTime, `Top value is ${topValue}`);

  stack.pop();
  visualData = buildStackVisualData(stack);
  stats.steps++;
  stats.swaps++;

  yield frame(visualData, { popped: [topId], top: [visualData.topId].filter(Boolean) }, stats, startTime, `Popped ${topValue}`);
}

export function* peekStack(values) {
  const stats = initStats();
  const startTime = performance.now();
  const visualData = buildStackVisualData(normalizeStack(values));

  yield frame(visualData, {}, stats, startTime, 'Starting peek operation');

  if (!visualData.topId) {
    yield frame(visualData, {}, stats, startTime, 'Stack is empty');
    return;
  }

  stats.steps++;
  stats.comparisons++;
  const top = visualData.items[visualData.items.length - 1];
  yield frame(visualData, { current: [top.id], found: [top.id] }, stats, startTime, `Peek returns ${top.value} without removing it`);
}

export function* clearStack(values) {
  const stats = initStats();
  const startTime = performance.now();
  const stack = normalizeStack(values);
  let visualData = buildStackVisualData(stack);

  yield frame(visualData, {}, stats, startTime, 'Starting clear operation');

  while (stack.length > 0) {
    const topId = visualData.topId;
    const topValue = stack.pop();
    stats.steps++;
    stats.swaps++;
    yield frame(visualData, { popping: [topId], current: [topId] }, stats, startTime, `Removing ${topValue}`);
    visualData = buildStackVisualData(stack);
    yield frame(visualData, { top: [visualData.topId].filter(Boolean) }, stats, startTime, 'Top pointer moved down');
  }

  yield frame(visualData, {}, stats, startTime, 'Stack cleared');
}

export const STACK_GENERATORS = {
  push: pushStack,
  pop: popStack,
  peek: peekStack,
  clear: clearStack,
};

export function runStackOperation(operation, values, value) {
  const generator = STACK_GENERATORS[operation];
  if (!generator) throw new Error(`Unknown stack operation: ${operation}`);

  const frames = [];
  for (const item of generator(values, value)) {
    frames.push(item);
  }
  return frames;
}
