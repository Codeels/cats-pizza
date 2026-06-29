import { type Page, expect } from '@playwright/test';
import { OrdersApi } from '../api/mockAPI/OrdersApi';
import { AuthApi } from '../api/mockAPI/AuthApi';

export class OrdersPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async setApiWithOneItem() {
    const orders = new OrdersApi(this.page);
    const authApi = new AuthApi(this.page);

    await authApi.setupAuth();
    await orders.setOrdersWithOneItem();
  }

  async setApiEmptyItems() {
    const orders = new OrdersApi(this.page);
    const authApi = new AuthApi(this.page);

    await authApi.setupAuth();
    await orders.setEmptyOrders();
  }

  async open() {
    await this.page.getByTestId('ordersHeaderButton').click();
  }

  async openPage() {
    await this.page.goto('/orders');
  }

  async assertHasOrder() {
    await expect(this.page.getByTestId('ordersList').getByRole('listitem').first()).toBeVisible();
  }

  async assertHasCorrectPageViewWithOneOrder() {
    await expect(this.page).toHaveScreenshot('ordersListWithOneItem.png');
  }

  async assertHasCorrectPageViewEmptyOrdersList() {
    await expect(this.page).toHaveScreenshot('ordersEmptyList.png');
  }
}
