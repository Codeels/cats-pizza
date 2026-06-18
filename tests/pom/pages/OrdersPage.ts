import { type Page, expect } from '@playwright/test';

export class OrdersPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.getByTestId('ordersHeaderButton').click();
  }

  async assrtHasOrder() {
    await expect(this.page.getByTestId('ordersList').getByRole('listitem').first()).toBeVisible();
  }
}
