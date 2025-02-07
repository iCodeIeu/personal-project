import { test, expect } from '../../fixtures/fixtures';
import helpers, { UserRoles } from '../../pages/helpers.page';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('Accessibility Testing', () => {
  const role: UserRoles = 'standard_user';

  test.beforeEach(async ({ page, login }) => {
    await page.goto('/v1/index.html');
    await expect(login.usernameField).toBeVisible();
    await helpers.manualLogin(page, role);
  });

  test('Login page should meet WCAG 2.1 Level AA standards', { tag: ['@a11y', '@login'] }, async ({ page }) => {
    await page.goto('/v1/index.html');
    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Products page should be keyboard navigable', { tag: ['@a11y', '@products'] }, async ({ page }) => {
    await page.goto('/v1/inventory.html');
    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['keyboard']).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Cart page should meet color contrast requirements', { tag: ['@a11y', '@cart'] }, async ({ page, products }) => {
    await products.GenericInventory().addItem1.click();
    await page.goto('/v1/cart.html');
    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['color-contrast']).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Checkout form should have proper ARIA attributes', { tag: ['@a11y', '@checkout'] }, async ({ page, products }) => {
    await products.GenericInventory().addItem1.click();
    await page.goto('/v1/checkout-step-one.html');
    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['aria', 'forms']).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Overview page should be screen reader friendly', { tag: ['@a11y', '@overview'] }, async ({ page }) => {
    await helpers.completeSuccessfulPurchase(1, false, page);
    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['screen-reader', 'structure']).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Completion page should meet mobile accessibility standards', { tag: ['@a11y', '@completion'] }, async ({ page }) => {
    await helpers.completeSuccessfulPurchase(1, true, page);
    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['mobile', 'touch']).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // Additional specialized tests
  test('Check for proper heading structure', { tag: ['@a11y', '@structure'] }, async ({ page }) => {
    await page.goto('/v1/inventory.html');
    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['heading-order']).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Check for proper image alternatives', { tag: ['@a11y', '@images'] }, async ({ page }) => {
    await page.goto('/v1/inventory.html');
    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['image-alt']).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
