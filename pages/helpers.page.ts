import { Locator, Page, expect } from '@playwright/test';
import { Products } from './products.page';
import { Cart } from './cart.page';
import { YourInfo, Overview, Completion } from './checkout.page';
import { faker } from '@faker-js/faker';

export class Helpers {
  async getDigits(selector: Locator) {
    return Number(((await selector.textContent()) ?? '').match(/\d+.\d+|\d+/));
  }

  async generateRandomNumber(min: number, max: number): Promise<number> {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async completeSuccessfulPurchase(
    productNumber: number,
    entireFlow: boolean,
    page: Page,
    firstName?: string,
    lastName?: string,
    postcode?: string
  ) {
    const products = new Products(page);
    const cart = new Cart(page);
    const yourInfo = new YourInfo(page);
    const overview = new Overview(page);
    const completion = new Completion(page);
    for (const i of [
      products.GenericInventory().addItem1,
      products.GenericInventory().addItem2,
      products.GenericInventory().addItem3,
      products.GenericInventory().addItem4,
      products.GenericInventory().addItem5,
      products.GenericInventory().addItem6,
    ]) {
      await i.click();
    }
    await expect(products.GenericInventory().shoppingCartItemCounter).toHaveText(String(productNumber));
    await products.GenericInventory().shoppingCartLink.click();
    await expect(cart.GenericInventory().header).toHaveText('Your Cart', { ignoreCase: true });
    await expect(cart.GenericInventory().listItem).toHaveCount(productNumber);
    await cart.checkoutButton.click();
    await expect(yourInfo.GenericInventory().header).toHaveText('Checkout: Your Information', { ignoreCase: true });
    await yourInfo.firstNameInput.fill(firstName || faker.person.firstName());
    await yourInfo.lastNameInput.fill(lastName || faker.person.lastName());
    await yourInfo.postcodeInput.fill(postcode || faker.location.zipCode('{{postcode}}'));
    await yourInfo.continueButton.click();
    await expect(overview.GenericInventory().header).toHaveText('Checkout: Overview', { ignoreCase: true });
    if (entireFlow === true) {
      await expect(overview.GenericInventory().listItem).toHaveCount(productNumber);
      await overview.finishButton.click();
    } else {
      await expect(overview.total).toBeVisible();
    }
  }
}

export async function testSorting(page: Page, sortOption: string) {
  const productsPage = new Products(page);

  // Select the sort option
  await productsPage.sortByDropdown.selectOption(sortOption);

  // Extract product information
  const products = await page.$$eval('//*[@data-test="inventory-item"]', products =>
    products.map(product => ({
      name: product.querySelector('[data-test=inventory-item-name]')?.textContent ?? '',
      price: product.querySelector('[data-test=inventory-item-price]')?.textContent ?? '',
    }))
  );

  // Sort the products based on the selected option
  const sortedProducts = sortProducts(products, sortOption);

  console.log('Chosen Option?', sortOption);
  console.log('Product Array', products);

  // Verify the order
  for (let i = 0; i < products.length; i++) {
    expect(products[i].name).toBe(sortedProducts[i].name);
    expect(products[i].price).toBe(sortedProducts[i].price);
  }
}

export function sortProducts(products: { name: string; price: string }[], sortOption: string): { name: string; price: string }[] {
  switch (sortOption) {
    case 'az':
      return products.sort((a, b) => a.name.localeCompare(b.name));
    case 'za':
      return products.sort((a, b) => b.name.localeCompare(a.name));
    case 'hilo':
      return products.sort((a, b) => Number(b.price.replace(/[^0-9.-]/g, '')) - Number(a.price.replace(/[^0-9.-]/g, '')));
    case 'lohi':
      return products.sort((a, b) => Number(a.price.replace(/[^0-9.-]/g, '')) - Number(b.price.replace(/[^0-9.-]/g, '')));
    default:
      throw new Error('Invalid sort option');
  }
}

export default new Helpers();
