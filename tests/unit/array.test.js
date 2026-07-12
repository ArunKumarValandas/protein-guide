import { describe, it, expect } from 'vitest';
import { generateRandomArray, parseArrayInput, isSorted } from '@/utils/array';

describe('array utilities', () => {
  it('generates array of correct size', () => {
    const arr = generateRandomArray(10);
    expect(arr).toHaveLength(10);
    arr.forEach((n) => {
      expect(n).toBeGreaterThanOrEqual(5);
      expect(n).toBeLessThanOrEqual(100);
    });
  });

  it('parses comma-separated input', () => {
    expect(parseArrayInput('1, 2, 3')).toEqual([1, 2, 3]);
    expect(parseArrayInput('64 34 25')).toEqual([64, 34, 25]);
  });

  it('filters invalid input', () => {
    expect(parseArrayInput('1, abc, 3')).toEqual([1, 3]);
    expect(parseArrayInput('')).toEqual([]);
  });

  it('detects sorted arrays', () => {
    expect(isSorted([1, 2, 3, 4])).toBe(true);
    expect(isSorted([1, 3, 2])).toBe(false);
  });
});
