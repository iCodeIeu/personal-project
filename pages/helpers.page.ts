import { Locator, Page, expect } from '@playwright/test';
import { Products } from './products.page';
import { Cart } from './cart.page';
import { YourInfo, Overview } from './checkout.page';

export class Helpers {
  async generateRandomNumber(min: number, max: number): Promise<number> {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async completeSuccessfulPurchase(
    productNumber: number & { max: 6 },
    page: Page,
    firstName?: string,
    lastName?: string,
    postcode?: string
  ) {
    const products = new Products(page);
    const cart = new Cart(page);
    const yourInfo = new YourInfo(page);
    const overview = new Overview(page);
    const addButtons = page.$$(products.addItemtoCart.toString());
    for (let i = 0; i < productNumber; i++) {
      await addButtons[i].click();
    }
    await expect(products.shoppingCartItemCounter).toHaveText(String(productNumber));
    await products.shoppingCartLink.click();
    await expect(cart.header).toHaveText('Your Cart', { ignoreCase: true });
    await expect(cart.GenericInventory().listItem).toHaveCount(productNumber);
    await cart.checkoutButton.click();
    await yourInfo.firstNameInput.fill(firstName ?? '');
    await yourInfo.lastNameInput.fill(lastName ?? '');
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
