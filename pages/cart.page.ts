import { Locator, Page } from '@playwright/test';
import GenericInventory from '../components/generic_inventory.page';

export class Cart {
  private readonly page: Page;
  readonly header: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('//*[@data-test="title"]');
    this.checkoutButton = page.locator('//*[@data-test="checkout"]');
  }

  GenericInventory() {
    return new GenericInventory(this.page);
  }
}
