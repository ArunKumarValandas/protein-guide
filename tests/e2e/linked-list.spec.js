import { expect, test } from '@playwright/test';

test.describe('Linked Lists', () => {
  test('should display linked-list operations', async ({ page }) => {
    await page.goto('/algorithms/linked-list');
    await expect(page.getByRole('heading', { name: 'Linked Lists' })).toBeVisible();
    await expect(page.getByText('Singly Linked List')).toBeVisible();
    await expect(page.getByText('Insert').first()).toBeVisible();
  });

  test('should open linked-list visualizer', async ({ page }) => {
    await page.goto('/algorithms/linked-list/singly/insert');
    await expect(page.getByRole('heading', { name: /Singly Linked List - Insert/i })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
    await expect(page.getByLabel('Node Values')).toBeVisible();
  });
});
