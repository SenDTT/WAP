import { useState } from "react";
import Product from "./Product";

export interface IProduct { id: number, name: string, price: number, inStock: boolean; };

function ProductsList() {
    const [products, setProducts] = useState<IProduct[]>([
        { id: 1, name: 'Apple', price: 1, inStock: true },
        { id: 2, name: 'Banana', price: 1, inStock: false },
        { id: 3, name: 'Cherry', price: 2, inStock: true },
    ]);

    const updateProduct = (id: number) => {
        const updatedProducts = products.map((prod) => {
            if (prod.id == id) {
                prod.inStock = !prod.inStock;
            }

            return prod;
        });

        setProducts(updatedProducts);
    }

    return (
        <table className="products-table">
            <thead>
                <tr className="tr-head">
                    <th className="min-w-20">No.</th>
                    <th className="min-w-20">Name</th>
                    <th className="min-w-20">Price</th>
                    <th className="min-w-20">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((value) => {
                    return (
                        <Product {...value} updateProduct={updateProduct} key={value.id} />
                    )
                })}
            </tbody>
        </table>
    );
}

export default ProductsList;