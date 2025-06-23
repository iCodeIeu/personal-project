import { Locator, Page } from '@playwright/test';
import GenericInventory from '../components/generic_inventory.page';

export class Products {
  private readonly page: Page;
  readonly header: Locator;
  readonly profileId: string
  readonly sortByDropdown: Locator;
  readonly addItemtoCart: Locator;
  readonly removeItemFromCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByText('Products');
    this.sortByDropdown = page.getByRole('combobox');
    this.addItemtoCart = page.locator('//*[@data-test="inventory-item"]//button[contains(text(), "Add")]');
    this.removeItemFromCart = page.locator('//*[@data-test="inventory-item"]//button[contains(text(), "Remove")]');
  }

  GenericInventory() {
    return new GenericInventory(this.page);
  }

  logProfileId() {
    console.log(`Profile ID: ${this.profileId}`);
  }
}
