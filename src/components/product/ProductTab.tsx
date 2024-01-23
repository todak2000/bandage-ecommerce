/* eslint-disable import/no-extraneous-dependencies */

'use client';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { faker } from '@faker-js/faker';
import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { v4 as uuidv4 } from 'uuid';

import { cn } from '@/lib/cn';

import SkeletonLoader from '../SkeletonLoader';

interface IProductTab {
  productImage: string;
  loading: boolean;
}
const ProductTab: NextPage<IProductTab> = ({ productImage, loading }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const handleTabSelect = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Tabs
      selectedIndex={tabIndex}
      onSelect={handleTabSelect}
      className="bg-white p-8  md:px-28 md:pt-10"
    >
      <TabList className="flex flex-row  items-center justify-center border-b-[1px] border-[#ECECEC]  px-[20%]">
        {['Description', 'Additional Information', `Reviews (${1})`].map(
          (item: string, index: number) => {
            return (
              <Tab
                key={item}
                className={cn(
                  'text-sm font-bold mx-auto hover:text-primary-black py-6 px-10 text-center',
                  {
                    'text-primary-blue': tabIndex === index,
                    'text-secondary-black': tabIndex !== index,
                  },
                )}
              >
                {item}
              </Tab>
            );
          },
        )}
      </TabList>

      {[1, 2, 3].map((_) => {
        return (
          <TabPanel key={uuidv4()} className="w-full ">
            <div className="grid grid-cols-2 gap-4 py-10">
              <div className="gap-3 ">
                {loading ? (
                  [
                    'my-1 h-6 w-[20vw]',
                    'my-1 h-14 w-[30vw]',
                    'my-1 h-12 w-[34vw]',
                    'my-1 h-14 w-[30vw]',
                  ].map((i: string) => {
                    return (
                      <SkeletonLoader
                        key={uuidv4()}
                        count={1}
                        type="block"
                        className={i}
                      />
                    );
                  })
                ) : (
                  <>
                    <h3
                      data-testid="tab-body-header"
                      className="text-[1.875rem] text-primary-black"
                    >
                      {`${faker.lorem.sentence({ min: 2, max: 4 }).substring(0, 20)}...`}
                    </h3>
                    {[1, 2, 3].map((i) => {
                      return (
                        <p
                          data-testid="tab-body-p"
                          key={i.toString()}
                          className={cn('my-3  text-sm text-secondary-black', {
                            'border-l-4 border-primary-green pl-4 ': i === 2,
                          })}
                        >
                          {`${faker.lorem.paragraph().substring(0, 100)}...`}
                        </p>
                      );
                    })}
                  </>
                )}
              </div>
              {loading ? (
                <SkeletonLoader
                  key={uuidv4()}
                  count={1}
                  type="block"
                  className="h-[350px] w-[40vw] py-10"
                />
              ) : (
                <Image
                  src={productImage}
                  data-testid="tab-img"
                  alt="Product Image"
                  width={200}
                  height={350}
                  className="h-[350px] w-full py-10"
                />
              )}
            </div>
          </TabPanel>
        );
      })}
    </Tabs>
  );
};

export default React.memo(ProductTab);
