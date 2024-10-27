import { Locator, Page } from '@playwright/test';

export class Login {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
