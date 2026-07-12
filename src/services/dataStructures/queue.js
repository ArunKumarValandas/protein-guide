import { createDsFrame, initStats } from './base';

function normalizeQueue(values, type) {
  const input = values.length > 0 ? values.slice(0, 8) : [18, 32, 46, 60];
  return type === 'priority-queue' ? [...input].sort((a, b) => a - b) : input;
}

function buildQueueVisualData(values, type = 'queue', capacity = 8) {
  const items = values.map((value, index) => ({
    id: `queue-${index}`,
    value,
    priority: type === 'priority-queue' ? value : null,
    slot: type === 'circular-queue' ? index % capacity : index,
  }));

  return {
    type,
    items,
    capacity,
    frontId: items[0]?.id || null,
    rearId: items[items.length - 1]?.id || null,
    circular: type === 'circular-queue',
    priority: type === 'priority-queue',
    deque: type === 'deque',
  };
}

function frame(visualData, highlights, stats, startTime, message) {
  return createDsFrame(
    visualData,
    highlights,
    { ...stats, executionTime: performance.now() - startTime },
    { message },
  );
}

export function* enqueueQueue(type, values, value) {
  const stats = initStats();
  const startTime = performance.now();
  const queue = normalizeQueue(values, type);
  let visualData = buildQueueVisualData(queue, type);

  yield frame(visualData, {}, stats, startTime, 'Starting enqueue operation');

  if (type === 'circular-queue' && queue.length >= visualData.capacity) {
    yield frame(visualData, {}, stats, startTime, 'Circular queue is full');
    return;
  }

  queue.push(value);
  if (type === 'priority-queue') queue.sort((a, b) => a - b);
  visualData = buildQueueVisualData(queue, type);
  const inserted = visualData.items.find((item) => item.value === value)?.id || visualData.rearId;
  stats.steps++;
  stats.swaps++;

  yield frame(
    visualData,
    { inserted: [inserted], rear: [visualData.rearId] },
    stats,
    startTime,
    type === 'priority-queue'
      ? `Inserted ${value} by priority; lower values leave first`
      : `Enqueued ${value} at the rear`,
  );
}

export function* dequeueQueue(type, values) {
  const stats = initStats();
  const startTime = performance.now();
  const queue = normalizeQueue(values, type);
  let visualData = buildQueueVisualData(queue, type);

  yield frame(visualData, {}, stats, startTime, 'Starting dequeue operation');

  if (queue.length === 0) {
    yield frame(visualData, {}, stats, startTime, 'Queue is empty');
    return;
  }

  const frontId = visualData.frontId;
  const frontValue = queue[0];
  stats.steps++;
  yield frame(visualData, { current: [frontId], removing: [frontId] }, stats, startTime, `Front value is ${frontValue}`);

  queue.shift();
  visualData = buildQueueVisualData(queue, type);
  stats.steps++;
  stats.swaps++;

  yield frame(
    visualData,
    { removed: [frontId], front: [visualData.frontId].filter(Boolean) },
    stats,
    startTime,
    `Dequeued ${frontValue}; front pointer advanced`,
  );
}

export const QUEUE_GENERATORS = {
  enqueue: enqueueQueue,
  dequeue: dequeueQueue,
};

export function runQueueOperation(type, operation, values, value) {
  const generator = QUEUE_GENERATORS[operation];
  if (!generator) throw new Error(`Unknown queue operation: ${operation}`);

  const frames = [];
  for (const item of generator(type, values, value)) {
    frames.push(item);
  }
  return frames;
}
