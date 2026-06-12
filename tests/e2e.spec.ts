import { test, expect } from '@playwright/test';

//авторизация
//регистрация
//оформление заказа через неавторизованного пользователя
//оформление заказа через авторизованного пользователя

test('Authorization', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByTestId('signInButton').click();
  await page.getByLabel('Email').fill('test@test.ru');
  await page.getByLabel('Пароль').fill('Qwerty');
  await page.getByTestId('signInUpModalButton').click();
  await expect(page.getByTestId('signOutButton')).toBeVisible();
});

test('Registration', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByTestId('signInButton').click();
  await page.getByTestId('signUpTab').click();
  await page.getByLabel('Имя').fill('Тест');
  await page.getByLabel('Email').fill(`${Date.now()}@email.com`);
  await page.getByLabel('Пароль:', { exact: true }).fill('asdf1234');
  await page.getByLabel('Повторите пароль:', { exact: true }).fill('asdf1234');
  await page.getByTestId('signInUpModalButton').click();
  await expect(page.getByTestId('signOutButton')).toBeVisible();
});

test('Order with unauthorized user', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByTestId('catCard_4').getByTestId('addToCartCardButton').click();
  await page.getByTestId('addToCartModalButton').click();
  await page.getByTestId('cartHeaderButton').click();
  await page.getByTestId('openCartButton').click();
  await page.getByTestId('checkoutButton').click();
  await page.getByLabel('Email').fill('test@test.ru');
  await page.getByLabel('Пароль').fill('Qwerty');
  await page.getByTestId('signInUpModalButton').click();
  await page.getByLabel('Город').fill('Москва');
  await page.getByLabel('Улица').fill('Первая');
  await page.getByLabel('Дом').fill('2');
  await page.getByLabel('Квартира').fill('3');
  await page.getByLabel('Комментарий курьеру').fill('Комментарий для курьера');
  await page.getByTestId('approveOrderModalButton').click();
  await page.getByTestId('closeOrderModalButton').click();
  await page.getByTestId('ordersHeaderButton').click();
  //await page.waitForTimeout(1000);
  //expect(await page.getByTestId('ordersList').getByRole('listitem').count()).toBeGreaterThan(0);
  await expect(page.getByTestId('ordersList').getByRole('listitem').first()).toBeVisible();
});

//TODO следующий тест с заранее авторизованным пользователем
