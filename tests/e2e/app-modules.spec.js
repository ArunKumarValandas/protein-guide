import { expect, test } from '@playwright/test';

test.describe('App Modules', () => {
  test('should open comparison mode', async ({ page }) => {
    await page.goto('/compare');
    await expect(page.getByRole('heading', { name: 'Comparison Mode' })).toBeVisible();
  });

  test('should open benchmark mode', async ({ page }) => {
    await page.goto('/benchmark');
    await expect(page.getByRole('heading', { name: 'Benchmark Mode' })).toBeVisible();
  });

  test('should open quiz', async ({ page }) => {
    await page.goto('/quiz');
    await expect(page.getByRole('heading', { name: 'Quiz' })).toBeVisible();
  });

  test('should open practice', async ({ page }) => {
    await page.goto('/practice');
    await expect(page.getByRole('heading', { name: 'Practice' })).toBeVisible();
  });

  test('should open achievements', async ({ page }) => {
    await page.goto('/achievements');
    await expect(page.getByRole('heading', { name: 'Achievements' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Local Leaderboard' })).toBeVisible();
  });
});
