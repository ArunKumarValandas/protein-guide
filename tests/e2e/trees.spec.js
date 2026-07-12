import { expect, test } from '@playwright/test';

test.describe('Trees', () => {
  test('should display tree algorithms', async ({ page }) => {
    await page.goto('/algorithms/trees');
    await expect(page.getByRole('heading', { name: 'Trees' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'BST Insert' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Inorder Traversal' })).toBeVisible();
  });

  test('should open tree visualizer', async ({ page }) => {
    await page.goto('/algorithms/trees/bst-insert');
    await expect(page.getByRole('heading', { name: 'BST Insert' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
    await expect(page.getByLabel('BST Values')).toBeVisible();
  });
});
