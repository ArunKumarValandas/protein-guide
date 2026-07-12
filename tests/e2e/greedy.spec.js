import { expect, test } from '@playwright/test';

test.describe('Greedy Algorithms', () => {
  test('should display greedy algorithms', async ({ page }) => {
    await page.goto('/algorithms/greedy');
    await expect(page.getByRole('heading', { name: 'Greedy Algorithms' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Activity Selection' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Huffman Coding' })).toBeVisible();
  });

  test('should open greedy visualizer', async ({ page }) => {
    await page.goto('/algorithms/greedy/activity-selection');
    await expect(page.getByRole('heading', { name: 'Activity Selection' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
  });
});
