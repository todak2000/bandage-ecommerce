/* eslint-disable no-unsafe-optional-chaining */
import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { GiSelfLove } from 'react-icons/gi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { TbWindowMaximize, TbWindowMinimize } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { cn } from '@/lib/cn';
import { BandageToast } from '@/lib/toast';
import { isWishListOpen, removeWish, setWishListOpen, wish } from '@/store';
import type { ICart } from '@/types';
import { currencyFormatter } from '@/utils';

import SkeletonLoader from '../SkeletonLoader';

const WishList: NextPage = () => {
  const isWishListOpenn = useSelector(isWishListOpen);
  const [loading, setLoading] = useState<boolean>(true);
  const [minimize, setMinimize] = useState<boolean>(false);

  const dispatch = useDispatch();
  const wishh = useSelector(wish);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 900);
  }, []);

  if (!isWishListOpenn) {
    return null;
  }

  const handleCloseModal = () => {
    dispatch(setWishListOpen(false));
    setMinimize(false);
  };

  const handleDelete = (productId: number, name: string) => {
    dispatch(removeWish(productId));

    BandageToast.error({
      msg: `${name} has been removed from your Wish list!`,
    });
  };
  const toggleMinimize = () => {
    setMinimize(!minimize);
  };

  return (
    <section
      data-testid="wishlist-wrapper"
      className={cn('fixed left-0  z-[1000]  overflow-auto bg-white md:w-1/3', {
        'w-full h-[50vh]  bottom-0': !minimize,
        'w-full h-16 bottom-20': minimize,
      })}
    >
      <div
        data-testid="wishlist-header"
        className="flex flex-row items-center justify-between bg-primary-blue  p-4"
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
          <GiSelfLove className="mr-2 text-lg" />
          <span className=" text-primary-black">Wish List </span>
          <span className="font-bold text-primary-black">
            {` (${wishh?.length > 0 ? wishh?.length : 0})`}
          </span>
        </button>

        <IoIosCloseCircleOutline
          onClick={handleCloseModal}
          className=" cursor-pointer text-2xl text-primary-black"
        />
      </div>
      {!minimize && (
        <div data-testid="wishlist-body" className="grid grid-rows-5  p-2">
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
            wishh?.length > 0 &&
            wishh?.map(({ id, title, thumbnail, price }: ICart) => {
              return (
                <div
                  data-testid="wish-item"
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
                      Price: {currencyFormatter.format(Number(price))}
                    </p>
                  </div>

                  <IoIosCloseCircleOutline
                    className="cursor-pointer text-red-700"
                    onClick={() => handleDelete(id, title)}
                  />
                </div>
              );
            })
          )}
        </div>
      )}
    </section>
  );
};

export default WishList;
