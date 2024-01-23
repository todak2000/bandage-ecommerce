/* eslint-disable import/no-extraneous-dependencies */
import type { ReactElement } from 'react';

export interface INavbar {
  id: number;
  name: string;
  redirectLink: string;
  isDropdown: boolean;
  dropDownOptions?: string[] | null;
}

export interface IService {
  id: number;
  icon?: ReactElement | null;
  title?: string;
  text?: string;
  image?: string;
}
export interface ICarousel {
  id: number;
  avatar: string;
  rating: number;
  comment: string;
  name: string;
  portfolio: string;
}
export interface ICart {
  id: number;
  title: string;
  price: number;
  quantity: number;
  stock: number;
  thumbnail: string;
}
export interface IWishList {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export interface IProducts {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
export interface INavbarOptions {
  id?: number;
  icon?: ReactElement | string;
  value?: number;
  callback?: any;
}
export interface IBannerOptions {
  id: number;
  data: string | IBannerDataOptions;
}

export interface IBannerDataOptions {
  text: string | null;
  icons?: IIconOptions[];
}
export interface IIconOptions {
  idx: number;
  name: string | null;
  icon: ReactElement | null;
}

export interface IFooterOptions {
  idx: number;
  title: string;
  links: IFooterLinksOptions[];
}
export interface IFooterLinksOptions {
  id: number;
  name: string | null;
  url: string;
}
