'use client';

import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { products } from '@/store';

import SkeletonLoader from '../SkeletonLoader';

const HeroSection: NextPage = () => {
  const productsData = useSelector(products);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      if (productsData.length > 0) {
        setLoading(false);
      }
    }, 900);
  }, [productsData]);

  return (
    <section
      data-testid="hero-wrapper"
      className="flex grid-cols-shop flex-col gap-[1rem] bg-white p-8 md:grid md:px-28"
    >
      {productsData.length <= 0 || loading ? (
        <>
          <SkeletonLoader
            type="block"
            className="h-[300px] grow md:h-[600px]"
            count={1}
          />
          <div className="grid h-[600px] grid-rows-2 gap-3 ">
            <SkeletonLoader
              className="relative h-[300px] "
              count={1}
              type="block"
            />
            <div className="grid h-[300px] grid-cols-1 gap-3 md:grid-cols-2">
              <SkeletonLoader
                className="relative h-[300px] "
                type="block"
                count={1}
              />
              <SkeletonLoader
                type="block"
                className="relative hidden h-[300px]  md:flex"
                count={1}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative h-[300px] bg-white  md:h-[600px]">
            <div className="absolute top-10 w-full px-10 py-5 opacity-80">
              <p
                data-testid="hero-text"
                className="font-bold text-primary-green"
              >
                {productsData.length} Items
              </p>
              <h3
                data-testid="hero-text"
                className="text-[1.125rem] font-bold uppercase text-primary-black"
              >
                {productsData[0]?.category}
              </h3>
              <Link
                data-testid="hero-link"
                href="/#"
                className="my-2 text-sm font-bold text-primary-black"
              >
                Read More
              </Link>
            </div>
            <Image
              data-testid="hero-img"
              src="/images/hero-left.png"
              alt="top left hero image"
              width={330}
              height={600}
              className="m-auto h-[300px] w-full md:h-[600px]"
            />
          </div>
          <div className="grid h-[600px] grid-rows-2 gap-3  bg-white">
            <div className="relative h-[300px] w-full bg-gray-300">
              <div className="absolute top-10 w-full  px-10 py-5 opacity-80">
                <p
                  data-testid="hero-text"
                  className="font-bold text-primary-green"
                >
                  {productsData.length} Items
                </p>
                <h3
                  data-testid="hero-text"
                  className="text-[1.125rem] font-bold uppercase text-primary-black"
                >
                  {productsData[0]?.category}
                </h3>
                <Link
                  data-testid="hero-link"
                  href="/#"
                  className="my-2 cursor-pointer text-sm font-bold text-primary-black"
                >
                  Read More
                </Link>
              </div>
              <Image
                data-testid="hero-img"
                src="/images/hero-top.png"
                alt="top right image"
                width={330}
                height={300}
                className="m-auto h-[300px] w-full"
              />
            </div>
            <div className="grid h-[300px] w-full grid-cols-1 gap-3 bg-white md:grid-cols-2">
              <div className="relative h-[300px] bg-gray-400">
                <div className="absolute top-10 w-full  px-10 py-5 opacity-80">
                  <p
                    data-testid="hero-text"
                    className="font-bold text-primary-green"
                  >
                    {productsData.length} Items
                  </p>
                  <h3
                    data-testid="hero-text"
                    className="text-[1.125rem] font-bold uppercase text-primary-black"
                  >
                    {productsData[0]?.category}
                  </h3>
                  <Link
                    data-testid="hero-link"
                    href="/#"
                    className="my-2 text-sm font-bold text-primary-black"
                  >
                    Read More
                  </Link>
                </div>
                <Image
                  data-testid="hero-img"
                  src="/images/bottom-left.png"
                  alt="bottom left image"
                  width={330}
                  height={300}
                  className="m-auto h-[300px] w-full"
                />
              </div>
              <div className="relative hidden h-[300px] bg-gray-300 md:flex">
                <div className="absolute top-10 w-full px-10 py-5 opacity-80">
                  <p
                    data-testid="hero-text"
                    className="font-bold text-primary-green"
                  >
                    {productsData.length} Items
                  </p>
                  <h3
                    data-testid="hero-text"
                    className="text-[1.125rem] font-bold uppercase text-primary-black"
                  >
                    {productsData[0]?.category}
                  </h3>
                  <Link
                    data-testid="hero-link"
                    href="/#"
                    className="my-2 text-sm font-bold text-primary-black"
                  >
                    Read More
                  </Link>
                </div>
                <Image
                  data-testid="hero-img"
                  src="/images/bottom-right.png"
                  alt="bottom right image"
                  width={330}
                  height={300}
                  className="m-auto h-[300px] w-full"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSection;
