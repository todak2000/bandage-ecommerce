/* eslint-disable no-unsafe-optional-chaining */

'use client';

import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cn } from '@/lib/cn';
import {
  products,
  setProducts,
  setTotalProducts,
  updateProducts,
} from '@/store';
import { useGetAllProducts } from '@/utils/hooks';

import Loader from '../Loader';
import SkeletonLoader from '../SkeletonLoader';

const FeatureSection: NextPage = () => {
  const [skip, setSkip] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const productsData = useSelector(products);
  const pathname = usePathname();

  const dispatch = useDispatch();

  const { isSuccess, data } = useGetAllProducts(skip);
  useEffect(() => {
    if (isSuccess && skip === 0) {
      dispatch(setProducts(data?.products));
      dispatch(setTotalProducts(data?.total));
    } else if (isSuccess && skip !== 0) {
      dispatch(updateProducts(data?.products));
      dispatch(setTotalProducts(data?.total));
    }

    setLoading(false);
  }, [data, dispatch, isSuccess, skip]);

  return (
    <section
      data-testid="feature-wrapper"
      className="flex flex-col gap-[1rem] bg-white p-8 md:p-28"
    >
      <div
        data-testid="feature-header"
        className={cn('flex flex-col  justify-center gap-3', {
          'items-center': !pathname.includes('/product'),
          'items-start': pathname.includes('/product'),
        })}
      >
        {!pathname.includes('/product') ? (
          <p
            data-testid="feature-header-text"
            className="text-xl font-bold text-secondary-black"
          >
            Featured Products
          </p>
        ) : null}
        <h4
          data-testid="feature-header-text"
          className="text-2xl font-bold uppercase text-primary-black"
        >
          Bestseller Products
        </h4>
        {!pathname.includes('/product') ? (
          <p className="text-xs font-medium text-secondary-black">
            Problems trying to resolve the conflict between{' '}
          </p>
        ) : null}
      </div>

      {productsData.length <= 0 || loading ? (
        <SkeletonLoader
          type="grid"
          data-testid="feature-loader"
          count={pathname.includes('/product') ? 5 : 10}
          className="h-[280px] gap-3 md:h-[18vh] md:w-[14vw]"
        />
      ) : (
        <div
          data-testid="feature-list"
          className={cn('grid grid-cols-1 gap-4  md:grid-cols-5', {
            'border-t-[2px] border-[#ececec] mt-4 py-4':
              pathname.includes('/product'),
          })}
        >
          {productsData.map((product) => {
            return (
              <Link
                href={`/product/${product?.id}`}
                className="w-full md:w-[180px] lg:w-full "
                key={product?.id}
              >
                <Image
                  src={product?.images[0] as string}
                  alt={product?.brand}
                  width={330}
                  height={160}
                  className="h-[280px] w-full md:h-[160px]"
                />
                <div
                  className={cn(
                    'my-6 flex flex-col  justify-center gap-3 px-3',
                    {
                      'items-center': !pathname.includes('/product'),
                      'items-start': pathname.includes('/product'),
                    },
                  )}
                >
                  <p className="text-center text-[1rem] font-bold text-primary-black">
                    {product?.title.length > 11
                      ? `${product?.title.substring(0, 11)}...`
                      : product?.title}
                  </p>
                  <p className="text-center text-xs font-bold text-secondary-black">
                    {product?.brand}
                  </p>
                  <p className="text-center text-sm  font-bold text-[#bdbdbdb]">
                    ${product?.price}{' '}
                    <span className="text-center text-primary-green">
                      $
                      {product && product.discountPercentage && product.price
                        ? ((product.discountPercentage / 100) * product.price)
                            .toFixed(2)
                            .toString()
                        : null}
                    </span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {skip < data?.total - 5 && !pathname.includes('/product') ? (
        <div className="flex flex-row items-center justify-center py-10">
          <button
            type="button"
            disabled={loadingMore || skip >= data?.total}
            onClick={() => {
              setLoadingMore(true);
              setTimeout(() => {
                setSkip((prev) => prev + 5);
                setLoadingMore(false);
              }, 900);
            }}
            className="max-w-60 rounded-sm border-[0.5px] border-primary-blue bg-white px-4 py-2 text-xs font-bold uppercase text-primary-blue hover:border-secondary-black hover:text-secondary-black"
          >
            {loadingMore ? <Loader /> : 'Load More Products'}
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default React.memo(FeatureSection);
