import { render, screen } from '@testing-library/react';

import Sponsors from '@/components/product/Sponsors';

describe('Sponsors', () => {
  it('renders the correct number of sponsor icons', () => {
    render(<Sponsors />);
    const wrapper = screen.getByTestId('sponsor-wrapper');
    const wrapperCount = screen.getAllByTestId('sponsor-wrapper');
    expect(wrapper).toBeInTheDocument();
    expect(wrapperCount).toHaveLength(1);

    const itemsCount = screen.getAllByTestId('sponsor-item');
    expect(itemsCount).toHaveLength(5);
  });
});
