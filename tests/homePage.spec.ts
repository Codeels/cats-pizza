import { test, expect } from '@playwright/test';

test('check header', async ({ page }) => {
  const header = page.getByTestId('homePageHeader');

  await page.goto('');
  await expect(header).toBeVisible();
});

test('Check card list items', async ({ page }) => {
  await page.goto('');
  const firstCard = page.getByTestId('catCard_0');
  await expect(firstCard).toBeVisible();

  const cardListItems = page.getByTestId(/catCard/);
  expect(await cardListItems.count()).toBeGreaterThan(0);
});
