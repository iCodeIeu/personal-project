import { test as base } from '@playwright/test';
import { Login } from '../pages/login.page';
import { Products } from '../pages/products.page';
import { Cart } from '../pages/cart.page';
import { YourInfo, Overview, Completion } from '../pages/checkout.page';

type Fixtures = {
  login: Login;
  products: Products;
  cart: Cart;
  yourInfo: YourInfo;
  overview: Overview;
  completion: Completion;
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

  cart: async ({ page }, use) => {
    const cart = new Cart(page);
    await use(cart);
  },

  yourInfo: async ({ page }, use) => {
    const yourInfo = new YourInfo(page);
    await use(yourInfo);
  },

  overview: async ({ page }, use) => {
    const overview = new Overview(page);
    await use(overview);
  },

  completion: async ({ page }, use) => {
    const completion = new Completion(page);
    await use(completion);
  },
});

export { expect } from '@playwright/test';
