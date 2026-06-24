import { request } from '@playwright/test';
import { guestTest as test, expect } from '../../fixtures/app.fixture';
import { CleanupApi } from '../api/CleanupAPI';
import { testUsers } from '../data/testData';

test.describe('Auth', () => {
  let createdUserEmail: string | null = null;

  test.afterAll(async ({ request }) => {
    if (!createdUserEmail) return;

    const cleanupApi = new CleanupApi(request);

    await cleanupApi.deleteUserByEmail(createdUserEmail);

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
