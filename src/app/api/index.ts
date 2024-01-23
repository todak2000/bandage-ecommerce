import { httpRequest } from '@/utils/http';

const baseURL = 'https://dummyjson.com';

export const getProductCategories = async () => {
  return httpRequest(`${baseURL}/products/categories`, 'GET');
};

export const getProductByCategory = async (category: string) => {
  return httpRequest(`${baseURL}/products/category/${category}?limit=5`, 'GET');
};
export const getAllProducts = async (skip: number) => {
  return httpRequest(
    `${baseURL}/products?limit=5&skip=${skip.toString()}`,
    'GET',
  );
};

export const getSingleProduct = async (productId: string) => {
  return httpRequest(`${baseURL}/products/${productId}`, 'GET');
};
