import { render, screen } from '@testing-library/react';

import Banner from '../../src/templates/Banner';

describe('Banner', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Banner />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the correct footer text links', () => {
    render(<Banner />);
    const textLinks = [
      'Follow Us:',
      'Follow Us and get a chance to win 80% off',
      'michelle.rivera@example.com',
      '(225) 555-0118',
    ];

    textLinks.forEach((title: string) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders the correct number of divs', () => {
    render(<Banner />);
    const divs = screen.getAllByTestId('div');
    expect(divs).toHaveLength(3);
  });

  it('renders the correct number of sub-items', () => {
    render(<Banner />);
    const spans = screen.getAllByTestId('span');
    expect(spans).toHaveLength(6);
  });
});
