import { Locator, Page } from '@playwright/test';
import GenericInventory from '../components/generic_inventory.page';

export class Products {
  private readonly page: Page;
  readonly sortByDropdown: Locator;
  readonly addItemtoCart: Locator;
  readonly removeItemFromCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortByDropdown = page.locator('//*[@data-test="product-sort-container"]');
    this.addItemtoCart = page.locator('//*[@data-test="inventory-item"]//button[contains(text(), "Add")]');
    this.removeItemFromCart = page.locator('//*[@data-test="inventory-item"]//button[contains(text(), "Remove")]');
  }

  GenericInventory() {
    return new GenericInventory(this.page);
  }
}
