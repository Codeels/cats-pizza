import { testAddress, testUsers } from '../data/testData';
import { test, expect } from '../../fixtures/app.fixture';

test.describe.serial('Ordering', () => {
  test.afterEach(async ({ cleanupApi }) => {
    cleanupApi.deleteOrderByEmail(testUsers.existing.email);
  });

  test('Order with unauthorized user', async ({ homePage, authPage, checkoutPage, ordersPage }) => {
    await homePage.open();
    await homePage.addFirstCatToCart();
    await homePage.goToCheckoutFromCart();
    await checkoutPage.signInInCheckout(testUsers.existing.email, testUsers.existing.password);
    await checkoutPage.fillAddress(testAddress);
    await checkoutPage.submit();
    await ordersPage.open();
    await ordersPage.assrtHasOrder();
  });

  test('Order with authorized user', async ({ homePage, authPage, checkoutPage, ordersPage }) => {
    await homePage.open();
    await authPage.signIn(testUsers.existing.email, testUsers.existing.password);
    await homePage.addFirstCatToCart();
    await homePage.goToCheckoutFromCart();
    await checkoutPage.fillAddress(testAddress);
    await checkoutPage.submit();
    await ordersPage.open();
    await ordersPage.assrtHasOrder();
  });
});
