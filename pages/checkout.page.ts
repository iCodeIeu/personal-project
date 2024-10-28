import { Locator, Page } from '@playwright/test';

export class YourInfo {
  private readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postcodeInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('//*[@data-test="firstName"]');
    this.lastNameInput = page.locator('//*[@data-test="lastName"]');
    this.postcodeInput = page.locator('//*[@data-test="postalCode"]');
  }
}

export class Overview {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
