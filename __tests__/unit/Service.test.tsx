import { render, screen } from '@testing-library/react';

import ServiceSection from '@/components/shop/ServiceSection';

describe('Service', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<ServiceSection />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the correct text', () => {
    render(<ServiceSection />);
    const textLinks = [
      'Get your best looking smile now!',
      'Easy Wins',
      'Concrete',
      'Hack Growth',
      'Featured Products',
      'The Best Services',
      'Problems trying to resolve the conflict between',
      'Defalcate is most focused in helping you discover your most beautiful smile',
      'Overcame any hurdle or any other problem.',
    ];

    textLinks.forEach((title: string) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders the correct number of divs', () => {
    render(<ServiceSection />);
    const wrapper = screen.getByTestId('service-wrapper');
    const wrapperCount = screen.getAllByTestId('service-wrapper');
    expect(wrapper).toBeInTheDocument();
    expect(wrapperCount).toHaveLength(1);

    const headerItemsCount = screen.getAllByTestId('service-header-item');
    expect(headerItemsCount).toHaveLength(3);

    const body = screen.getByTestId('service-body');
    const bodyCount = screen.getAllByTestId('service-body');
    expect(body).toBeInTheDocument();
    expect(bodyCount).toHaveLength(1);

    const bodyItemCount = screen.getAllByTestId('service-body-item');
    expect(bodyItemCount).toHaveLength(3);
  });
});
