# Bandage API Functions documentation

This is the Offical API documentation for a Bandage, an e-commerce, user-friendly e-commerce website with a minimalist design.  Bandage API using React Query, React toolkit and other fetching data from an external endpoint. The project aims to create a user-friendly website can read product listings, add items to their cart or wishlist, with data persisting even after refreshing or reopening the page

External API Documentation
https://dummyjson.com/docs/




## Installation

Provided you follow the instructions [here](README.md): `https://github.com/todak2000/bandage-ecommerce/blob/main/README.md`. you have nothing else to do

## Endpoints Functions

This project implements the following features endpoints:

**1. getProductCategories()**

**Description:**

This function fetches the product categories.

**Parameters:**

None

**Returns:**

A promise that resolves with the product categories.

```
 data: string []
  
```

**2. getProductByCategory(category)**

**Description:**

This function fetches the products of a specific category.

**Parameters:**

The category of the products.
```
category: string

```

**Returns:**

A promise that resolves with the products of the specified category.

```
 data: object []
  
```

**3. getAllProducts(skip)**

**Description:**

This function fetches all the products with pagination.

**Parameters:**

The number of products to skip.
```
skip: number

```

**Returns:**

A promise that resolves with the products.

```
 data: object []

```


**4. getSingleProduct(productId)**

**Description:**

This function fetches the details of a single product.

**Parameters:**

The ID of the product.
```
productId: number

```

**Returns:**

A promise that resolves with the product details.

```
 data: object

```


## Technologies Used

This project uses the following technologies:

- 🎉 LocalForage - A IndexDB library for seamless
- 🎉 React Query - A library for fetching, caching, and updating data in React applications.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

[Daniel Olagunju](https://github.com/todak2000)
