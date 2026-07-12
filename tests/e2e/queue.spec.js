import { expect, test } from '@playwright/test';

test.describe('Queues', () => {
  test('should display queue variants', async ({ page }) => {
    await page.goto('/algorithms/queue');
    await expect(page.getByRole('heading', { name: 'Queues' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Circular Queue' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Priority Queue' })).toBeVisible();
  });

  test('should open queue visualizer', async ({ page }) => {
    await page.goto('/algorithms/queue/queue/enqueue');
    await expect(page.getByRole('heading', { name: /Queue - Enqueue/i })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
    await expect(page.getByLabel('Queue Values')).toBeVisible();
  });
});
