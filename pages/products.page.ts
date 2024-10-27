import { Locator, Page } from '@playwright/test';

export class Products {
  private readonly page: Page;
  readonly header: Locator;
  readonly sortByDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByText('Products');
    this.sortByDropdown = page.locator('//*[@data-test="product-sort-container"]');
  }
}
