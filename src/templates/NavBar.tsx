/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCart } from 'react-icons/bs';
import { GiSelfLove } from 'react-icons/gi';
import { IoIosCheckmarkCircleOutline, IoIosSearch } from 'react-icons/io';
import { IoPersonOutline } from 'react-icons/io5';
import { RxCaretDown } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Loader from '@/components/Loader';
import { cn } from '@/lib/cn';
import {
  cart,
  categories,
  isCartOpen,
  isWishListOpen,
  selectedCategory,
  setCart,
  setOpenCart,
  setProducts,
  setSelectedCategory,
  setWish,
  setWishListOpen,
  wish,
} from '@/store';
import CartIcon from '@/svgs/CartIcon';
import Hamburger from '@/svgs/Hamburger';
import SearchIcon from '@/svgs/SearchIcon';
import type { INavbar, INavbarOptions } from '@/types';
import { useGetProductsByCategory } from '@/utils/hooks';
import { loadData, saveData } from '@/utils/persistentStorage';

function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCaret, setIsCaret] = useState<boolean>(false);
  const categoriesData: string[] = useSelector(categories);
  const selected: string = useSelector(selectedCategory);
  const cartt = useSelector(cart);
  const isCartOpenn = useSelector(isCartOpen);
  const isWishListOpenn = useSelector(isWishListOpen);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const wishh = useSelector(wish);

  const { isSuccess, data } = useGetProductsByCategory(selected);
  const ref = useRef<HTMLElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event?.target as Node)) {
      setIsCaret(false);
    }
  };

  const handleToggleCart = () => {
    dispatch(setOpenCart(!isCartOpenn));
  };

  const handleToggleWishList = () => {
    dispatch(setWishListOpen(!isWishListOpenn));
  };

  useEffect(() => {
    const fetchCartData = async () => {
      if (cartt?.length > 0) {
        saveData('cart', cartt);
      } else {
        const persistData = await loadData('cart');
        dispatch(setCart(persistData));
      }
    };

    fetchCartData();
  }, []);

  useEffect(() => {
    const fetchWishData = async () => {
      if (wishh?.length > 0) {
        saveData('wishList', wishh);
      } else {
        const persistWishListData = await loadData('wishList');
        dispatch(setWish(persistWishListData));
      }
    };

    fetchWishData();
  }, []);

  useEffect(() => {
    saveData('wishList', wishh);
    saveData('cart', cartt);
  }, [cartt, wishh]);

  const optionsArrMobileDropDown: INavbarOptions[] = [
    {
      id: 1,
      icon: <SearchIcon />,
      value: 0,
    },
    {
      id: 2,
      icon: <CartIcon />,
      value: cartt?.length,
    },
    {
      id: 3,
      icon: <GiSelfLove size={40} />,
      value: wishh?.length,
    },
  ];

  const optionsArr: INavbarOptions[] = [
    {
      id: 1,
      icon: <IoIosSearch size={20} />,
      value: 0,
    },
    {
      id: 2,
      icon: <BsCart size={20} />,
      value: cartt?.length,
    },
    {
      id: 3,
      icon: <GiSelfLove size={20} />,
      value: wishh?.length,
    },
  ];
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setProducts(data?.products));
    }
  }, [data, dispatch, isSuccess]);

  const NavArr: INavbar[] = [
    {
      id: 1,
      name: 'Home',
      redirectLink: '/#',
      isDropdown: false,
    },
    {
      id: 2,
      name: 'Shop',
      redirectLink: '/',
      isDropdown: true,
    },
    {
      id: 3,
      name: 'About',
      redirectLink: '/#',
      isDropdown: false,
    },
    {
      id: 4,
      name: 'Blog',
      redirectLink: '/#',
      isDropdown: false,
    },
    {
      id: 5,
      name: 'Contact',
      redirectLink: '/#',
      isDropdown: false,
    },
    {
      id: 6,
      name: 'Pages',
      redirectLink: '/',
      isDropdown: false,
    },
  ];

  return (
    <nav
      ref={ref}
      className={cn(
        'z-50 w-full py-4 md:py-0 px-8 md:px-28 pb-16  md:pb-0 bg-white ',
        'flex justify-between flex-row md:items-center',
        'transition-all duration-100',
        {
          'h-20 min-h-0': !isOpen,
          'bg-opacity-1': isOpen,
        },
      )}
    >
      <div className="w-full flex-row items-start justify-start md:items-center">
        <nav className="flex flex-col justify-center gap-4 md:flex-row md:items-center md:justify-start md:gap-14">
          <Link href="/" data-testid="link">
            <h1 className="text-primary-black">Bandage</h1>
          </Link>
          <span
            id="menu"
            role="menu"
            aria-hidden={!isOpen}
            className={cn({
              'hidden md:flex md:relative md:w-full md:flex-row bg-white items-center gap-3':
                !isOpen,
              'absolute top-20 left-0 mx-auto flex w-full flex-col items-center gap-3 bg-white md:relative md:w-auto md:flex-row':
                isOpen,
              'bg-transparent': isCaret && !isOpen,
            })}
          >
            {NavArr.map(({ id, name, redirectLink, isDropdown }: INavbar) => {
              return (
                <Link
                  key={id.toString()}
                  href={redirectLink}
                  data-testid="link"
                  className={cn(
                    'md:p flex flex-row items-center text-[1.875rem] font-medium text-secondary-black md:font-semibold hover:text-primary-blue',
                    {
                      'text-primary-black md:font-medium':
                        pathname === redirectLink,
                      relative: id === 2,
                    },
                  )}
                >
                  {name}
                  {isDropdown ? (
                    <RxCaretDown
                      className="ml-1 text-lg"
                      onClick={() => {
                        setIsCaret(!isCaret);
                      }}
                    />
                  ) : null}
                  {isCaret && id === 2 ? (
                    <div className="absolute top-[50px] flex flex-col justify-center overflow-y-auto bg-white py-6">
                      {categoriesData?.length === 0 && <Loader />}
                      {categoriesData &&
                        categoriesData?.length > 0 &&
                        categoriesData?.map((category: string) => {
                          return (
                            <button
                              className="my-1 w-[250px] cursor-pointer py-2 text-2xl text-secondary-black hover:bg-[#efefef]"
                              type="button"
                              onClick={() => {
                                dispatch(setSelectedCategory(category));
                                setIsCaret(false);
                                setIsOpen(false);
                              }}
                              key={category}
                            >
                              <span className="flex flex-row items-center justify-center">
                                {category}{' '}
                                {selected === category ? (
                                  <IoIosCheckmarkCircleOutline className="ml-1 text-lg text-green-500" />
                                ) : null}
                              </span>
                            </button>
                          );
                        })}
                    </div>
                  ) : null}
                </Link>
              );
            })}
            {pathname && pathname.includes('/product') ? (
              <>
                <Link
                  href="/"
                  data-testid="link"
                  className="flex min-w-[10rem] flex-row items-center justify-center text-[1.875rem] font-semibold text-primary-blue hover:text-secondary-black md:hidden"
                >
                  <IoPersonOutline className="mr-1" />
                  Login / Register
                </Link>
                {optionsArrMobileDropDown.map(
                  ({ id, icon, value }: INavbarOptions) => {
                    return (
                      <button
                        type="button"
                        onClick={
                          id === 2
                            ? handleToggleCart
                            : id === 3
                              ? handleToggleWishList
                              : () => null
                        }
                        key={uuidv4()}
                        className="my-3 flex flex-row items-center font-bold text-primary-blue hover:text-secondary-black md:hidden "
                      >
                        {icon}
                        {id !== 1 ? (
                          <p className="ml-1 text-xs">{value}</p>
                        ) : null}
                      </button>
                    );
                  },
                )}
              </>
            ) : null}
          </span>
        </nav>
      </div>
      <div className="flex w-1/3 flex-row items-start justify-end  py-2 md:items-center">
        <div className="flex items-center justify-between text-primary-black md:text-primary-blue lg:basis-[24rem]">
          <Link
            href="/"
            data-testid="link"
            className="p hidden min-w-[10rem] flex-row items-center justify-center font-semibold text-primary-blue hover:text-secondary-black lg:flex"
          >
            <IoPersonOutline className="mr-1" />
            Login / Register
          </Link>
          {optionsArr.map(({ id, icon, value }: INavbarOptions) => {
            return (
              <button
                type="button"
                onClick={
                  id === 2
                    ? handleToggleCart
                    : id === 3
                      ? handleToggleWishList
                      : () => null
                }
                key={uuidv4()}
                className="hidden w-[2rem] flex-row items-center hover:text-secondary-black md:flex md:w-[3rem]"
                aria-label="navbar icon options"
              >
                {icon}
                {id !== 1 ? (
                  <p className="hidden text-[12px] md:ml-1 md:flex">{value}</p>
                ) : null}
              </button>
            );
          })}
          <button
            type="button"
            aria-controls="menu"
            name={isOpen ? 'close' : 'hamburger'}
            aria-label="Hamburger"
            onClick={() => setIsOpen(!isOpen)}
            className={cn('md:hidden', {
              'text-white': !isOpen,
            })}
          >
            {isOpen ? (
              <AiOutlineClose
                className="text-lg text-primary-black"
                data-testid="close"
              />
            ) : (
              <Hamburger data-testid="open" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
export default React.memo(NavBar);
