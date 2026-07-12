import { expect, test } from '@playwright/test';

test.describe('Stack', () => {
  test('should display stack operations', async ({ page }) => {
    await page.goto('/algorithms/stack');
    await expect(page.getByRole('heading', { name: 'Stack' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Push Add an element/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Pop Remove and return/i })).toBeVisible();
  });

  test('should open stack visualizer', async ({ page }) => {
    await page.goto('/algorithms/stack/push');
    await expect(page.getByRole('heading', { name: 'Push' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
    await expect(page.getByLabel('Stack Values')).toBeVisible();
  });
});
