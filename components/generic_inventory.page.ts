import { Locator, Page } from '@playwright/test';

class GenericInventory {
  private readonly page: Page;
  readonly listItem: Locator;
  readonly listItemName: Locator;
  readonly listItemPrice: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartItemCounter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.listItem = page.locator('//*[@data-test="inventory-item"]');
    this.listItemName = page.locator('//*[@data-test="inventory-item-name"]');
    this.listItemPrice = page.locator('//*[@data-test="inventory-item-price"]');
    this.shoppingCartLink = page.locator('//*[@data-test="shopping-cart-link"]');
    this.shoppingCartItemCounter = page.locator('//*[@data-test="shopping-cart-badge"]');
  }
}

export default GenericInventory;
