import { expect, test } from '@playwright/test';

test.describe('Backtracking', () => {
  test('should display backtracking algorithms', async ({ page }) => {
    await page.goto('/algorithms/backtracking');
    await expect(page.getByRole('heading', { name: 'Backtracking' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'N-Queens' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sudoku Solver' })).toBeVisible();
  });

  test('should open backtracking visualizer', async ({ page }) => {
    await page.goto('/algorithms/backtracking/n-queens');
    await expect(page.getByRole('heading', { name: 'N-Queens' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
  });
});
