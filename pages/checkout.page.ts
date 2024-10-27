import { Locator, Page } from '@playwright/test';

export class YourInfo {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}

export class Overview {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
