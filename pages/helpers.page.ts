import { Locator, Page, expect, ElementHandle } from '@playwright/test';
import { Products } from './products.page';
import { Cart } from './cart.page';
import { YourInfo, Overview } from './checkout.page';
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
    await expect(cart.GenericInventory().listItemName).toHaveCount(productNumber);
    await cart.checkoutButton.click();
    await expect(yourInfo.GenericInventory().header).toHaveText('Checkout: Your Information', { ignoreCase: true });
    await yourInfo.firstNameInput.fill(firstName || faker.person.firstName());
    await yourInfo.lastNameInput.fill(lastName || faker.person.lastName());
    await yourInfo.postcodeInput.fill(postcode || faker.location.zipCode('{{postcode}}'));
    await yourInfo.continueButton.click();
    await expect(overview.GenericInventory().header).toHaveText('Checkout: Overview', { ignoreCase: true });
    if (entireFlow === true) {
      await expect(overview.GenericInventory().listItemName).toHaveCount(productNumber);
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
  const products: ElementHandle<SVGElement | HTMLElement>[] = await page.$$('[class=inventory_item]');
  const productData = await Promise.all(
    products.map(async product => {
      const name = await product.$eval('[class=inventory_item_name]', el => el.textContent);
      const price = await product.$eval('[class=inventory_item_price]', el => el.textContent);
      return { name, price };
    })
  );
  const actualProducts = await Promise.all(
    products.map(async element => {
      const name = await element.$eval('[class=inventory_item_name]', el => el.textContent);
      const price = await element.$eval('[class=inventory_item_price]', el => el.textContent);
      return { name, price };
    })
  );

  // Sort the products based on the selected option
  const filteredProductData = productData.filter(product => product.name !== null && product.price !== null);
  const expectedProducts = sortProducts(filteredProductData, sortOption);

  console.log('Chosen Option?', sortOption);
  console.log('Expected Products (Sorted, Filtered):', expectedProducts);
  console.log('Actual Products (Extracted from DOM):', actualProducts);

  // Verify the order
  for (let i = 0; i < actualProducts.length; i++) {
    expect(actualProducts[i].name).toBe(expectedProducts[i].name);
    expect(actualProducts[i].price).toBe(expectedProducts[i].price);
  }
}
export function sortProducts(
  products: { name: string | null; price: string | null }[],
  sortOption: string
): { name: string | null; price: string | null }[] {
  switch (sortOption) {
    case 'az':
      return products.sort((a, b) => {
        if (a.name === null) return 1;
        if (b.name === null) return -1;
        return a.name?.localeCompare(b.name) || 0;
      });
    case 'za':
      return products.sort((a, b) => {
        if (a.name === null) return -1;
        if (b.name === null) return 1;
        return b.name?.localeCompare(a.name) || 0;
      });
    case 'hilo':
      return products.sort((a, b) => {
        const priceA = Number(a.price?.replace(/[^0-9.-]/g, '') || 0);
        const priceB = Number(b.price?.replace(/[^0-9.-]/g, '') || 0);
        return priceB - priceA;
      });
    case 'lohi':
      return products.sort((a, b) => {
        const priceA = Number(a.price?.replace(/[^0-9.-]/g, '') || 0);
        const priceB = Number(b.price?.replace(/[^0-9.-]/g, '') || 0);
        return priceA - priceB;
      });
    default:
      throw new Error('Invalid sort option');
  }
}

export default new Helpers();
