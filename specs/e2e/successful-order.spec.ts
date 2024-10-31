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
    await expect(products.header).toBeVisible();
    await expect(page).toHaveURL('/v1/inventory.html');
  });

  test('Should check the ability to sort products', { tag: ['@sorting'] }, async ({ page }) => {
    const productOptions = ['az', 'za', 'hilo', 'lohi'];
    const randomNumber = await helpers.generateRandomNumber(0, 3);
    await testSorting(page, productOptions[randomNumber]);
  });

  test('Should check the ability to add/remove products', { tag: ['@addRemove'] }, async ({ products }) => {
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
    await expect(products.GenericInventory().shoppingCartItemCounter).toHaveText('6');

    for (const i of [
      products.GenericInventory().removeItem1,
      products.GenericInventory().removeItem2,
      products.GenericInventory().removeItem3,
      products.GenericInventory().removeItem4,
      products.GenericInventory().removeItem5,
      products.GenericInventory().removeItem6,
    ]) {
      await i.click();
    }
    await expect(products.GenericInventory().shoppingCartItemCounter).toBeHidden();
  });

  test('Should check the checkout calculations are correct', { tag: ['@calculations'] }, async ({ page, overview }) => {
    await helpers.completeSuccessfulPurchase(6, false, page);
    const subtotal = await helpers.getDigits(overview.subtotal);
    const priceElements = await page.$$('[class=inventory_item_price]');
    const prices = await Promise.all(
      priceElements.map(async element => {
        const priceText = (await element.textContent()) ?? '';
        return parseFloat(priceText.replace('$', ''));
      })
    );
    const arrayTotal = prices.reduce((acc, price) => acc + price, 0);
    await expect(arrayTotal).toEqual(subtotal);

    const tax = await helpers.getDigits(overview.tax);
    const total = await helpers.getDigits(overview.total);
    await expect(subtotal + tax).toEqual(total);
  });

  test('Should check we can purchase products successfully', { tag: ['@e2ePurchase'] }, async ({ page, completion }) => {
    await helpers.completeSuccessfulPurchase(6, true, page);
    await expect(completion.checkoutComplete).toBeVisible();
  });
});
