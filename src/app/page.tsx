import type { Metadata } from 'next';
import * as React from 'react';

import CallToActionSection from '@/components/shop/CallToActionSection';
import FeatureSection from '@/components/shop/FeatureSection';
import Herosection from '@/components/shop/HeroSection';
import PostsSection from '@/components/shop/PostsSection';
import ServiceSection from '@/components/shop/ServiceSection';

export const metadata: Metadata = {
  title: 'Bandage| Home',
};

export default function HomePage() {
  return (
    <>
      <Herosection />
      <FeatureSection />
      <ServiceSection />
      <PostsSection />
      <CallToActionSection />
    </>
  );
}
