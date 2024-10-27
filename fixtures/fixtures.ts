import { test as base } from '@playwright/test';
import { Login } from '../pages/login.page';
import { Products } from '../pages/products.page';
import { YourInfo, Overview } from '../pages/checkout.page';

type Fixtures = {
  login: Login;
  products: Products;
  yourInfo: YourInfo;
  overview: Overview;
};

export const test = base.extend<Fixtures>({
  login: async ({ page }, use) => {
    const login = new Login(page);
    await use(login);
  },

  products: async ({ page }, use) => {
    const products = new Products(page);
    await use(products);
  },

  yourInfo: async ({ page }, use) => {
    const yourInfo = new YourInfo(page);
    await use(yourInfo);
  },

  overview: async ({ page }, use) => {
    const overview = new Overview(page);
    await use(overview);
  },
});

export { expect } from '@playwright/test';
