[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/h90iqbgD)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17090952)
## CS472-Homework-09-React
Create a React application that displays a list of products. Each product should have a `name`, `price`, and an `in stock` status. Users should be able to toggle the `inStock` status of a product by clicking a button.

```typescript
interface IProduct { id: number, name: string, price: number, inStock: boolean; };

const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Apple', price: 1, inStock: true },
    { id: 2, name: 'Banana', price: 1, inStock: false },
    { id: 3, name: 'Cherry', price: 2, inStock: true },
  ]);
```

## Styling:
Create a CSS file to style the components and import this CSS file into your components.
```css
.out-of-stock {
  color: red;
}

.in-stock {
  color: green;
}
```
## `App` Component
* The application container, which renders the `ProductsList` component.

## `ProductsList` Component:
* The list of products is declared within the `ProductsList` component state.
* Create the `ProductsList` component and display each product using a re-usable `Product` component.
* Each product should display its `name`, `price`, and `inStock` status.
* Use conditional rendering to display the product name in red if it is not in stock, and in green otherwise.

## `Product` Component:
* Create a `Product` component that displays an individual product.
* Use props and props spread to pass down the product data.
  
## Event Handling:
* Add a button to the `Product` component to toggle the in stock status of the product.
