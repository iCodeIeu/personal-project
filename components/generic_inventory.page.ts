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
    this.header = page.locator('//*[@class="subheader"]');
    this.listItem = page.locator('//*[@class="inventory_item"]');
    this.listItemName = page.locator('//*[@class="inventory_item_name"]');
    this.listItemPrice = page.locator('//*[@class="inventory_item_price"]');
    this.shoppingCartLink = page.locator('//*[@id="shopping_cart_container"]//a');
    this.shoppingCartItemCounter = page.locator('//*[@class="fa-layers-counter shopping_cart_badge"]');
    this.addItem1 = page
      .locator('div')
      .filter({ hasText: /^\$29\.99ADD TO CART$/ })
      .getByRole('button');
    this.addItem2 = page
      .locator('div')
      .filter({ hasText: /^\$9\.99ADD TO CART$/ })
      .getByRole('button');
    this.addItem3 = page.getByRole('button', { name: 'ADD TO CART' }).first();
    this.addItem4 = page
      .locator('div')
      .filter({ hasText: /^\$49\.99ADD TO CART$/ })
      .getByRole('button');
    this.addItem5 = page
      .locator('div')
      .filter({ hasText: /^\$7\.99ADD TO CART$/ })
      .getByRole('button');
    this.addItem6 = page.getByRole('button', { name: 'ADD TO CART' });
    this.removeItem1 = page
      .locator('div')
      .filter({ hasText: /^\$29\.99REMOVE$/ })
      .getByRole('button');
    this.removeItem2 = page
      .locator('div')
      .filter({ hasText: /^\$9\.99REMOVE$/ })
      .getByRole('button');
    this.removeItem3 = page.getByRole('button', { name: 'REMOVE' }).first();
    this.removeItem4 = page
      .locator('div')
      .filter({ hasText: /^\$49\.99REMOVE$/ })
      .getByRole('button');
    this.removeItem5 = page
      .locator('div')
      .filter({ hasText: /^\$7\.99REMOVE$/ })
      .getByRole('button');
    this.removeItem6 = page
      .locator('div')
      .filter({ hasText: /^\$15\.99REMOVE$/ })
      .getByRole('button');
  }
}

export default GenericInventory;
