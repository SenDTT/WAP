import { IProduct } from "./ProductsList";
import ToggleButton from "./ToggleButton";

interface IProductProps extends IProduct {
    updateProduct: (id: number) => void
}

function Product ({ id, name, price, inStock, updateProduct }: IProductProps) {
    return (
        <tr className="tr-body">
            <td className="td-body">{`${id < 10 ? `0` : ''}${id}.` } </td>
            <td className={`${inStock ? 'in-stock' : 'out-of-stock'} td-body`}>{name}</td>
            <td className="td-body">${price}</td>
            <td className="td-body">
                <ToggleButton id={id} inStock={inStock} updateProduct={updateProduct} />
            </td>
        </tr>
    );
}

export default Product;