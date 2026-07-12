import { expect, test } from '@playwright/test';

test.describe('Graph Algorithms', () => {
  test('should display graph algorithms', async ({ page }) => {
    await page.goto('/algorithms/graph');
    await expect(page.getByRole('heading', { name: 'Graph Algorithms' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Breadth-First Search' })).toBeVisible();
    await expect(page.getByRole('heading', { name: "Dijkstra's Algorithm" })).toBeVisible();
  });

  test('should open graph visualizer', async ({ page }) => {
    await page.goto('/algorithms/graph/bfs');
    await expect(page.getByRole('heading', { name: 'Breadth-First Search' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
    await expect(page.getByText('Start node is A')).toBeVisible();
  });
});
