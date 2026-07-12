import { linearSearch } from './linearSearch';
import { binarySearch } from './binarySearch';
import { jumpSearch } from './jumpSearch';
import { interpolationSearch } from './interpolationSearch';
import { exponentialSearch } from './exponentialSearch';

export const SEARCHING_GENERATORS = {
  'linear-search': linearSearch,
  'binary-search': binarySearch,
  'jump-search': jumpSearch,
  'interpolation-search': interpolationSearch,
  'exponential-search': exponentialSearch,
};

export function runSearchingAlgorithm(algorithmId, array, target) {
  const generator = SEARCHING_GENERATORS[algorithmId];
  if (!generator) throw new Error(`Unknown searching algorithm: ${algorithmId}`);

  const sortedArray = [...array].sort((a, b) => a - b);
  const frames = [];
  const gen = generator(sortedArray, target);

  for (const frame of gen) {
    frames.push(frame);
  }

  return frames;
}
