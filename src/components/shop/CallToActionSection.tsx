/* eslint-disable import/no-extraneous-dependencies */

'use client';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import type { NextPage } from 'next';
import React from 'react';

const CallToActionSection: NextPage = () => {
  return (
    <section
      data-testid="call-wrapper"
      className="call2action-bg  flex h-[640px] flex-col items-center justify-center gap-[1rem] p-8 md:p-28 md:pt-0"
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <p
          data-testid="call-item"
          className="text-center text-sm font-bold text-primary-blue"
        >
          Designing Better Experience
        </p>
        <h1
          data-testid="call-item"
          className="text-center text-[2.5rem] font-bold text-primary-black md:w-2/3"
        >
          Problems trying to resolve the conflict between
        </h1>
        <p
          data-testid="call-item"
          className="text-center text-sm text-secondary-black md:w-2/3"
        >
          Problems trying to resolve the conflict between the two major realms
          of Classical physics:{' '}
        </p>
        <h3
          data-testid="call-item"
          className=" text-center text-2xl text-primary-green"
        >
          $16.48
        </h3>
        <button
          data-testid="call-button"
          type="button"
          className="rounded-[5px] bg-primary-blue px-10 py-4 font-bold text-white"
        >
          ADD YOUR CALL TO ACTION
        </button>
      </div>
    </section>
  );
};

export default React.memo(CallToActionSection);
