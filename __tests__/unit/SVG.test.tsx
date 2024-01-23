import { render } from '@testing-library/react';

import Aws from '@/svgs/Aws';
import CartIcon from '@/svgs/CartIcon';
import Discord from '@/svgs/Discord';
import Hamburger from '@/svgs/Hamburger';
import Hooli from '@/svgs/Hooli';
import Leaff from '@/svgs/Leaff';
import LikeIcon from '@/svgs/LikeIcon';
import Lyft from '@/svgs/Lyft';
import SearchIcon from '@/svgs/SearchIcon';
import Stripe from '@/svgs/Stripe';

describe('Aws Icon', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Aws />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Cart Icon', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<CartIcon />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Discord Icon', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Discord />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Hamburger Icon', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Hamburger />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Hooli Icon', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Hooli />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Leaff Icon', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Leaff />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Like Icon', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<LikeIcon />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Lyft Icon', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Lyft />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Search Icon', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<SearchIcon />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Stripe Icon', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Stripe />);
    expect(asFragment()).toMatchSnapshot();
  });
});
