import { createDsFrame, initStats } from '@/services/dataStructures/base';

function frame(items, highlights, stats, startTime, message, extra = {}) {
  return createDsFrame(
    { items: items.map((item) => ({ ...item })), ...extra },
    highlights,
    { ...stats, executionTime: performance.now() - startTime },
    { message },
  );
}

export function* activitySelection() {
  const stats = initStats();
  const startTime = performance.now();
  const items = [
    { id: 'A', label: 'A', start: 1, finish: 3 },
    { id: 'B', label: 'B', start: 2, finish: 5 },
    { id: 'C', label: 'C', start: 4, finish: 7 },
    { id: 'D', label: 'D', start: 6, finish: 9 },
    { id: 'E', label: 'E', start: 8, finish: 10 },
  ].sort((a, b) => a.finish - b.finish);
  const selected = [];
  let lastFinish = -Infinity;

  yield frame(items, {}, stats, startTime, 'Sort by earliest finish time', { selected, total: 0 });

  for (const item of items) {
    stats.steps++;
    stats.comparisons++;
    yield frame(items, { current: [item.id], selected: [...selected] }, stats, startTime, `Consider ${item.label} (${item.start}-${item.finish})`, { selected: [...selected], total: selected.length });
    if (item.start >= lastFinish) {
      selected.push(item.id);
      lastFinish = item.finish;
      stats.swaps++;
      yield frame(items, { current: [item.id], selected: [...selected] }, stats, startTime, `Select ${item.label}`, { selected: [...selected], total: selected.length });
    } else {
      yield frame(items, { rejected: [item.id], selected: [...selected] }, stats, startTime, `Reject ${item.label}; overlaps previous selection`, { selected: [...selected], total: selected.length });
    }
  }

  yield frame(items, { selected }, stats, startTime, `Selected ${selected.length} compatible activities`, { selected, total: selected.length });
}

export function* fractionalKnapsack() {
  const stats = initStats();
  const startTime = performance.now();
  const capacity = 50;
  let remaining = capacity;
  const items = [
    { id: 'I1', label: 'I1', weight: 10, value: 60 },
    { id: 'I2', label: 'I2', weight: 20, value: 100 },
    { id: 'I3', label: 'I3', weight: 30, value: 120 },
  ].map((item) => ({ ...item, ratio: item.value / item.weight, taken: 0 }))
    .sort((a, b) => b.ratio - a.ratio);
  let total = 0;

  yield frame(items, {}, stats, startTime, 'Sort by value density', { total, remaining, capacity });

  for (const item of items) {
    stats.steps++;
    stats.comparisons++;
    yield frame(items, { current: [item.id] }, stats, startTime, `Consider ${item.label} ratio ${item.ratio.toFixed(2)}`, { total, remaining, capacity });
    if (remaining <= 0) break;
    const takeWeight = Math.min(item.weight, remaining);
    item.taken = takeWeight / item.weight;
    total += item.value * item.taken;
    remaining -= takeWeight;
    stats.swaps++;
    yield frame(items, { selected: [item.id] }, stats, startTime, `Take ${(item.taken * 100).toFixed(0)}% of ${item.label}`, { total: Math.round(total), remaining, capacity });
  }

  yield frame(items, { selected: items.filter((item) => item.taken > 0).map((item) => item.id) }, stats, startTime, `Maximum value ${Math.round(total)}`, { total: Math.round(total), remaining, capacity });
}

export function* huffmanCoding() {
  const stats = initStats();
  const startTime = performance.now();
  let items = [
    { id: 'A', label: 'A', frequency: 5 },
    { id: 'B', label: 'B', frequency: 9 },
    { id: 'C', label: 'C', frequency: 12 },
    { id: 'D', label: 'D', frequency: 13 },
    { id: 'E', label: 'E', frequency: 16 },
    { id: 'F', label: 'F', frequency: 45 },
  ];
  let mergeIndex = 1;

  yield frame(items, {}, stats, startTime, 'Initialize min-heap by frequency', { total: items.length });

  while (items.length > 1) {
    items = [...items].sort((a, b) => a.frequency - b.frequency);
    const [first, second, ...rest] = items;
    stats.steps++;
    stats.comparisons += 2;
    yield frame(items, { current: [first.id, second.id] }, stats, startTime, `Merge ${first.label} and ${second.label}`);
    const merged = {
      id: `M${mergeIndex}`,
      label: `M${mergeIndex}`,
      frequency: first.frequency + second.frequency,
      children: [first.id, second.id],
    };
    mergeIndex++;
    stats.swaps++;
    items = [...rest, merged];
    yield frame(items, { selected: [merged.id] }, stats, startTime, `Created ${merged.label} with frequency ${merged.frequency}`, { total: items.length });
  }

  yield frame(items, { selected: [items[0].id] }, stats, startTime, `Huffman root frequency ${items[0].frequency}`, { total: items[0].frequency });
}

const GREEDY_GENERATORS = {
  'activity-selection': activitySelection,
  'fractional-knapsack': fractionalKnapsack,
  huffman: huffmanCoding,
};

export function runGreedyAlgorithm(algorithmId) {
  const generator = GREEDY_GENERATORS[algorithmId];
  if (!generator) throw new Error(`Unknown greedy algorithm: ${algorithmId}`);
  const frames = [];
  for (const item of generator()) frames.push(item);
  return frames;
}
