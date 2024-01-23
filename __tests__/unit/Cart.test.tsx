/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable testing-library/no-unnecessary-act */
import { faker } from '@faker-js/faker';
import { act, render, screen } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';

import Cart from '@/components/cart/Cart';
import store from '@/store';
import type { ICart } from '@/types';
import { currencyFormatter } from '@/utils';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('Cart Component', () => {
  it('renders without crashing when isCartOpen = true', async () => {
    const cart: ICart[] = [];

    const isCartOpen = true;

    (useSelector as unknown as jest.Mock).mockImplementation((callback) => {
      return callback({ cart, isCartOpen });
    });
    await act(async () => {
      render(
        <Provider store={store}>
          <Cart />
        </Provider>,
      );
    });
    const wrapper = await screen.findByTestId('cart-wrapper');
    const wrapperCount = await screen.findAllByTestId('cart-wrapper');
    expect(wrapper).toBeInTheDocument();
    expect(wrapperCount).toHaveLength(1);

    const header = await screen.findByTestId('cart-header');
    const headerCount = await screen.findAllByTestId('cart-header');
    const headerText = await screen.findByText(/Cart/i);
    expect(headerText).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(headerCount).toHaveLength(1);

    const body = await screen.findByTestId('cart-body');
    const bodyCount = await screen.findAllByTestId('cart-body');
    expect(body).toBeInTheDocument();
    expect(bodyCount).toHaveLength(1);
  });

  it('renders the correct number of Cart data', async () => {
    const cartData = () => {
      const data: ICart[] = [];
      for (let i: number = 0; i < 5; i += 1) {
        data.push({
          id: i + 1,
          title: faker.lorem.sentence({ min: 1, max: 5 }),
          price: 10,
          quantity: 4,
          stock: faker.number.int({ min: 100, max: 999 }),
          thumbnail: faker.internet.avatar(),
        });
      }
      const totall = data.reduce(
        (total: number, product: ICart) =>
          product?.price && product?.quantity
            ? total + product?.price * product?.quantity
            : 0,
        0,
      );
      return { data, totall };
    };
    const cart = cartData()?.data;
    const totall = cartData()?.totall;
    const isCartOpen = true;

    (useSelector as unknown as jest.Mock).mockImplementation((callback) => {
      return callback({ cart, isCartOpen });
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <Cart />
        </Provider>,
      );
    });

    const cartItems = await screen.findAllByTestId('cart-item');
    expect(cartItems).toHaveLength(5);
    const cartTotal = await screen.findByTestId('cart-total');
    expect(cartTotal).toHaveTextContent(
      currencyFormatter.format(Number(totall)),
    );
  });
});
