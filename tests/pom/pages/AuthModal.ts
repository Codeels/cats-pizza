import { type Page, expect } from '@playwright/test';

export class AuthModal {
  constructor(private page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.getByTestId('signInButton').click();
  }

  private getModalLocator() {
    return this.page.getByTestId('modal');
  }

  async signIn(email: string, password: string) {
    await this.open();
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Пароль').fill(password);
    await this.page.getByTestId('signInUpModalButton').click();
  }

  async signUp(name: string, email: string, password: string) {
    await this.open();
    await this.openRegisterButton();
    await this.page.getByLabel('Имя').fill(name);
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Пароль:', { exact: true }).fill(password);
    await this.page.getByLabel('Повторите пароль:', { exact: true }).fill(password);
    await this.page.getByTestId('signInUpModalButton').click();
  }

  async openRegisterButton() {
    await this.page.getByTestId('signUpTab').click();
  }

  async assertSignedIn() {
    await expect(this.page.getByTestId('signOutButton')).toBeVisible();
  }

  async assertError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async assertSignInModalHasCorrectView() {
    await expect(this.getModalLocator()).toHaveScreenshot('signInModal.png');
  }

  async assertSignUpModalHasCorrectView() {
    await expect(this.getModalLocator()).toHaveScreenshot('signUpModal.png');
  }
}
