/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { faker } from '@faker-js/faker';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GiSelfLove } from 'react-icons/gi';
import { IoIosArrowForward, IoIosEye } from 'react-icons/io';
import { IoCartOutline } from 'react-icons/io5';
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { v4 as uuidv4 } from 'uuid';

import { cn } from '@/lib/cn';
import { BandageToast } from '@/lib/toast';
import {
  addToCart,
  cart,
  product,
  setProduct,
  totalProducts,
  updateWish,
  wish,
} from '@/store';
import type { ICart, INavbarOptions, IProducts } from '@/types';
import { useGetSingleProduct } from '@/utils/hooks';

import SkeletonLoader from '../SkeletonLoader';
import ProductTab from './ProductTab';

const buttonData: INavbarOptions[] = [
  {
    id: 1,
    icon: 'Select Options',
  },
  {
    id: 2,
    icon: <GiSelfLove />,
  },
  {
    id: 3,
    icon: <IoCartOutline />,
  },
  {
    id: 4,
    icon: <IoIosEye />,
  },
];
const ProductCardSection: NextPage = () => {
  const params = useParams();
  const { id: productId } = params;
  const [loading, setLoading] = useState<boolean>(true);
  const [otherProducts, setOtherProducts] = useState<IProducts[]>([]);

  const dispatch = useDispatch();
  const productData = useSelector(product);
  const total = useSelector(totalProducts);
  const cartt = useSelector(cart);
  const wishh = useSelector(wish);
  const { isSuccess, data } = useGetSingleProduct(productId as string);
  const { isSuccess: nextIsSuccess, data: nextData } = useGetSingleProduct(
    Number(productId) === total
      ? (Number(productId) - 2).toString()
      : (Number(productId) + 1).toString(),
  );
  const { isSuccess: prevIsSuccess, data: prevData } = useGetSingleProduct(
    Number(productId) === 1
      ? (Number(productId) + 2).toString()
      : (Number(productId) - 1).toString(),
  );
  useEffect(() => {
    if (isSuccess) {
      dispatch(setProduct(data));
    }

    setLoading(false);
  }, [data, dispatch, isSuccess, productId]);

  useEffect(() => {
    setOtherProducts([]);
    if (prevIsSuccess) {
      setOtherProducts((prev: IProducts[]) => [...prev, prevData]);
    }
    if (nextIsSuccess) {
      setOtherProducts((prev: IProducts[]) => [...prev, nextData]);
    }
  }, [nextData, prevData, dispatch, nextIsSuccess, prevIsSuccess, productId]);

  const handleAddToWish = () => {
    dispatch(
      updateWish({
        id: productData.id,
        title: productData.title,
        price: productData.price,
        quantity: 1,
        stock: productData.stock,
        thumbnail: productData.thumbnail,
      }),
    );

    BandageToast.success({
      msg: `${productData.title} has been added to your Wish list! 😊`,
    });
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: productData.id,
        title: productData.title,
        price: productData.price,
        quantity: 1,
        stock: productData.stock,
        thumbnail: productData.thumbnail,
      }),
    );

    BandageToast.success({
      msg: `${productData.title} has been added to your Cart! 😊`,
    });
  };

  return (
    <>
      <div
        data-testid="card-wrapper"
        className="flex flex-row items-center bg-[#FAFAFA] p-8  md:px-28 md:py-10"
      >
        {['Home', 'Shop'].map((text: string, i: number) => {
          return (
            <Link
              href="/"
              key={uuidv4()}
              className={cn('text-sm font-bold flex flex-row items-center', {
                'text-primary-black': i === 0,
                'text-secondary-black': i !== 0,
              })}
            >
              {text} {i === 0 ? <IoIosArrowForward className="ml-1" /> : null}
            </Link>
          );
        })}
      </div>

      <section
        data-testid="card-wrapper"
        className="grid grid-cols-1 bg-[#FAFAFA] p-8 md:grid-cols-2 md:px-28 md:py-10 "
      >
        <div className="flex flex-col ">
          {productData.images.length <= 0 || loading ? (
            <SkeletonLoader
              key="loader"
              type="grid"
              count={1}
              className="h-[350px] md:h-[450px] md:w-[35vw]"
            />
          ) : (
            <Carousel
              showStatus
              showIndicators
              showArrows
              showThumbs={false}
              className="max-w-[90vw] md:max-w-[45vw]"
            >
              {productData.images.map((img: string) => {
                return (
                  <Image
                    key={img}
                    src={img}
                    alt="Product Image"
                    width={500}
                    height={450}
                    className="productImg h-[350px] w-full md:h-[450px] md:w-[500px] "
                  />
                );
              })}
            </Carousel>
          )}
          <div className="my-3 flex flex-row items-center gap-2">
            {loading || otherProducts.length <= 0
              ? ['size-[120px]', 'size-[120px]'].map((i: string) => {
                  return (
                    <SkeletonLoader
                      key={uuidv4()}
                      count={1}
                      type="block"
                      className={i}
                    />
                  );
                })
              : otherProducts.map(({ id, images }: IProducts, x: number) => {
                  return (
                    <Link key={uuidv4()} href={`/product/${id}`}>
                      <Image
                        data-testid="card-img"
                        src={images[x] as string}
                        alt="Product Image"
                        width={120}
                        height={120}
                        className="size-[120px]"
                      />
                    </Link>
                  );
                })}
          </div>
        </div>
        <div className="flex flex-col gap-4  p-4">
          {loading ? (
            <SkeletonLoader
              count={1}
              type="block"
              className="my-[1px] h-6 w-[200px]"
            />
          ) : (
            <p data-testid="card-p" className="text-xl text-secondary-black">
              {productData.title}
            </p>
          )}
          <div className="flex flex-row items-center justify-start">
            {loading ? (
              <SkeletonLoader key={uuidv4()} count={5} type="star" />
            ) : (
              <>
                {[...Array(5)].map((n: number) => {
                  if (n <= Math.floor(productData.rating)) {
                    return (
                      <MdOutlineStarPurple500
                        key={uuidv4()}
                        data-testid="card-star"
                        className="mx-2 text-xl text-[#F3CD03]"
                      />
                    );
                  }
                  return (
                    <MdOutlineStarOutline
                      key={uuidv4()}
                      data-testid="card-star"
                      className="mx-2 text-xl text-[#F3CD03]"
                    />
                  );
                })}
                <span
                  data-testid="card-p"
                  className="text-sm font-bold text-secondary-black"
                >{`${faker.number.bigInt({ min: 99, max: 9999 })} Reviews`}</span>
              </>
            )}
          </div>
          {loading ? (
            <>
              {['my-[1px] h-6 w-[300px]', 'my-[1px] h-4 w-[200px]'].map(
                (i: string) => {
                  return (
                    <SkeletonLoader
                      key={uuidv4()}
                      count={1}
                      type="block"
                      className={i}
                    />
                  );
                },
              )}
            </>
          ) : (
            <>
              <h3 data-testid="card-p" className="text-2xl text-primary-black">
                ${productData.price.toFixed(2)}
              </h3>
              <p
                data-testid="card-p"
                className="text-sm font-bold text-secondary-black"
              >
                Availability:{' '}
                <span className="mx-1 text-primary-blue">
                  {productData.stock} in Stock
                </span>
              </p>
            </>
          )}
          <p
            data-testid="card-p"
            className="text-sm text-secondary-black md:hidden"
          >
            {productData.description}
          </p>
          <div className="border-t-[0.5px] border-[#bdbdbd] py-4 md:mt-10">
            <div className="mb-10 flex flex-row items-center">
              {[
                'bg-primary-blue mr-2',
                'bg-primary-green mx-2 ',
                'bg-[#E77C40] mx-2 ',
                'bg-[#252B42] mx-2 ',
              ].map((clas: string) => {
                return (
                  <span
                    key={clas}
                    className={cn('size-[30px] rounded-full', clas)}
                  />
                );
              })}
            </div>

            <div className="mt-20 flex flex-row items-center justify-between md:justify-start">
              {buttonData.map(({ icon }: INavbarOptions, i: number) => {
                return (
                  <button
                    data-testid="card-button"
                    type="button"
                    disabled={
                      i + 1 === 3
                        ? cartt?.filter(
                            (item: ICart) =>
                              item.id === Number(productId as string),
                          ).length > 0
                        : i + 1 === 2
                          ? wishh?.filter(
                              (item: any) =>
                                item.id === Number(productId as string),
                            ).length > 0
                          : false
                    }
                    key={uuidv4()}
                    onClick={
                      i + 1 === 3
                        ? handleAddToCart
                        : i + 1 === 2
                          ? handleAddToWish
                          : () => null
                    }
                    className={cn({
                      'border-[1px] bg-white border-[#E8E8E8] flex flex-col justify-center items-center rounded-full size-[40px] text-primary-black mx-1':
                        i !== 0,
                      'text-white font-bold text-sm md:px-6 px-2 py-2 md:py-3 bg-primary-blue rounded-sm mr-1':
                        i === 0,
                      'bg-primary-blue text-white':
                        (i + 1 === 2 &&
                          wishh?.filter(
                            (item: ICart) =>
                              item.id === Number(productId as string),
                          ).length > 0) ||
                        (i + 1 === 3 &&
                          cartt?.filter(
                            (item: ICart) =>
                              item.id === Number(productId as string),
                          ).length > 0),
                    })}
                  >
                    {icon}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <span className="hidden md:flex">
        <ProductTab
          loading={loading}
          productImage={productData?.images[0] as string}
        />
      </span>
    </>
  );
};

export default React.memo(ProductCardSection);
