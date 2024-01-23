/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';

import Footer from '../../src/templates/Footer';

describe('Footer', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    render(<Footer />);
    const logos = screen.getAllByText(/Bandage/i);
    expect(logos).toHaveLength(2);
  });

  it('renders the correct footer text links', () => {
    render(<Footer />);
    const textLinks = [
      'Business Marketing',
      'User Analytics',
      'Live Chat',
      'Unlimited Support',
      'iOS & Android',
      'Watch a Demo',
      'Customers',
      'Company Info',
      'Legal',
      'Features',
      'Resources',
      'Get in Touch',
      'API',
    ];

    textLinks.forEach((title: string) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders the correct number of links', () => {
    render(<Footer />);
    const links = screen.getAllByTestId('link');
    expect(links).toHaveLength(21);
  });
});
