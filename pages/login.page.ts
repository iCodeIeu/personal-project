import { Locator, Page } from '@playwright/test';

export class Login {
  private readonly page: Page;
  readonly saucelabsLogo: Locator;
  readonly usernameField: Locator;
  readonly usernameError: Locator;
  readonly passwordField: Locator;
  readonly passwordError: Locator;
  readonly sharedError: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.saucelabsLogo = page.getByRole('img');
    this.usernameField = page.locator('//*[@data-test="username"]');
    this.passwordField = page.locator('//*[@data-test="password"]');
    this.loginButton = page.getByRole('button', { name: 'LOGIN' });
  }
}
