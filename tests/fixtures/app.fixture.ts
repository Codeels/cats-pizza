/* eslint-disable react-hooks/rules-of-hooks */
import { test as base } from '@playwright/test';
import { HomePage } from '../pom/pages/HomePage';
import { AuthModal } from '../pom/pages/AuthModal';
import { CheckoutPage } from '../pom/pages/CheckoutPage';
import { OrdersPage } from '../pom/pages/OrdersPage';
import { CartPage } from '../pom/pages/CartPage';
import process from 'process';
import path from 'path';
//import { CleanupApi } from '../pom/api/CleanupAPI';

// Declare the types of your fixtures.
type MyFixtures = {
  homePage: HomePage;
  authPage: AuthModal;
  checkoutPage: CheckoutPage;
  ordersPage: OrdersPage;
  cartPage: CartPage;
  //cleanupApi: CleanupApi;
};

type AppOptions = {
  storageState: string | undefined;
};

//константа для сохранения данных из localStorage
export const authFile = path.join(process.cwd(), 'playwright/.auth/existing-user.json');

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
const appTest = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    // Set up the fixture.
    const homePage = new HomePage(page);

    // Use the fixture value in the test.
    await use(homePage);

    // Clean up the fixture.
  },

  authPage: async ({ page }, use) => {
    await use(new AuthModal(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  ordersPage: async ({ page }, use) => {
    await use(new OrdersPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  /*,
  cleanupApi: async ({ request }, use) => {
    await use(new CleanupApi(request));
  },*/
});

export const guestTest = appTest;
export const authorizedTest = appTest.extend<AppOptions>({
  storageState: authFile,
});
export { expect } from '@playwright/test';
