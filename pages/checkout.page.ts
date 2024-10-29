import { Locator, Page } from '@playwright/test';
import GenericInventory from '../components/generic_inventory.page';

export class YourInfo {
  private readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postcodeInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('//*[@data-test="firstName"]');
    this.lastNameInput = page.locator('//*[@data-test="lastName"]');
    this.postcodeInput = page.locator('//*[@data-test="postalCode"]');
    this.continueButton = page.locator('//*[@data-test="continue"]');
  }

  GenericInventory() {
    return new GenericInventory(this.page);
  }
}

export class Overview {
  private readonly page: Page;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.subtotal = page.locator('//*[@data-test="subtotal-label"]');
    this.tax = page.locator('//*[@data-test="tax-label"]');
    this.total = page.locator('//*[@data-test="total-label"]');
    this.finishButton = page.locator('//*[@data-test="finish"]');
  }
  GenericInventory() {
    return new GenericInventory(this.page);
  }
}

export class Completion {
  private readonly page: Page;
  readonly checkoutComplete: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutComplete = page.locator('//*[@data-test="checkout-complete-container"]');
  }
  GenericInventory() {
    return new GenericInventory(this.page);
  }
}
