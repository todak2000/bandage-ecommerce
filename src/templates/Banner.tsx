/* eslint-disable import/no-extraneous-dependencies */

'use client';

import Link from 'next/link';
import * as React from 'react';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import { FaFacebook, FaXTwitter } from 'react-icons/fa6';
import { FiPhone } from 'react-icons/fi';
import { IoLogoInstagram } from 'react-icons/io';
import { IoLogoYoutube } from 'react-icons/io5';

import type { IBannerOptions, IIconOptions } from '@/types';

const optionsArr: IBannerOptions[] = [
  {
    id: 1,
    data: {
      text: null,
      icons: [
        {
          idx: 1,
          icon: <FiPhone size={16} className="mr-2" />,
          name: '(225) 555-0118',
        },
        {
          idx: 2,
          icon: <BsFillEnvelopeFill size={16} className="mr-2" />,
          name: 'michelle.rivera@example.com',
        },
      ],
    },
  },
  {
    id: 2,
    data: 'Follow Us and get a chance to win 80% off',
  },
  {
    id: 3,
    data: {
      text: 'Follow Us:',
      icons: [
        {
          idx: 1,
          name: null,
          icon: <IoLogoInstagram size={20} />,
        },
        {
          idx: 2,
          name: null,
          icon: <IoLogoYoutube size={20} />,
        },
        {
          idx: 3,
          name: null,
          icon: <FaFacebook size={20} />,
        },
        {
          idx: 4,
          name: null,
          icon: <FaXTwitter size={20} />,
        },
      ],
    },
  },
];

function Banner() {
  return (
    <section className=" hidden w-full flex-col justify-between bg-primary-green p-8 py-4 md:flex md:flex-row">
      {optionsArr.map(({ id, data }: IBannerOptions) => {
        return (
          <div
            key={id.toString()}
            data-testid="div"
            className="flex flex-row items-center font-bold text-white"
          >
            {typeof data === 'string' ? (
              <p className="hidden text-xs lg:flex">{data}</p>
            ) : (
              <span className="flex flex-row items-center text-xs">
                {data?.text ?? null}
                {data.icons?.map(({ idx, name, icon }: IIconOptions) => {
                  return (
                    <Link
                      href="/"
                      key={idx.toString()}
                      data-testid="span"
                      aria-label={name as string}
                      className="mx-3 flex flex-row items-center text-xs"
                    >
                      {icon ?? null} {name ?? null}
                    </Link>
                  );
                })}
              </span>
            )}
          </div>
        );
      })}
    </section>
  );
}
export default React.memo(Banner);
