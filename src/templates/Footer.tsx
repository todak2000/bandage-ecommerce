/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaFacebook, FaXTwitter } from 'react-icons/fa6';
import { IoLogoInstagram, IoLogoYoutube } from 'react-icons/io5';

import Loader from '@/components/Loader';
import type {
  IFooterLinksOptions,
  IFooterOptions,
  IIconOptions,
} from '@/types';
import { AppConfig } from '@/utils/AppConfig';

const topIcons: IIconOptions[] = [
  {
    idx: 1,
    name: null,
    icon: <IoLogoInstagram size={24} />,
  },
  {
    idx: 2,
    name: null,
    icon: <IoLogoYoutube size={24} />,
  },
  {
    idx: 3,
    name: null,
    icon: <FaFacebook size={24} />,
  },
  {
    idx: 4,
    name: null,
    icon: <FaXTwitter size={24} />,
  },
];
const footerData: IFooterOptions[] = [
  {
    idx: 1,
    title: 'Company Info',
    links: [
      {
        id: 1,
        name: 'About Us',
        url: '/',
      },
      {
        id: 2,
        name: 'Carrier',
        url: '/',
      },
      {
        id: 3,
        name: 'We are hiring',
        url: '/',
      },
      {
        id: 4,
        name: 'Blog',
        url: '/',
      },
    ],
  },
  {
    idx: 2,
    title: 'Legal',
    links: [
      {
        id: 1,
        name: 'About Us',
        url: '/',
      },
      {
        id: 2,
        name: 'Carrier',
        url: '/',
      },
      {
        id: 3,
        name: 'We are hiring',
        url: '/',
      },
      {
        id: 4,
        name: 'Blog',
        url: '/',
      },
    ],
  },
  {
    idx: 3,
    title: 'Features',
    links: [
      {
        id: 1,
        name: 'Business Marketing',
        url: '/',
      },
      {
        id: 2,
        name: 'User Analytics',
        url: '/',
      },
      {
        id: 3,
        name: 'Live Chat',
        url: '/',
      },
      {
        id: 4,
        name: 'Unlimited Support',
        url: '/',
      },
    ],
  },
  {
    idx: 4,
    title: 'Resources',
    links: [
      {
        id: 1,
        name: 'iOS & Android',
        url: '/',
      },
      {
        id: 2,
        name: 'Watch a Demo',
        url: '/',
      },
      {
        id: 3,
        name: 'Customers',
        url: '/',
      },
      {
        id: 4,
        name: 'API',
        url: '/',
      },
    ],
  },
  {
    idx: 5,
    title: 'Get in Touch',
    links: [],
  },
];

function Footer() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      <section className="flex flex-col gap-[1rem] bg-white p-8 md:flex-row md:items-center md:justify-between md:gap-0 md:px-28">
        <Link href="/" data-testid="link">
          <h1 className="text-primary-black">Bandage</h1>
        </Link>
        <span className="flex flex-row items-center text-xs">
          {topIcons?.map(({ idx, icon }: IIconOptions) => {
            return (
              <Link
                href="/"
                key={idx.toString()}
                data-testid="link"
                aria-label="social media icon"
                className="mr-3 flex flex-row items-center text-primary-blue md:mx-3"
              >
                {icon ?? null}
              </Link>
            );
          })}
        </span>
      </section>
      <section className="flex flex-col gap-[1rem] p-8 md:grid md:grid-cols-footer md:gap-0 md:px-28">
        {footerData.map(({ idx, title, links }: IFooterOptions) => {
          return (
            <div key={idx.toString()} className="flex flex-col  ">
              {title && (
                <p className="my-3 text-lg font-bold text-primary-black md:my-[2rem]">
                  {title}
                </p>
              )}

              {links &&
                links?.length > 0 &&
                links.map(({ id, name, url }: IFooterLinksOptions) => {
                  return (
                    <Link
                      href={url}
                      key={id.toString()}
                      data-testid="link"
                      className="my-2 flex flex-row items-center text-sm font-bold text-secondary-black"
                    >
                      {name}
                    </Link>
                  );
                })}

              {idx === 5 && (
                <>
                  <Formik
                    initialValues={{ email: '' }}
                    onSubmit={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                      }, 400);
                    }}
                  >
                    <Form>
                      <div className=" flex h-[60px] w-full flex-row items-center rounded-lg  border-[0.5px] border-[#E6E6E6] bg-[#F9F9F9]">
                        <Field
                          name="email"
                          className=" h-[60px] w-2/3 bg-transparent  px-4 text-sm placeholder:text-primary-black"
                          type="email"
                          placeholder="example@example.com"
                        />
                        <button
                          disabled={isLoading}
                          className="flex h-[60px] w-1/3 flex-row items-center justify-center rounded-r-lg bg-primary-blue text-sm text-white"
                          type="submit"
                        >
                          {isLoading ? <Loader /> : `Subscribe`}
                        </button>
                      </div>
                    </Form>
                  </Formik>
                  <p className="my-3 text-xs text-secondary-black ">
                    Subscribe to our newsletter to get the latest news.
                  </p>
                </>
              )}
            </div>
          );
        })}
      </section>
      <section className="flex  flex-row items-center justify-center bg-[#FAFAFA] p-8 md:justify-start md:px-28">
        <p className="font-bold text-secondary-black">
          Copyright {new Date().getFullYear()} © {AppConfig.title}.
        </p>
      </section>
    </>
  );
}

export default React.memo(Footer);
