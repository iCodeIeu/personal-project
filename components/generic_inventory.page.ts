import { Locator, Page } from '@playwright/test';

class GenericInventory {
  private readonly page: Page;
  readonly header: Locator;
  readonly listItem: Locator;
  readonly listItemName: Locator;
  readonly listItemPrice: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartItemCounter: Locator;
  readonly addItem1: Locator;
  readonly addItem2: Locator;
  readonly addItem3: Locator;
  readonly addItem4: Locator;
  readonly addItem5: Locator;
  readonly addItem6: Locator;
  readonly removeItem1: Locator;
  readonly removeItem2: Locator;
  readonly removeItem3: Locator;
  readonly removeItem4: Locator;
  readonly removeItem5: Locator;
  readonly removeItem6: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('//*[@data-test="title"]');
    this.listItem = page.locator('//*[@data-test="inventory-item"]');
    this.listItemName = page.locator('//*[@data-test="inventory-item-name"]');
    this.listItemPrice = page.locator('//*[@data-test="inventory-item-price"]');
    this.shoppingCartLink = page.locator('//*[@data-test="shopping-cart-link"]');
    this.shoppingCartItemCounter = page.locator('//*[@data-test="shopping-cart-badge"]');
    this.addItem1 = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.addItem2 = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.addItem3 = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.addItem4 = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
    this.addItem5 = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]');
    this.addItem6 = page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]');
    this.removeItem1 = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.removeItem2 = page.locator('[data-test="remove-sauce-labs-bike-light"]');
    this.removeItem3 = page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]');
    this.removeItem4 = page.locator('[data-test="remove-sauce-labs-fleece-jacket"]');
    this.removeItem5 = page.locator('[data-test="remove-sauce-labs-onesie"]');
    this.removeItem6 = page.locator('[data-test="remove-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]');
  }
}

export default GenericInventory;
