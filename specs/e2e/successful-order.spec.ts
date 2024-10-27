import { test, expect } from '../../fixtures/fixtures';
import helpers, { testSorting } from '../../pages/helpers.page';

test.describe('E2E - Successful purchase', () => {
  const standardUser = 'standard_user';
  const password = 'secret_sauce';
  test.beforeEach(async ({ page, login }) => {
    await page.goto('/');
    await expect(login.usernameField).toBeVisible();
  });

  test('Verify the core functionalites of the purchase flow', { tag: ['@e2ePurchase'] }, async ({ login, products, page }) => {
    await test.step('Should check the ability to login', async () => {
      await login.usernameField.fill(standardUser);
      await login.passwordField.fill(password);
      await login.loginButton.click();
      await expect(products.header).toBeVisible();
      await expect(page).toHaveURL('/inventory.html');
    });

    await test.step('Should check the ability to sort ', async () => {
      const productOptions = ['az', 'za', 'hilo', 'lohi'];
      const randomNumber = await helpers.generateRandomNumber(0, 3);
      await testSorting(page, productOptions[randomNumber]);
    });
  });
});
