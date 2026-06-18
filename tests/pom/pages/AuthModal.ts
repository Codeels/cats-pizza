import { type Page, expect } from '@playwright/test';

export class AuthModal {
  constructor(private page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.getByTestId('signInButton').click();
  }

  async signIn(email: string, password: string) {
    await this.open();
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Пароль').fill(password);
    await this.page.getByTestId('signInUpModalButton').click();
  }

  async signUp(name: string, email: string, password: string) {
    await this.open();
    await this.page.getByTestId('signUpTab').click();
    await this.page.getByLabel('Имя').fill(name);
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Пароль:', { exact: true }).fill(password);
    await this.page.getByLabel('Повторите пароль:', { exact: true }).fill(password);
    await this.page.getByTestId('signInUpModalButton').click();
  }

  async assertSignedIn() {
    await expect(this.page.getByTestId('signOutButton')).toBeVisible();
  }
}
