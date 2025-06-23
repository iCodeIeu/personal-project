// import { chromium, FullConfig } from '@playwright/test';
// import helpers, { UserRoles } from '../pages/helpers.page';
// import { Login } from '../pages/login.page';

// async function globalSetup(config: FullConfig) {
//   const role: UserRoles = 'standard_user';
//   const browser = await chromium.launch();
//   const baseURL = 'https://www.saucedemo.com';
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   await page.goto(`${baseURL}/v1/index.html`);
//   const login = new Login(page);
//   await login.usernameField.waitFor({ state: 'visible' });
//   await helpers.manualLogin(page, role);
//   try {
//     await page.waitForURL(/.*inventory.html/, { waitUntil: 'networkidle', timeout: 10000 });
//     console.log('waitForURL successful!');
//     await page.screenshot({ path: 'wait-for-url-success.png', fullPage: true });
//   } catch (error) {
//     console.error('waitForURL failed:', error);
//     console.log('Current URL after timeout:', page.url());
//     await page.screenshot({ path: 'wait-for-url-failure.png', fullPage: true }); // Take a screenshot
//     throw error;
//   }
//   const path = require('path');
//   const authStatePath = path.join(__dirname, 'auth-state.json'); // Or wherever you want to save it
//   await context.storageState({ path: authStatePath });
//   await browser.close();
// }
// export default globalSetup;
