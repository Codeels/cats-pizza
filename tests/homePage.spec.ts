import { test, expect } from '@playwright/test';

test('check header', async ({ page }) => {
  const header = page.getByTestId('homePageHeader');

  await page.goto('');
  await expect(header).toBeVisible();
});
