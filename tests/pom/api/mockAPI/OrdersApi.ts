import { type Page } from '@playwright/test';
import { oneOrder, emptyOrder } from '../../mockData/orders';

export class OrdersApi {
  constructor(private page: Page) {
    this.page = page;
  }

  async setOrdersWithOneItem() {
    await this.page.route('*/**/api/orders', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify(oneOrder),
      });
    });
  }

  async setEmptyOrders() {
    await this.page.route('*/**/api/orders', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify(emptyOrder),
      });
    });
  }
}
