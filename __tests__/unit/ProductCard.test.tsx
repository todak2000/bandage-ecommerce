/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable testing-library/no-unnecessary-act */
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react';
import { useParams, usePathname } from 'next/navigation';
import { Provider, useSelector } from 'react-redux';

import ProductCard from '@/components/product/ProductCard';
import store from '@/store';
import type { ICart, IProducts } from '@/types';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: jest.fn(),
  useParams: jest.fn(),
}));
const queryClient = new QueryClient();

describe('ProductCard Component', () => {
  it('renders without crashing', async () => {
    const data = () => {
      const cartData: ICart[] = [];

      for (let i: number = 0; i < 5; i += 1) {
        cartData.push({
          id: i + 1,
          title: faker.lorem.sentence({ min: 1, max: 5 }),
          price: 10,
          quantity: 4,
          stock: faker.number.int({ min: 100, max: 999 }),
          thumbnail: faker.internet.avatar(),
        });
      }
      const productData: IProducts = {
        id: 1,
        title: faker.lorem.sentence({ min: 1, max: 5 }),
        price: faker.number.int({ min: 100, max: 999 }),
        rating: faker.number.int({ min: 1, max: 5 }),
        stock: faker.number.int({ min: 100, max: 999 }),
        thumbnail: faker.internet.avatar(),
        images: [faker.internet.avatar(), faker.internet.avatar()],
        brand: faker.lorem.text(),
        category: faker.lorem.sentence({ min: 10, max: 50 }),
        description: faker.lorem.sentence({ min: 10, max: 50 }),
        discountPercentage: faker.number.int({ min: 1, max: 30 }),
      };
      return { cartData, productData };
    };

    const cart: ICart[] = data().cartData;
    const product: IProducts = data().productData;
    const wish: ICart[] = data().cartData;
    const total: number = 300;

    (useSelector as unknown as jest.Mock).mockImplementation((callback) => {
      return callback({ cart, product, wish, total });
    });

    (usePathname as unknown as jest.Mock).mockReturnValue(
      `/product/${product.id}`,
    );

    (useParams as unknown as jest.Mock).mockReturnValue({ id: product.id });
    await act(async () => {
      render(
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ProductCard />
          </QueryClientProvider>
        </Provider>,
      );
    });

    const wrapperCount = await screen.findAllByTestId('card-wrapper');
    expect(wrapperCount).toHaveLength(2);

    const cardLinks = ['Home', 'Shop'];

    cardLinks.forEach((title: string) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
    const img = await screen.findAllByRole('link');
    expect(img).toHaveLength(2);

    const p = await screen.findAllByTestId('card-p');
    expect(p).toHaveLength(5);
    const stars = await screen.findAllByTestId('card-star');
    expect(stars).toHaveLength(5);

    const buttons = await screen.findAllByTestId('card-button');
    expect(buttons).toHaveLength(4);
  });
});
