import { expect, type Page } from '@playwright/test';
import { CatsApi } from '../api/mockAPI/CatsApi';
import { CartApi } from '../api/mockAPI/СartApi';

export class HomePage {
  constructor(private page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/');
  }

  async setupApiEmptyCart() {
    const catsApi = new CatsApi(this.page);
    const cartApi = new CartApi(this.page);

    await catsApi.setCatsItems();
    await cartApi.setEmptyCart();
  }

  async setupApiCartWithItem() {
    const catsApi = new CatsApi(this.page);
    const cartApi = new CartApi(this.page);

    await catsApi.setCatsItems();
    await cartApi.setCartWithOneItem();
  }

  /*
FUNCTIONS
  */
  async addFirstCatToCart() {
    await this.openItemDetailModal();
    await this.page.getByTestId('addToCartModalButton').click();
  }
  private getModalLocator() {
    return this.page.getByTestId('modal');
  }

  private getCartDrawerLocator() {
    return this.page.getByTestId('cartDrawer');
  }

  async openItemDetailModal() {
    await this.page.getByTestId('catCard_0').getByTestId('addToCartCardButton').click();
  }

  async openCart() {
    await this.page.getByTestId('cartHeaderButton').click();
  }

  async goToCartPage() {
    await this.page.getByTestId('cartHeaderButton').click();
  }

  async goToCheckoutFromCart() {
    await this.goToCartPage();
    await this.openCart();
    await this.page.getByTestId('checkoutButton').click();
  }

  /*
ASSERTS
  */
  async assertLoaded() {
    await expect(this.page).toHaveURL('/');
    await expect(this.page.getByTestId('header')).toBeVisible();
  }

  async assertCardsVisible() {
    const cards = this.page.getByTestId(/catCard_/);
    await expect(cards.first()).toBeVisible();
    await expect(cards).toHaveCount(9);
  }

  async assertCartBadgeCount(count: number) {
    await expect(this.page.getByTestId('cartHeaderButton')).toContainText(`${count}`);
  }

  async assertCartPageOpened() {
    await expect(this.page).toHaveURL(/\/cart/);
    await expect(this.page.getByRole('heading', { name: 'Корзина' })).toBeVisible();
  }

  async assertCorrectPageViewWithItems() {
    await expect(this.page).toHaveScreenshot('homePageWithItems.png');
  }

  async assertCorrectPageViewWithOpenDetailModal() {
    await expect(this.getModalLocator()).toHaveScreenshot('detailItemModal.png');
  }

  async assertCorrectPageViewWithOpenCartEmptyDrawer() {
    await expect(this.getCartDrawerLocator()).toHaveScreenshot('cartEmptyDrawer.png');
  }

  async assertCorrectPageViewWithOpenCartDrawerWithOneItem() {
    await expect(this.getCartDrawerLocator()).toHaveScreenshot('cartDrawerWithOneItem.png');
  }
}
