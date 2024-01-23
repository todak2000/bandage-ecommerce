/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { type ReactNode, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import Cart from '@/components/cart/Cart';
import WishList from '@/components/wishList/WishList';
import { setCategories } from '@/store';
import { useGetCategories } from '@/utils/hooks';

import Banner from './Banner';
import Footer from './Footer';
import NavBar from './NavBar';

const BaseLayout = (props: { children: ReactNode }) => {
  const { isSuccess, data } = useGetCategories();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      setCategories(data.slice(0, 5));
    }
    if (isSuccess) {
      dispatch(setCategories(data.slice(0, 5)));
    }
  }, [data, dispatch, isSuccess]);

  return (
    <div className="relative w-full antialiased">
      <Toaster />
      <WishList />
      <Cart />
      <nav className="fixed top-0 z-[100] w-full bg-white">
        <Banner />
        <NavBar />
      </nav>

      <main className="mt-20 w-full bg-white md:mt-40">{props.children}</main>
      <Footer />
    </div>
  );
};

export { BaseLayout };
