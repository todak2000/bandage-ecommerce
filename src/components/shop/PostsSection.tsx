/* eslint-disable import/no-extraneous-dependencies */

'use client';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { faker } from '@faker-js/faker';
import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaChartArea } from 'react-icons/fa';
import { GoChevronRight } from 'react-icons/go';
import {
  MdAccessAlarm,
  MdOutlineStarOutline,
  MdOutlineStarPurple500,
} from 'react-icons/md';
import { Carousel } from 'react-responsive-carousel';
import { v4 as uuidv4 } from 'uuid';

import { cn } from '@/lib/cn';
import type { ICarousel, IService } from '@/types';

import SkeletonLoader from '../SkeletonLoader';

const cardData: IService[] = [
  {
    id: 1,
    icon: <MdAccessAlarm className="ml-1 text-primary-blue" />,
    text: faker.date.birthdate().toDateString(),
  },
  {
    id: 2,
    icon: <FaChartArea className="ml-1 text-primary-green" />,
    text: `${faker.number.bigInt({ min: 99, max: 9999 })} comments`,
  },
];
const avatarImages = [
  '/images/grid-one.png',
  '/images/post-two.png',
  '/images/post-three.png',
  '/images/grid-two.png',
  '/images/grid-three.png',
  '/images/grid-four.png',
  '/images/grid-five.png',
  '/images/grid-six.png',
  '/images/grid-seven.png',
];
const carouselData = () => {
  const data: ICarousel[] = [];

  for (let i: number = 0; i < 5; i += 1) {
    data.push({
      id: i + 1,
      avatar: avatarImages[i] as string,
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.paragraph(),
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      portfolio: faker.person.jobTitle(),
    });
  }

  return data;
};

const postData: IService[] = [
  {
    id: 1,
    image: '/images/post-one.png',
  },
  {
    id: 2,
    image: '/images/post-two.png',
  },
  {
    id: 3,
    image: '/images/post-three.png',
  },
];

const PostsSection: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 900);
  }, []);

  return (
    <section
      data-testid="posts-wrapper"
      className="flex flex-col gap-[1rem] bg-white p-8 md:p-28 md:pt-0"
    >
      <div
        data-testid="posts-header"
        className="flex flex-col items-center justify-center gap-3"
      >
        <p
          data-testid="posts-header-item"
          className="text-sm font-bold text-primary-blue"
        >
          Practice Advice
        </p>
        <h4
          data-testid="posts-header-item"
          className="text-2xl font-bold text-primary-black"
        >
          Featured Posts
        </h4>
      </div>

      <div
        data-testid="posts-body"
        className="flex flex-col items-center justify-center gap-4 md:grid  md:grid-cols-3"
      >
        {postData.map(({ image }: IService) => {
          return (
            <div
              data-testid="posts-body-item"
              key={uuidv4()}
              className="flex w-full flex-col  gap-3 bg-white"
            >
              {loading ? (
                <SkeletonLoader className="h-[60px] w-full" type="block" />
              ) : (
                <Image
                  data-testid="posts-body-img"
                  src={image as string}
                  alt="post image"
                  width={350}
                  height={300}
                  className="m-auto h-[300px] w-full"
                />
              )}
              <div className="flex flex-row items-center gap-1 px-3 py-1">
                {loading ? (
                  <SkeletonLoader
                    key={uuidv4()}
                    count={1}
                    type="block"
                    className="my-[1px] h-4 w-[150px]"
                  />
                ) : (
                  ['Google', 'Trending', 'New'].map((i: string) => {
                    return (
                      <p
                        data-testid="posts-body-link"
                        key={i}
                        className={cn('text-xs', {
                          'text-secondary-black': i !== 'Google',
                          'text-primary-blue': i === 'Google',
                        })}
                      >
                        {i}
                      </p>
                    );
                  })
                )}
              </div>
              {loading ? (
                <>
                  {[
                    'my-[1px] mx-3 h-4 w-[200px]',
                    'my-[1px] mx-3 h-10 w-[300px]',
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
                </>
              ) : (
                <>
                  <p
                    data-testid="posts-body-p"
                    className="mx-3 text-xl text-secondary-black"
                  >
                    {`${faker.lorem.sentence({ min: 2, max: 4 }).substring(0, 20)}...`}
                  </p>
                  <p
                    data-testid="posts-body-p"
                    className="mx-3 text-sm text-secondary-black"
                  >
                    {`${faker.lorem.paragraph().substring(0, 100)}...`}
                  </p>
                </>
              )}
              <div className="flex flex-row items-center justify-between px-3 py-1">
                {loading ? (
                  <>
                    {['my-[1px] h-4 w-[100px]', 'my-[1px] h-4 w-[100px]'].map(
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
                  cardData.map(({ icon, text }: IService) => {
                    return (
                      <div
                        data-testid="posts-body-card"
                        key={text}
                        className="flex flex-row items-center"
                      >
                        {icon}
                        <p className="ml-1 text-xs text-secondary-black">
                          {text}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
              {loading ? (
                <SkeletonLoader
                  count={1}
                  type="block"
                  className="mx-3 my-[1px] h-4 w-[100px]"
                />
              ) : (
                <h4
                  data-testid="posts-body-link"
                  className="flex flex-row px-3 text-sm font-bold text-secondary-black"
                >
                  Learn More{' '}
                  <GoChevronRight className="text-2xl text-primary-blue" />
                </h4>
              )}
            </div>
          );
        })}
      </div>
      <div
        data-testid="posts-body-item"
        className="grid grid-cols-1 gap-2 pt-20 md:grid-cols-2"
      >
        <div className="flex w-full flex-col items-center justify-center gap-3 ">
          <h3>What they say about us</h3>
          <Carousel
            showStatus
            showIndicators
            showArrows
            showThumbs={false}
            className="max-w-[90vw] md:max-w-[35vw]"
          >
            {carouselData().map(
              ({ avatar, rating, comment, name, portfolio }: ICarousel) => {
                return (
                  <div
                    data-testid="posts-carousel-item"
                    key={uuidv4()}
                    className="flex w-full flex-col items-center justify-center gap-3 p-10"
                  >
                    {loading ? (
                      <SkeletonLoader
                        count={1}
                        type="block"
                        className="size-[90px] rounded-full"
                      />
                    ) : (
                      <Image
                        src={avatar}
                        alt="profile picture"
                        width={90}
                        height={90}
                        className="m-auto size-[90px] rounded-full"
                      />
                    )}
                    <div className="flex flex-row items-center justify-center">
                      {loading ? (
                        <SkeletonLoader key={uuidv4()} count={5} type="star" />
                      ) : (
                        [...Array(5)].map((n: number) => {
                          if (n <= Math.floor(rating)) {
                            return (
                              <MdOutlineStarPurple500
                                key={uuidv4()}
                                className="mx-2 text-xl text-[#F3CD03]"
                              />
                            );
                          }
                          return (
                            <MdOutlineStarOutline
                              key={uuidv4()}
                              className="mx-2 text-xl text-[#F3CD03]"
                            />
                          );
                        })
                      )}
                    </div>

                    {loading ? (
                      <>
                        {[
                          'my-1 h-6 w-[300px]',
                          'my-1 h-6 w-[250px]',
                          'my-1 h-6 w-[150px]',
                          'my-1 h-6 w-[100px]',
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
                      </>
                    ) : (
                      <>
                        <p
                          data-testid="posts-body-p"
                          className="text-center text-sm font-bold text-secondary-black"
                        >
                          {comment}
                        </p>
                        <p
                          data-testid="posts-body-p"
                          className="text-center text-sm font-bold text-primary-blue"
                        >
                          {name}
                        </p>
                        <p
                          data-testid="posts-body-p"
                          className="text-center text-sm font-bold text-primary-black"
                        >
                          {portfolio}
                        </p>
                      </>
                    )}
                  </div>
                );
              },
            )}
          </Carousel>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {loading
            ? [...Array(9)].map((_) => (
                <SkeletonLoader
                  key={uuidv4()}
                  count={1}
                  type="block"
                  className="h-[100px] w-full md:h-[120px] lg:h-[140px]"
                />
              ))
            : avatarImages.map((image: string) => {
                return (
                  <Image
                    data-testid="posts-avatar"
                    src={image}
                    alt="grid user picture"
                    width={90}
                    height={90}
                    key={uuidv4()}
                    className="h-[100px] w-full md:h-[120px] lg:h-[140px]"
                  />
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(PostsSection);
