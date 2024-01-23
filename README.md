# Bandage E-Commerce Store


Introducing a user-friendly e-commerce website with a minimalist design. Our platform features two main pages: the Homepage and the Product Details page. The Homepage showcases a dynamic product list, sourced from an API, alongside static content. The Product Details page offers comprehensive information about each product. Users can add items to their cart or wishlist, with data persisting even after refreshing or reopening the page. Our website also includes convenient popups for the cart and wishlist. We prioritize accuracy, code discipline, and cleanliness, striving for high-quality implementation and excellent Lighthouse scores.

![Image bandage](public/bandage.png)


## LightHouse Score
![Light house score - Desktop](lighthouse_results/desktop/pagespeed.svg)


[LIGHTHOUSE SCORE LINK](https://htmlpreview.github.io/?https://github.com/todak2000/bandage-ecommerce/blob/main/lighthouse_results/desktop/bandage_ecommerce_rho_vercel_app_.html)

## URL

https://bandage-ecommerce-rho.vercel.app

## Built with

- ⚡️ Next.js 13
- ⚛️ React 18
- ✨ TypeScript
- 💨 Tailwind CSS 3
- ✨ Redux toolkit
- ✨ React Query
- ✨ React-Share
- ✨ localForage
- 🃏 Jest — Configured for unit testing

## Screens/Pages

This project implements the following Pages/Screens:

- 💎 Homepage: The dynamic content on the Homepage is the products list section, which comes from an API. The rest of the contents are static. Users can:
    - View Main page
    - Click on any of the links in the navbar. Onclick 'Shop caret', a drop down list of product categories is displayed. Further click of any of the categories, will update the UI with category's products.
    - Click on the Cart Icon to display Cart List
    - Click on the Love Icon to display Wish List
    - Click on any product to naviagte to product details page
    - Click on 'LOAD MORE PRODUCTS' Button to load more product items until button disappears upon reach the end of the product list

- 💎 Product Details Page: This page has dynamic content related to product details and a static ‘best seller’ section. Users can
    - View and Navigate the different Product images on the carousel
    - Click on Similar product image offerings under the main product Image and in the 'BESTSELLER PRODUCTS' section
    - View Description, Additional Information and Review of product 
    - Click on Add to Cart Icon to add product to cart upon which user is notified at the bottom right corner snackbar
    - Click on Add to Wish List Icon to add product to Wish list upon which user is notified at the bottom right corner snackbar
- 💎 Cart Popup: This popup was designed to manage list of products added to the cart. Users can:
    - View list of already added items
    -  Increase/Decrease quantity of a particular product until the stock value is reached. Upon reachin the product stock value, Users can no longer add more product and would be notified. Upon attemting to decrease lower than 1, users wont be able to succesfully decrease product quantity and would as well be notified.
    - Minimize/Maximize Cart popup
    - View no of items and total amount in the Cart at the Header Nav of the Cart Popup
    - Click on the Close button to close the Cart
- 💎 Wish List Popup: This popup was designed to manage list of products added to the Wish List. Users can:
    - View list of already added items
    - Minimize/Maximize Cart popup
    - View no of items in the Wish List at the Header Nav of the Wish List Popup
    - Click on the Close button to close the Wish List

## Features

This project implements the following features:
- 💎 Pagination: The product list on the Homepage supports pagination without refreshing the page. This was managed using react-query library for seamless fetching of data with optimum efficiency. See `src/utils/hooks.ts` for details.
- 💎 Cart and Wishlist Minimize and Maximize: Users can minimize or maximize the popups as deem fit specially when scrolling throug products, thus providing a more efficient user experience.
- 💎 Data Persistence: The data in the cart and wishlist persist even after refreshing or reopening the page. This feature was managed using IndexDB as provided on browsers via the localForage library. See `src/utils/persistentStorage.ts` for details. This allow for users to always have their cart/wish list consistent at all times even if their devices are offline. Provided its same device and browser, the data will persist.

## Getting Started

To run this project locally, you will need to have Node.js, preferably version 20,  npm, and TypeScript installed on your machine. 

## Installation

Clone this repository to your local machine:

```
git clone https://github.com/todak2000/bandage-ecommerce.git

```

Navigate to the project directory and install the dependencies:

```
cd bandage-ecommerce
yarn install
```

## Development

Jest was used to implement unit Tests. see `__tests__`  to  run full test on all components. Run the following command:

```
yarn test
```

For specific components. Run the following command:

```
yarn test __tests__/unit/<TESTFILE>
```

e.g.`yarn test __tests__/unit/NavBar.test.tsx` where `<TESTFILE>` = `NavBar.test.tsx`.

## Development

To start the development server, run the following command:

```
yarn dev
```

The website will be available at http://localhost:3000.

## API Functions documentation

Refer to the API documentation

`src/app/api/README.md` - [CLICK HERE](src/app/api/README.md)

## Deployment

This app was deployed to vercel

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Made with ♥ by [Daniel Olagunju](https://github.com/todak2000) [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/cloudposse.svg?style=social&label=Follow%20%40todak)](https://twitter.com/todak)

---


