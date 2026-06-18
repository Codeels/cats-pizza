import { type Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/');
  }

  async addFirstCatToCart() {
    await this.page.getByTestId('catCard_4').getByTestId('addToCartCardButton').click();
    await this.page.getByTestId('addToCartModalButton').click();
  }

  async goToCheckoutFromCart() {
    await this.page.getByTestId('cartHeaderButton').click();
    await this.page.getByTestId('openCartButton').click();
    await this.page.getByTestId('checkoutButton').click();
  }
}
