import { testAddress, testUsers } from '../data/testData';
import { guestTest as test } from '../../fixtures/app.fixture';
import { CleanupApi } from '../api/CleanupAPI';

test.describe.serial('Ordering', () => {
  test.afterEach(async ({ request }) => {
    const cleanupApi = new CleanupApi(request);
    await cleanupApi.deleteOrderByEmail(testUsers.existing.email);
  });

  test('Order with unauthorized user', async ({ homePage, checkoutPage, ordersPage }) => {
    await homePage.open();
    await homePage.addFirstCatToCart();
    await homePage.goToCheckoutFromCart();
    await checkoutPage.signInInCheckout(testUsers.existing.email, testUsers.existing.password);
    await checkoutPage.fillAddress(testAddress);
    await checkoutPage.submit();
    await ordersPage.open();
    await ordersPage.assrtHasOrder();
  });
});
