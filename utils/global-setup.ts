import { chromium, FullConfig, BrowserContext } from '@playwright/test';
import helpers, { UserRoles } from '../pages/helpers.page';
import { Login } from '../pages/login.page';

async function globalSetup(config: FullConfig) {
  const role: UserRoles = 'standard_user';
  const browser = await chromium.launch();
  const context: BrowserContext = await browser.newContext({
    baseURL: 'https://www.saucedemo.com/v1',
  });
  const page = await context.newPage();
  await page.goto('/index.html');
  const login = new Login(page);
  await login.usernameField.waitFor({ state: 'visible' });
  await helpers.manualLogin(page, role);
  if (!page.url().includes('/v1/')) {
    await page.goto('/v1/inventory.html');
  }
  await context.storageState({ path: 'auth-state.json' });
  await browser.close();
}

export default globalSetup;
