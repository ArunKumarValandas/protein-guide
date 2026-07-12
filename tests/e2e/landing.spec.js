import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should load and display hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/AlgoVision Pro/);
    await expect(page.getByRole('heading', { name: /Visualize Algorithms/i })).toBeVisible();
  });

  test('should navigate to dashboard', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Start Learning/i }).first().click();
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });
});

test.describe('Sorting', () => {
  test('should display sorting algorithms', async ({ page }) => {
    await page.goto('/algorithms/sorting');
    await expect(page.getByRole('heading', { name: 'Sorting Algorithms' })).toBeVisible();
    await expect(page.getByText('Bubble Sort')).toBeVisible();
    await expect(page.getByText('Quick Sort')).toBeVisible();
  });

  test('should open bubble sort visualizer', async ({ page }) => {
    await page.goto('/algorithms/sorting');
    await page.getByText('Bubble Sort').click();
    await expect(page).toHaveURL(/bubble-sort/);
    await expect(page.getByRole('heading', { name: 'Bubble Sort' })).toBeVisible();
  });
});
