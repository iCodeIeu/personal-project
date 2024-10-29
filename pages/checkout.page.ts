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
    this.continueButton = page.getByRole('button', { name: 'CONTINUE' });
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
    this.subtotal = page.locator('//*[@class="summary_subtotal_label"]');
    this.tax = page.locator('//*[@class="summary_tax_label"]');
    this.total = page.locator('//*[@class="summary_total_label"]');
    this.finishButton = page.getByRole('link', { name: 'FINISH' });
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
    this.checkoutComplete = page.locator('//*[@id="checkout_complete_container"]');
  }
  GenericInventory() {
    return new GenericInventory(this.page);
  }
}
