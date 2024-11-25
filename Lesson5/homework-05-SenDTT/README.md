[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/jGg_e8UY)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=16935543)
## CS472-Homework-05-Async
## Coding Exercise 01
Implement the code for `Meditation` class. The `start()` method prints a countdown every 1 second. To be used as follows:
```typescript
const morning_meditation = new Meditation(5);
morning_meditation.start();
console.log(`Start meditation`);

// Start meditation
// 5
// 4
// 3
// 2
// 1
// Jay Guru Dev
```

## Coding Exercise 02
Using Fetch API, write functions that implement the following CRUD operations on the products API from `https://dummyjson.com/products`:
* Get all products: `get_products(skip: number = 0, limit: number = 30)` Print list of product titles only, with pagination (30 products each page). Use [limit and skip](https://dummyjson.com/docs/products#products-limit_skip) query parameters.
* Get a single product: `get_product(id: number)` Print JSON with `{title, description, category, price}`.
* Add a new product: `add_product(product: Partial<Product>)` return `{ok: boolean}`
* Update a product title: `update_product_title(id: number, new_title: string)` return `{ok: boolean}`
* Delete a product: `delete_product(id: number)` return `{ok: boolean}`
  
Make sure you [type the response](https://transform.tools/json-to-typescript). 
