'use client';

import type { NextPage } from 'next';
import React from 'react';
import { FaBookReader } from 'react-icons/fa';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { VscBook } from 'react-icons/vsc';

import type { IService } from '@/types';

const serviceData: IService[] = [
  {
    id: 1,
    icon: <FaBookReader className="text-[4rem] text-primary-blue" />,
    title: 'Easy Wins',
    text: 'Get your best looking smile now!',
  },
  {
    id: 2,
    icon: <VscBook className="text-[4rem] text-primary-blue" />,
    title: 'Concrete',
    text: 'Defalcate is most focused in helping you discover your most beautiful smile',
  },
  {
    id: 3,
    icon: <FaArrowTrendUp className="text-[4rem] text-primary-blue" />,
    title: 'Hack Growth',
    text: 'Overcame any hurdle or any other problem.',
  },
];

const ServiceSection: NextPage = () => {
  return (
    <section
      data-testid="service-wrapper"
      className="flex flex-col gap-[1rem] bg-white p-8 md:p-28 md:pt-0"
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <p
          data-testid="service-header-item"
          className="text-xl font-bold text-secondary-black"
        >
          Featured Products
        </p>
        <h4
          data-testid="service-header-item"
          className="text-2xl font-bold uppercase text-primary-black"
        >
          The Best Services
        </h4>
        <p
          data-testid="service-header-item"
          className="text-xs font-medium text-secondary-black"
        >
          Problems trying to resolve the conflict between{' '}
        </p>
      </div>

      <div
        data-testid="service-body"
        className="flex flex-col items-center justify-center gap-4  md:flex-row"
      >
        {serviceData.map(({ id, title, icon, text }: IService) => {
          return (
            <div
              data-testid="service-body-item"
              key={id.toString()}
              className="flex w-[300px] flex-col items-center justify-center gap-3 bg-white px-10 py-8"
            >
              {icon}
              <h3 className="text-center text-2xl text-primary-black">
                {title}
              </h3>
              <p className="h-16  text-center text-sm text-secondary-black">
                {text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default React.memo(ServiceSection);
