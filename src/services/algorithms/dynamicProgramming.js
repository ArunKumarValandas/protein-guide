import { createDsFrame, initStats } from '@/services/dataStructures/base';

function frame(table, highlights, stats, startTime, message, extra = {}) {
  return createDsFrame(
    { table: table.map((row) => [...row]), ...extra },
    highlights,
    { ...stats, executionTime: performance.now() - startTime },
    { message },
  );
}

export function* fibonacciDp(n = 8) {
  const stats = initStats();
  const startTime = performance.now();
  const table = [Array.from({ length: n + 1 }, () => '')];
  table[0][0] = 0;
  table[0][1] = 1;

  yield frame(table, { current: ['0-0', '0-1'] }, stats, startTime, 'Initialize base cases', { rowLabels: ['dp'], colLabels: Array.from({ length: n + 1 }, (_, i) => String(i)) });

  for (let i = 2; i <= n; i++) {
    stats.steps++;
    stats.comparisons++;
    table[0][i] = table[0][i - 1] + table[0][i - 2];
    yield frame(
      table,
      { current: [`0-${i}`], dependencies: [`0-${i - 1}`, `0-${i - 2}`] },
      stats,
      startTime,
      `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${table[0][i]}`,
      { rowLabels: ['dp'], colLabels: Array.from({ length: n + 1 }, (_, idx) => String(idx)) },
    );
  }

  yield frame(table, { solved: table[0].map((_, i) => `0-${i}`) }, stats, startTime, `Fibonacci(${n}) = ${table[0][n]}`, { rowLabels: ['dp'], colLabels: Array.from({ length: n + 1 }, (_, i) => String(i)), result: table[0][n] });
}

export function* knapsackDp() {
  const stats = initStats();
  const startTime = performance.now();
  const items = [
    { weight: 1, value: 1 },
    { weight: 3, value: 4 },
    { weight: 4, value: 5 },
    { weight: 5, value: 7 },
  ];
  const capacity = 7;
  const table = Array.from({ length: items.length + 1 }, () => Array(capacity + 1).fill(0));

  yield frame(table, {}, stats, startTime, 'Initialize knapsack table', { rowLabels: ['0 items', ...items.map((item, i) => `i${i + 1} w${item.weight}/v${item.value}`)], colLabels: Array.from({ length: capacity + 1 }, (_, i) => String(i)) });

  for (let i = 1; i <= items.length; i++) {
    const item = items[i - 1];
    for (let w = 0; w <= capacity; w++) {
      stats.steps++;
      stats.comparisons++;
      const skip = table[i - 1][w];
      let take = -Infinity;
      if (item.weight <= w) take = item.value + table[i - 1][w - item.weight];
      table[i][w] = Math.max(skip, take);
      const dependencies = [`${i - 1}-${w}`];
      if (item.weight <= w) dependencies.push(`${i - 1}-${w - item.weight}`);
      yield frame(table, { current: [`${i}-${w}`], dependencies }, stats, startTime, `item ${i}, capacity ${w}: max(skip ${skip}, take ${take === -Infinity ? 'n/a' : take}) = ${table[i][w]}`, { rowLabels: ['0 items', ...items.map((entry, idx) => `i${idx + 1} w${entry.weight}/v${entry.value}`)], colLabels: Array.from({ length: capacity + 1 }, (_, col) => String(col)) });
    }
  }

  yield frame(table, { solved: [`${items.length}-${capacity}`] }, stats, startTime, `Best value is ${table[items.length][capacity]}`, { rowLabels: ['0 items', ...items.map((item, i) => `i${i + 1} w${item.weight}/v${item.value}`)], colLabels: Array.from({ length: capacity + 1 }, (_, i) => String(i)), result: table[items.length][capacity] });
}

export function* lcsDp() {
  const stats = initStats();
  const startTime = performance.now();
  const a = 'ABCBDAB';
  const b = 'BDCABA';
  const table = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  const rowLabels = ['-', ...a.split('')];
  const colLabels = ['-', ...b.split('')];

  yield frame(table, {}, stats, startTime, 'Initialize LCS table', { rowLabels, colLabels });

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      stats.steps++;
      stats.comparisons++;
      if (a[i - 1] === b[j - 1]) {
        table[i][j] = table[i - 1][j - 1] + 1;
        yield frame(table, { current: [`${i}-${j}`], dependencies: [`${i - 1}-${j - 1}`] }, stats, startTime, `${a[i - 1]} matches ${b[j - 1]}: extend diagonal`, { rowLabels, colLabels });
      } else {
        table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
        yield frame(table, { current: [`${i}-${j}`], dependencies: [`${i - 1}-${j}`, `${i}-${j - 1}`] }, stats, startTime, `${a[i - 1]} != ${b[j - 1]}: take max of top/left`, { rowLabels, colLabels });
      }
    }
  }

  yield frame(table, { solved: [`${a.length}-${b.length}`] }, stats, startTime, `LCS length is ${table[a.length][b.length]}`, { rowLabels, colLabels, result: table[a.length][b.length] });
}

const DP_GENERATORS = {
  fibonacci: fibonacciDp,
  knapsack: knapsackDp,
  lcs: lcsDp,
};

export function runDpAlgorithm(algorithmId) {
  const generator = DP_GENERATORS[algorithmId];
  if (!generator) throw new Error(`Unknown DP algorithm: ${algorithmId}`);
  const frames = [];
  for (const item of generator()) frames.push(item);
  return frames;
}
