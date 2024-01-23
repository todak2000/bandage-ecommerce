import type { Metadata } from 'next';

import ProductCard from '@/components/product/ProductCard';
import Sponsors from '@/components/product/Sponsors';
import FeatureSection from '@/components/shop/FeatureSection';

export const metadata: Metadata = {
  title: 'Bandage| Product Details',
};

export default function ProductPage() {
  return (
    <>
      <ProductCard />
      <span className="hidden md:flex">
        <FeatureSection />
      </span>
      <Sponsors />
    </>
  );
}
