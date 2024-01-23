/* eslint-disable no-unsafe-optional-chaining */
import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { TbWindowMaximize, TbWindowMinimize } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { cn } from '@/lib/cn';
import { BandageToast } from '@/lib/toast';
import {
  cart,
  decreaseQuantity,
  increaseQuantity,
  isCartOpen,
  removeFromCart,
  setOpenCart,
  updateProductStock,
} from '@/store';
import type { ICart } from '@/types';
import { currencyFormatter } from '@/utils';

import SkeletonLoader from '../SkeletonLoader';

const Cart: NextPage = () => {
  const isCartOpenn = useSelector(isCartOpen);
  const cartt = useSelector(cart);
  const [loading, setLoading] = useState<boolean>(true);

  const [minimize, setMinimize] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 900);
  }, []);

  const totalPrice = useMemo(() => {
    return cartt?.reduce(
      (total: number, product: ICart) =>
        product?.price && product?.quantity
          ? total + product?.price * product?.quantity
          : 0,
      0,
    );
  }, [cartt]);

  if (!isCartOpenn) {
    return null;
  }

  const handleCloseModal = () => {
    dispatch(setOpenCart(false));
    setMinimize(false);
  };
  const handleAddQuantity = (
    productId: number,
    qty: number,
    stock: number,
    name: string,
  ) => {
    if (qty < stock) {
      dispatch(increaseQuantity(productId));
      dispatch(updateProductStock({ id: Number(productId), change: -1 }));
    } else {
      BandageToast.error({
        msg: `Oops! ${name} has been been stocked out 😔`,
      });
    }
  };
  const handleSubstractQuantity = (productId: number, qty: number) => {
    if (qty > 1) {
      dispatch(decreaseQuantity(productId));
      dispatch(updateProductStock({ id: Number(productId), change: +1 }));
    } else {
      BandageToast.error({
        msg: `Oops! minimum quantity reached 😔`,
      });
    }
  };
  const handleDelete = (productId: number, name: string) => {
    dispatch(removeFromCart(productId));
    BandageToast.error({
      msg: `${name} has been removed from your cart!`,
    });
  };
  const toggleMinimize = () => {
    setMinimize(!minimize);
  };

  return (
    <section
      data-testid="cart-wrapper"
      className={cn('fixed right-0  z-[100]  overflow-auto bg-white md:w-1/3', {
        'w-full h-[50vh]  bottom-0': !minimize,
        'w-full h-16 bottom-20': minimize,
      })}
    >
      <div
        data-testid="cart-header"
        className="flex flex-row items-center justify-between bg-gray-300  p-4"
      >
        {minimize ? (
          <TbWindowMaximize
            onClick={toggleMinimize}
            className=" cursor-pointer text-2xl text-primary-black"
          />
        ) : (
          <TbWindowMinimize
            onClick={toggleMinimize}
            className=" cursor-pointer text-2xl text-primary-black"
          />
        )}
        <button
          type="button"
          className="flex cursor-pointer flex-row items-center text-sm "
          onClick={toggleMinimize}
        >
          <FiShoppingCart className="mr-2 text-lg" />

          <span className=" text-primary-black">Cart </span>
          <span className="font-bold text-primary-black">{` (${cartt?.length > 0 ? cartt?.length : 0})`}</span>
          <span
            className="ml-4 font-bold text-primary-green"
            data-testid="cart-total"
          >
            {totalPrice ? currencyFormatter.format(Number(totalPrice)) : null}
          </span>
        </button>

        <IoIosCloseCircleOutline
          onClick={handleCloseModal}
          className=" cursor-pointer text-2xl text-primary-black"
        />
      </div>
      {!minimize && (
        <div data-testid="cart-body" className="grid grid-rows-5  p-2">
          {loading ? (
            <>
              {[1, 2, 3].map((_) => {
                return (
                  <span
                    key={uuidv4()}
                    className="my-1 flex flex-row items-center justify-between"
                  >
                    <SkeletonLoader
                      count={1}
                      type="block"
                      className="my-[2px] size-[100px]"
                    />
                    <div className="px-1 py-2">
                      {[
                        'my-[2px] h-8 w-[60vw] md:w-[20vw]',
                        'my-[2px] h-6 w-[50vw] md:w-[15vw]',
                        'my-[2px] h-4 w-[30vw] md:w-[10vw]',
                      ].map((i: string) => {
                        return (
                          <SkeletonLoader
                            key={uuidv4()}
                            count={1}
                            type="block"
                            className={i}
                          />
                        );
                      })}
                    </div>
                  </span>
                );
              })}
            </>
          ) : (
            cartt?.length > 0 &&
            cartt?.map(
              ({ id, title, thumbnail, quantity, price, stock }: ICart) => {
                return (
                  <div
                    data-testid="cart-item"
                    key={uuidv4()}
                    className="my-1 flex flex-row items-center justify-between rounded-md border-[0.5px] border-gray-300 p-2"
                  >
                    <Image
                      src={thumbnail}
                      alt="Product Image"
                      width={100}
                      height={100}
                      className="size-[100px]"
                    />
                    <div className="px-1 py-2">
                      <p className="text-sm font-bold text-primary-black">
                        {title.length > 11
                          ? `${title.substring(0, 11)}...`
                          : title}
                      </p>
                      <p className="text-xs text-secondary-black">
                        Unit Price: {currencyFormatter.format(Number(price))}
                      </p>
                      <p className="mt-6 text-sm text-primary-black">
                        SubTotal:{' '}
                        <span className="font-bold">
                          {currencyFormatter.format(Number(price * quantity))}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-sm border-[0.5px] border-transparent">
                      <button
                        disabled={quantity <= 0}
                        onClick={
                          quantity > 0
                            ? () => handleSubstractQuantity(id, quantity)
                            : () => null
                        }
                        type="button"
                        className={cn(
                          'border-r-[0.5px] border-transparent px-2 py-1 text-2xl font-bold text-red-500',
                          {
                            ' text-[#efefef]': quantity <= 1,
                          },
                        )}
                      >
                        -
                      </button>
                      <span className="px-1 text-lg font-bold">{quantity}</span>
                      <button
                        disabled={quantity > stock}
                        onClick={
                          quantity <= stock
                            ? () =>
                                handleAddQuantity(id, quantity, stock, title)
                            : () => null
                        }
                        type="button"
                        className={cn(
                          'border-l-[0.5px] border-transparent px-2  py-1 text-2xl font-bold text-primary-green',
                          {
                            ' text-[#efefef]': quantity >= stock,
                          },
                        )}
                      >
                        +
                      </button>
                    </div>
                    <IoIosCloseCircleOutline
                      className="cursor-pointer text-red-700"
                      onClick={() => handleDelete(id, title)}
                    />
                  </div>
                );
              },
            )
          )}
        </div>
      )}
    </section>
  );
};

export default Cart;
