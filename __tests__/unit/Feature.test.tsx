/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable testing-library/no-unnecessary-act */
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { Provider, useSelector } from 'react-redux';

import FeatureSection from '@/components/shop/FeatureSection';
import store from '@/store';
import type { IProducts } from '@/types';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: jest.fn(),
}));

const queryClient = new QueryClient();

describe('Feature Component', () => {
  it('renders without crashing for Home Screen and No Product', async () => {
    const products: IProducts[] = [];
    (usePathname as unknown as jest.Mock).mockReturnValue('/');

    (useSelector as unknown as jest.Mock).mockImplementation((callback) => {
      return callback({ products });
    });
    await act(async () => {
      render(
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <FeatureSection />
          </QueryClientProvider>
        </Provider>,
      );
    });
    const wrapper = await screen.findByTestId('feature-wrapper');
    const wrapperCount = await screen.findAllByTestId('feature-wrapper');
    expect(wrapper).toBeInTheDocument();
    expect(wrapperCount).toHaveLength(1);

    const header = await screen.findByTestId('feature-header');
    const headerCount = await screen.findAllByTestId('feature-header');
    expect(header).toBeInTheDocument();
    expect(headerCount).toHaveLength(1);

    const loader = await screen.findByTestId('grid-wrapper');
    expect(loader).toBeInTheDocument();
  });

  it('renders the correct header texts for Home Screen and No Product', async () => {
    (usePathname as unknown as jest.Mock).mockReturnValue('/');

    await act(async () => {
      render(
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <FeatureSection />
          </QueryClientProvider>
        </Provider>,
      );
    });

    const textLinks = [
      'Featured Products',
      'Problems trying to resolve the conflict between',
    ];
    textLinks.forEach((title: string) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders without crashing for Product Screen and with Product Data', async () => {
    const productData = () => {
      const data: IProducts[] = [];
      for (let i: number = 0; i < 5; i += 1) {
        data.push({
          id: i + 1,
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
        });
      }

      return data;
    };
    const products: IProducts[] = productData();
    (usePathname as unknown as jest.Mock).mockReturnValue(
      `/product/${products[0]?.id}`,
    );

    (useSelector as unknown as jest.Mock).mockImplementation((callback) => {
      return callback({ products });
    });
    await act(async () => {
      render(
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <FeatureSection />
          </QueryClientProvider>
        </Provider>,
      );
    });
    const wrapper = await screen.findByTestId('feature-wrapper');
    const wrapperCount = await screen.findAllByTestId('feature-wrapper');
    expect(wrapper).toBeInTheDocument();
    expect(wrapperCount).toHaveLength(1);

    const header = await screen.findByTestId('feature-header');
    const headerCount = await screen.findAllByTestId('feature-header');
    expect(header).toBeInTheDocument();
    expect(headerCount).toHaveLength(1);
    expect(await screen.findByText('Bestseller Products')).toBeInTheDocument();
  });
});
