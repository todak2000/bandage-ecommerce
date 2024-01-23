/* eslint-disable import/no-extraneous-dependencies */
import { useQuery } from '@tanstack/react-query';

import {
  getAllProducts,
  getProductByCategory,
  getProductCategories,
  getSingleProduct,
} from '@/app/api';

// get all categories
export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => getProductCategories(),
  });
};

// get products by category
export const useGetProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', { category }],
    queryFn: async () => getProductByCategory(category),
    enabled: Boolean(category),
  });
};

// get all products
export const useGetAllProducts = (skip: number) => {
  return useQuery({
    queryKey: ['all-products', { skip }],
    queryFn: async () => getAllProducts(skip),
    // enabled: Boolean(skip),
  });
};

// get single product
export const useGetSingleProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', { productId }],
    queryFn: async () => getSingleProduct(productId),
    enabled: Boolean(productId),
  });
};
