/* eslint-disable import/no-extraneous-dependencies */

'use client';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import type { NextPage } from 'next';
import React from 'react';

import Aws from '@/svgs/Aws';
import Discord from '@/svgs/Discord';
import Hooli from '@/svgs/Hooli';
import Leaff from '@/svgs/Leaff';
import Stripe from '@/svgs/Stripe';
import type { INavbarOptions } from '@/types';

const sponsorData: INavbarOptions[] = [
  {
    id: 1,
    icon: <Hooli />,
  },
  {
    id: 2,
    icon: <Leaff />,
  },
  {
    id: 3,
    icon: <Stripe />,
  },
  {
    id: 4,
    icon: <Aws />,
  },
  {
    id: 5,
    icon: <Discord />,
  },
];
const Sponsors: NextPage = () => {
  return (
    <div
      data-testid="sponsor-wrapper"
      className="flex flex-col items-center justify-evenly bg-[#FAFAFA] p-8 sm:p-28  md:flex-row"
    >
      {sponsorData.map(({ id, icon }: INavbarOptions) => {
        return (
          <span
            data-testid="sponsor-item"
            key={(id as number).toString()}
            className="my-5 flex flex-row items-center justify-center md:my-0"
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
};

export default React.memo(Sponsors);
