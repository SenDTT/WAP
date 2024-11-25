function ToggleButton({id, inStock, updateProduct}: {id: number, inStock: boolean, updateProduct: (id: number) => void}) {
    return (
        <>
            <label className="switch">
                <input onChange={() => updateProduct(id)} type="checkbox" checked={inStock} />
                <span className="slider round"></span>
            </label>
        </>
    );
}

export default ToggleButton;