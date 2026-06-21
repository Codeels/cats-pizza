import { test, expect } from '../../fixtures/app.fixture';
import { testUsers } from '../data/testData';

test.describe('Auth', () => {
  let createdUserEmail: string | null = null;

  test.afterAll(async ({ cleanupApi }) => {
    if (!createdUserEmail) return;

    cleanupApi.deleteUserByEmail(createdUserEmail);

    createdUserEmail = null;
  });

  test('Authorization', async ({ homePage, authPage }) => {
    await homePage.open();
    await homePage.assertLoaded();
    await authPage.signIn(testUsers.existing.email, testUsers.existing.password);
    await authPage.assertSignedIn();
  });

  test('Registration', async ({ homePage, authPage }) => {
    createdUserEmail = `${Date.now()}@email.com`;
    await homePage.open();
    await homePage.assertLoaded();
    await authPage.signUp('Test', createdUserEmail, testUsers.existing.password);
    await authPage.assertSignedIn();
  });
});
