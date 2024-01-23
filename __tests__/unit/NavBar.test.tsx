/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable import/no-extraneous-dependencies */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '@/store';
import NavBar from '@/templates/NavBar';

const queryClient = new QueryClient();

describe('NavBar', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <NavBar />
          </QueryClientProvider>
        </Provider>,
      );
    });
    const logo = screen.getByText(/Bandage/i);
    expect(logo).toBeInTheDocument();
  });

  it('renders the correct footer text links', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <NavBar />
          </QueryClientProvider>
        </Provider>,
      );
    });
    const textLinks = ['Home', 'Pages', 'Contact', 'Blog', 'About', 'Shop'];

    textLinks.forEach((title: string) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders the correct number of links', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <NavBar />
          </QueryClientProvider>
        </Provider>,
      );
    });
    const links = screen.getAllByTestId('link');
    expect(links).toHaveLength(8);
  });
});
