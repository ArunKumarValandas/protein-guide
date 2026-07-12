import { expect, test } from '@playwright/test';

test.describe('Pathfinding', () => {
  test('should display pathfinding algorithms', async ({ page }) => {
    await page.goto('/algorithms/pathfinding');
    await expect(page.getByRole('heading', { name: 'Pathfinding' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Grid BFS' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'A* Search' })).toBeVisible();
  });

  test('should open pathfinding visualizer', async ({ page }) => {
    await page.goto('/algorithms/pathfinding/path-bfs');
    await expect(page.getByRole('heading', { name: 'Grid BFS' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
    await expect(page.getByText('S is the start cell')).toBeVisible();
  });
});
