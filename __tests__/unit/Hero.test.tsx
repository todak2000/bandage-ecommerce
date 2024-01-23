/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable testing-library/no-unnecessary-act */
import { faker } from '@faker-js/faker';
import { act, render, screen } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';

import HeroSection from '@/components/shop/HeroSection';
import store from '@/store';
import type { IProducts } from '@/types';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('Hero Component', () => {
  it('renders without crashing', async () => {
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

    (useSelector as unknown as jest.Mock).mockImplementation((callback) => {
      return callback({ products });
    });
    await act(async () => {
      render(
        <Provider store={store}>
          <HeroSection />
        </Provider>,
      );
    });
    const wrapper = await screen.findByTestId('hero-wrapper');
    const wrapperCount = await screen.findAllByTestId('hero-wrapper');
    const linkTextCount = await screen.findAllByText(/Read More/i);
    const textCount = await screen.findAllByTestId('hero-text');
    const linkCount = await screen.findAllByTestId('hero-link');
    const imgCount = await screen.findAllByTestId('hero-img');
    expect(wrapper).toBeInTheDocument();
    expect(wrapperCount).toHaveLength(1);
    expect(textCount).toHaveLength(8);
    expect(linkTextCount).toHaveLength(4);
    expect(linkCount).toHaveLength(4);
    expect(imgCount).toHaveLength(4);
  });
});
