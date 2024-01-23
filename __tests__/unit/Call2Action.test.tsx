import { render, screen } from '@testing-library/react';

import CallToActionSection from '@/components/shop/CallToActionSection';

describe('Call2Action', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<CallToActionSection />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the correct text', () => {
    render(<CallToActionSection />);
    const textLinks = [
      'Designing Better Experience',
      'Problems trying to resolve the conflict between',
      'Problems trying to resolve the conflict between the two major realms of Classical physics:',
    ];

    textLinks.forEach((title: string) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders the correct number of divs', () => {
    render(<CallToActionSection />);
    const wrapper = screen.getByTestId('call-wrapper');
    const wrapperCount = screen.getAllByTestId('call-wrapper');
    expect(wrapper).toBeInTheDocument();
    expect(wrapperCount).toHaveLength(1);
    const itemsCount = screen.getAllByTestId('call-item');
    expect(itemsCount).toHaveLength(4);

    const button = screen.getByTestId('call-button');
    const buttonCount = screen.getAllByTestId('call-button');
    expect(button).toBeInTheDocument();
    expect(buttonCount).toHaveLength(1);
  });
});
