import { test, expect } from '@playwright/test';

//авторизация
//регистрация
//оформление заказа через неавторизованного пользователя
//оформление заказа через авторизованного пользователя

const TEST_USER_EMAIL = 'test@test.ru';
const TEST_USER_PASSWORD = 'Qwerty';
const API_URL = 'http://localhost:5173';

test.describe('Auth', () => {
  let createdUserEmail: string | null = null;

  test.afterAll(async ({ request }) => {
    if (!createdUserEmail) return;

    await request.delete(`${API_URL}/api/users/by-email`, {
      data: { email: createdUserEmail },
    });

    createdUserEmail = null;
  });

  test('Authorization', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('signInButton').click();
    await page.getByLabel('Email').fill(TEST_USER_EMAIL);
    await page.getByLabel('Пароль').fill(TEST_USER_PASSWORD);
    await page.getByTestId('signInUpModalButton').click();
    await expect(page.getByTestId('signOutButton')).toBeVisible();
  });

  test('Registration', async ({ page }) => {
    createdUserEmail = `${Date.now()}@email.com`;

    await page.goto('http://localhost:5173/');
    await page.getByTestId('signInButton').click();
    await page.getByTestId('signUpTab').click();
    await page.getByLabel('Имя').fill('Тест');
    await page.getByLabel('Email').fill(createdUserEmail);
    await page.getByLabel('Пароль:', { exact: true }).fill('asdf1234');
    await page.getByLabel('Повторите пароль:', { exact: true }).fill('asdf1234');
    await page.getByTestId('signInUpModalButton').click();
    await expect(page.getByTestId('signOutButton')).toBeVisible();
  });
});

test.describe.serial('Ordering', () => {
  test.afterEach(async ({ request }) => {
    await request.delete(`${API_URL}/api/orders/by-email`, {
      data: { email: TEST_USER_EMAIL },
    });
  });

  test('Order with unauthorized user', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('catCard_4').getByTestId('addToCartCardButton').click();
    await page.getByTestId('addToCartModalButton').click();
    await page.getByTestId('cartHeaderButton').click();
    await page.getByTestId('openCartButton').click();
    await page.getByTestId('checkoutButton').click();
    await page.getByLabel('Email').fill(TEST_USER_EMAIL);
    await page.getByLabel('Пароль').fill(TEST_USER_PASSWORD);
    await page.getByTestId('signInUpModalButton').click();
    await page.getByLabel('Город').fill('Москва');
    await page.getByLabel('Улица').fill('Первая');
    await page.getByLabel('Дом').fill('2');
    await page.getByLabel('Квартира').fill('3');
    await page.getByLabel('Комментарий курьеру').fill('Комментарий для курьера');
    await page.getByTestId('approveOrderModalButton').click();
    await expect(page.getByTestId('modalTitle')).toContainText('Заказ оформлен');
    await page.getByTestId('closeOrderModalButton').click();
    await page.getByTestId('ordersHeaderButton').click();
    //await page.waitForTimeout(1000);
    //expect(await page.getByTestId('ordersList').getByRole('listitem').count()).toBeGreaterThan(0);
    await expect(page.getByTestId('ordersList').getByRole('listitem').first()).toBeVisible();
  });

  test('Order with authorized user', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('signInButton').click();
    await page.getByLabel('Email:').fill(TEST_USER_EMAIL);
    await page.getByLabel('Пароль:').fill(TEST_USER_PASSWORD);
    await page.getByTestId('signInUpModalButton').click();
    await page.getByTestId('catCard_4').getByTestId('addToCartCardButton').click();
    await page.getByTestId('addToCartModalButton').click();
    await page.getByTestId('cartHeaderButton').click();
    await page.getByTestId('openCartButton').click();
    await page.getByTestId('checkoutButton').click();
    await page.getByLabel('Город*:').fill('Москва');
    await page.getByLabel('Улица*:').fill('Тестовая');
    await page.getByLabel('Дом*:').fill('1');
    await page.getByLabel('Квартира:').fill('1');
    await page.getByLabel('Комментарий курьеру:').fill('комментарий для курьера');
    await page.getByTestId('approveOrderModalButton').click();
    await expect(page.getByTestId('modalTitle')).toContainText('Заказ оформлен');
    await page.getByTestId('closeOrderModalButton').click();
    await page.getByTestId('ordersHeaderButton').click();
    await expect(page.getByTestId('ordersList').getByRole('listitem').first()).toBeVisible();
  });
});
