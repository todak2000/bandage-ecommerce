/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable testing-library/no-unnecessary-act */
import { faker } from '@faker-js/faker';
import { act, render, screen } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';

import WishList from '@/components/wishList/WishList';
import store from '@/store';
import type { ICart } from '@/types';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('WishList Component', () => {
  it('renders without crashing when isWishListOpen = true', async () => {
    const wish: ICart[] = [];

    const isWishListOpen = true;

    (useSelector as unknown as jest.Mock).mockImplementation((callback) => {
      return callback({ wish, isWishListOpen });
    });
    await act(async () => {
      render(
        <Provider store={store}>
          <WishList />
        </Provider>,
      );
    });
    const wrapper = await screen.findByTestId('wishlist-wrapper');
    const wrapperCount = await screen.findAllByTestId('wishlist-wrapper');
    expect(wrapper).toBeInTheDocument();
    expect(wrapperCount).toHaveLength(1);

    const header = await screen.findByTestId('wishlist-header');
    const headerCount = await screen.findAllByTestId('wishlist-header');
    const headerText = await screen.findByText(/Wish List/i);
    expect(headerText).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(headerCount).toHaveLength(1);

    const body = await screen.findByTestId('wishlist-body');
    const bodyCount = await screen.findAllByTestId('wishlist-body');
    expect(body).toBeInTheDocument();
    expect(bodyCount).toHaveLength(1);
  });

  it('renders the correct number of Wish list data', async () => {
    const wishData = () => {
      const data: ICart[] = [];
      for (let i: number = 0; i < 5; i += 1) {
        data.push({
          id: i + 1,
          title: faker.lorem.sentence({ min: 1, max: 5 }),
          price: faker.number.int({ min: 100, max: 999 }),
          quantity: faker.number.int({ min: 10, max: 99 }),
          stock: faker.number.int({ min: 100, max: 999 }),
          thumbnail: faker.internet.avatar(),
        });
      }

      return data;
    };
    const wish = wishData();
    const isWishListOpen = true;

    (useSelector as unknown as jest.Mock).mockImplementation((callback) => {
      return callback({ wish, isWishListOpen });
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <WishList />
        </Provider>,
      );
    });

    const wishItems = await screen.findAllByTestId('wish-item');
    expect(wishItems).toHaveLength(5);
  });
});
