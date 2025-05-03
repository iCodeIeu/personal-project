import { test, expect } from '../../fixtures/fixtures';
import helpers, { testSorting, UserRoles } from '../../pages/helpers.page';

test.describe('E2E - Successful purchase', () => {
  const role: UserRoles = 'standard_user';

  test.beforeEach(async ({ page, login }) => {
    await page.goto('/v1/index.html');
    await expect(login.usernameField).toBeVisible();
    await helpers.manualLogin(page, role);
  });

  test('Should check the ability to login successfully', { tag: ['@login'] }, async ({ products, page }) => {
    const someProfileId = 'std1'
    const productsPage = products(someProfileId);
    productsPage.logProfileId();
    await expect(productsPage.header).toBeVisible();
    await expect(page).toHaveURL('/v1/inventory.html');
  });

  test('Should check the ability to sort products', { tag: ['@sorting'] }, async ({ page }) => {
    const productOptions: string[] = ['az', 'za', 'hilo', 'lohi'];
    const randomNumber: number = await helpers.generateRandomNumber(0, 3);
    await testSorting(page, productOptions[randomNumber]);
  });

  test('Should check the ability to add/remove products', { tag: ['@addRemove'] }, async ({ products }) => {
    const someProfileId = 'std2'
    const productsPage = products(someProfileId);
    productsPage.logProfileId();
    for (const i of [
      productsPage.GenericInventory().addItem1,
      productsPage.GenericInventory().addItem2,
      productsPage.GenericInventory().addItem3,
      productsPage.GenericInventory().addItem4,
      productsPage.GenericInventory().addItem5,
      productsPage.GenericInventory().addItem6,
    ]) {
      await i.click();
    }
    await expect(productsPage.GenericInventory().shoppingCartItemCounter).toHaveText('6');

    for (const i of [
      productsPage.GenericInventory().removeItem1,
      productsPage.GenericInventory().removeItem2,
      productsPage.GenericInventory().removeItem3,
      productsPage.GenericInventory().removeItem4,
      productsPage.GenericInventory().removeItem5,
      productsPage.GenericInventory().removeItem6,
    ]) {
      await i.click();
    }
    await expect(productsPage.GenericInventory().shoppingCartItemCounter).toBeHidden();
  });

  test('Should check the checkout calculations are correct', { tag: ['@calculations'] }, async ({ page, overview }) => {
    await helpers.completeSuccessfulPurchase(6, false, page);
    const subtotal: number = await helpers.getDigits(overview.subtotal);
    const priceElements = await page.$$('[class=inventory_item_price]');
    const prices: number[] = await Promise.all(
      priceElements.map(async element => {
        const priceText: string = (await element.textContent()) ?? '';
        return parseFloat(priceText.replace('$', ''));
      })
    );
    const arrayTotal: number = prices.reduce((acc, price) => acc + price, 0);
    await expect(arrayTotal).toEqual(subtotal);

    const tax: number = await helpers.getDigits(overview.tax);
    const total: number = await helpers.getDigits(overview.total);
    await expect(subtotal + tax).toEqual(total);
  });

  test('Should check we can purchase products successfully', { tag: ['@e2ePurchase'] }, async ({ page, completion }) => {
    await helpers.completeSuccessfulPurchase(6, true, page);
    await expect(completion.checkoutComplete).toBeVisible();
  });
});