import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';

import ProductTab from '@/components/product/ProductTab';

describe('ProductTab', () => {
  it('renders loading if laoding is true', () => {
    render(<ProductTab productImage={faker.internet.avatar()} loading />);

    const loaders = screen.getAllByTestId('block-wrapper');

    expect(loaders).toHaveLength(5);
  });

  it('renders Product tab when loading is false', () => {
    render(
      <ProductTab productImage={faker.internet.avatar()} loading={false} />,
    );
    const description = screen.getByText('Description');
    expect(description).toBeInTheDocument();

    const info = screen.getByText('Additional Information');
    expect(info).toBeInTheDocument();

    const header = screen.getByTestId('tab-body-header');
    const headerCount = screen.getAllByTestId('tab-body-header');
    expect(header).toBeInTheDocument();
    expect(headerCount).toHaveLength(1);

    const p = screen.getAllByTestId('tab-body-p');
    expect(p).toHaveLength(3);

    const img = screen.getAllByTestId('tab-img');
    expect(img).toHaveLength(1);
  });
});
