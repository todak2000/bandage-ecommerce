/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';

import PostsSection from '@/components/shop/PostsSection';

describe('Posts Component', () => {
  it('renders the correct text', () => {
    render(<PostsSection />);
    const postsLinks = [
      'What they say about us',
      'Practice Advice',
      'Featured Posts',
    ];

    postsLinks.forEach((title: string) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders the correct number of divs', async () => {
    await act(async () => {
      render(<PostsSection />);
    });

    const wrapper = screen.getByTestId('posts-wrapper');
    const wrapperCount = screen.getAllByTestId('posts-wrapper');
    expect(wrapper).toBeInTheDocument();
    expect(wrapperCount).toHaveLength(1);

    const header = screen.getByTestId('posts-header');
    const headerCount = screen.getAllByTestId('posts-header');
    expect(header).toBeInTheDocument();
    expect(headerCount).toHaveLength(1);

    const headerItemsCount = screen.getAllByTestId('posts-header-item');
    expect(headerItemsCount).toHaveLength(2);

    const body = screen.getByTestId('posts-body');
    const bodyCount = screen.getAllByTestId('posts-body');
    expect(body).toBeInTheDocument();
    expect(bodyCount).toHaveLength(1);

    const bodyItems = screen.getAllByTestId('posts-body-item');
    expect(bodyItems).toHaveLength(4);

    const carouselItems = screen.getAllByTestId('posts-carousel-item');
    expect(carouselItems).toHaveLength(5);

    const p = await screen.findAllByTestId('posts-body-p');
    expect(p).toHaveLength(21);
    const cards = await screen.findAllByTestId('posts-body-card');
    expect(cards).toHaveLength(6);

    const links = await screen.findAllByTestId('posts-body-link');
    expect(links).toHaveLength(12);
    const avatars = await screen.findAllByTestId('posts-avatar');
    expect(avatars).toHaveLength(9);
  });
});
