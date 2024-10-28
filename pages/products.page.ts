import { Locator, Page } from '@playwright/test';
import GenericInventory from '../components/generic_inventory.page';

export class Products {
  private readonly page: Page;
  readonly header: Locator;
  readonly sortByDropdown: Locator;
  readonly addItemtoCart: Locator;
  readonly removeItemFromCart: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartItemCounter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByText('Products');
    this.sortByDropdown = page.locator('//*[@data-test="product-sort-container"]');
    this.addItemtoCart = page.locator('//*[@data-test="inventory-item"]//button[contains(text(), "Add")]');
    this.removeItemFromCart = page.locator('//*[@data-test="inventory-item"]//button[contains(text(), "Remove")]');
    this.shoppingCartLink = page.locator('//*[@data-test="shopping-cart-link"]');
    this.shoppingCartItemCounter = page.locator('//*[@data-test="shopping-cart-badge"]');
  }

  GenericInventory() {
    return new GenericInventory(this.page);
  }
}
