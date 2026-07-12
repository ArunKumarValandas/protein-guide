import { expect, test } from '@playwright/test';

test.describe('Dynamic Programming', () => {
  test('should display DP algorithms', async ({ page }) => {
    await page.goto('/algorithms/dynamic-programming');
    await expect(page.getByRole('heading', { name: 'Dynamic Programming' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Fibonacci DP' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '0/1 Knapsack' })).toBeVisible();
  });

  test('should open DP visualizer', async ({ page }) => {
    await page.goto('/algorithms/dynamic-programming/fibonacci');
    await expect(page.getByRole('heading', { name: 'Fibonacci DP' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
    await expect(page.getByText('Yellow cells are being solved')).toBeVisible();
  });
});
