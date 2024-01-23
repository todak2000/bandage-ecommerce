/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import type { PayloadAction } from '@reduxjs/toolkit';
import { configureStore, createSlice } from '@reduxjs/toolkit';

import type { ICart, IProducts } from '@/types';

type StateProps = {
  categories: string[];
  products: IProducts[];
  allProducts: IProducts[];
  selectedCategory: string;
  product: IProducts;
  totalProducts: number;
  isCartOpen: boolean;
  isWishListOpen: boolean;
  cart: ICart[];
  wish: ICart[];
};
const initialCategories: string[] = [];
const initialProducts: IProducts[] = [];
type CartState = ICart[];
const initialCart: CartState = [];

type WishState = ICart[];
const initialWish: WishState = [];

const initialSingleProduct: IProducts = {
  id: 0,
  title: '',
  description: '',
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  brand: '',
  category: '',
  thumbnail: '',
  images: [],
};
// Category Slice
const CategorySlice = createSlice({
  name: 'categories',
  initialState: initialCategories,
  reducers: {
    setCategories: (_state: string[], action: PayloadAction<string[]>) => {
      return action.payload;
    },
  },
});

// TotalProducts Slice
const TotalProductsSlice = createSlice({
  name: 'totalProducts',
  initialState: 0,
  reducers: {
    setTotalProducts: (_state: number, action: PayloadAction<number>) => {
      return action.payload;
    },
  },
});

// Open Cart Slice
const OpenCartSlice = createSlice({
  name: 'isCartOpen',
  initialState: false,
  reducers: {
    setOpenCart: (_state: boolean, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

// Open WishList Slice
const OpenWishListSlice = createSlice({
  name: 'isWishListOpen',
  initialState: false,
  reducers: {
    setWishListOpen: (_state: boolean, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

// Selected Category Slice
const SelectedCategorySlice = createSlice({
  name: 'selectedCategory',
  initialState: '',
  reducers: {
    setSelectedCategory: (_state: string, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

// Product Slice
const ProductSlice = createSlice({
  name: 'products',
  initialState: initialProducts,
  reducers: {
    setProducts: (_state: IProducts[], action: PayloadAction<IProducts[]>) => {
      return action.payload;
    },
    updateProducts: (
      state: IProducts[],
      action: PayloadAction<IProducts[]>,
    ) => {
      return [...state, ...action.payload];
    },
    updateProductStock: (
      state: any,
      action: PayloadAction<{ id: number; change: number }>,
    ) => {
      const { id, change } = action.payload;
      const product = state.find((prod: any) => prod.id === id);
      if (product) {
        product.stock += change;
      }
    },
  },
});

// Wish Slice
const WishSlice = createSlice({
  name: 'wish',
  initialState: initialWish,
  reducers: {
    setWish: (_state: any, action: PayloadAction<any>) => {
      return action.payload;
    },
    updateWish: (state: any, action: PayloadAction<ICart>) => {
      const itemIndex: number = state.findIndex(
        (item: any) => item.id === action.payload.id,
      );
      if (itemIndex < 0) {
        state.push(action.payload);
      }
    },
    removeWish: (state, action: PayloadAction<number>) => {
      const itemIndex = state.findIndex((item) => item.id === action.payload);
      if (itemIndex >= 0) {
        state.splice(itemIndex, 1);
      }
    },
  },
});
// CartSlice
const CartSlice = createSlice({
  name: 'cart',
  initialState: initialCart,
  reducers: {
    setCart: (_state: ICart[], action: PayloadAction<ICart[]>) => {
      return action.payload;
    },

    addToCart: (state: any, action: PayloadAction<ICart>) => {
      const itemIndex: number = state.findIndex(
        (item: any) => item.id === action.payload.id,
      );
      if (itemIndex >= 0 && state[itemIndex] && state[itemIndex]?.quantity) {
        state[itemIndex].quantity += 1;
      } else {
        state.push(action.payload);
      }
    },
    increaseQuantity: (state: any, action: PayloadAction<number>) => {
      const itemIndex = state.findIndex(
        (item: any) => item.id === action.payload,
      );
      if (itemIndex >= 0) {
        state[itemIndex].quantity += 1;
      }
    },
    decreaseQuantity: (state: any, action: PayloadAction<number>) => {
      const itemIndex = state.findIndex(
        (item: any) => item.id === action.payload,
      );
      if (itemIndex >= 0 && state[itemIndex].quantity > 0) {
        state[itemIndex].quantity -= 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemIndex = state.findIndex((item) => item.id === action.payload);
      if (itemIndex >= 0) {
        state.splice(itemIndex, 1);
      }
    },
  },
});

// Product Slice
const SingleProductSlice = createSlice({
  name: 'product',
  initialState: initialSingleProduct,
  reducers: {
    setProduct: (_state: IProducts, action: PayloadAction<IProducts>) => {
      return action.payload;
    },
  },
});

export const { setCategories } = CategorySlice.actions;
export const { setProducts, updateProducts, updateProductStock } =
  ProductSlice.actions;
export const { setSelectedCategory } = SelectedCategorySlice.actions;
export const { setProduct } = SingleProductSlice.actions;
export const { setTotalProducts } = TotalProductsSlice.actions;
export const { setWishListOpen } = OpenWishListSlice.actions;
export const { setOpenCart } = OpenCartSlice.actions;
export const {
  setCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = CartSlice.actions;
export const { setWish, removeWish, updateWish } = WishSlice.actions;

const store = configureStore({
  reducer: {
    categories: CategorySlice.reducer,
    products: ProductSlice.reducer,
    selectedCategory: SelectedCategorySlice.reducer,
    product: SingleProductSlice.reducer,
    total: TotalProductsSlice.reducer,
    isWishListOpen: OpenWishListSlice.reducer,
    isCartOpen: OpenCartSlice.reducer,
    cart: CartSlice.reducer,
    wish: WishSlice.reducer,
  },
});

export default store;

export const categories = (state: StateProps) => state.categories;
export const products = (state: StateProps) => state.products;
export const product = (state: StateProps) => state.product;
export const selectedCategory = (state: StateProps) => state.selectedCategory;
export const totalProducts = (state: StateProps) => state.totalProducts;

export const isWishListOpen = (state: StateProps) => state.isWishListOpen;
export const isCartOpen = (state: StateProps) => state.isCartOpen;
export const cart = (state: StateProps) => state.cart;
export const wish = (state: StateProps) => state.wish;
