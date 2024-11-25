type Product = {
    readonly id: number,
    title: string,
    descrition: string,
    category: string,
    price: number,
    stock: number,
    brand: string,
    sku: string
}

type APIResponse = {
    ok: boolean,
    data: Product | Product[] | null,
    msg?: string
}

const API_ENDPOINT: string = "https://dummyjson.com/products";

class ProductService {
    async get_products(skip: number, limit: number): Promise<APIResponse> {
        const data = await fetch(`${API_ENDPOINT}/?limit=${limit}&skip=${skip}&select=id,title`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        }).then(res => res.json())
        .then(res => {
            return {
                ok: true,
                data: res.products
            }
        }).catch(msg => {
            return {
                ok: false,
                data: null,
                msg: msg
            }
        });

        return data;
    }

    async get_product(id: number): Promise<APIResponse> {
        const data = await fetch(`${API_ENDPOINT}/${id}?select=title,description,category,price`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then(res => {
            return {
                ok: true,
                data: res
            }
        })
        .catch(msg => {
            return {
                ok: false,
                data: null,
                msg: msg
            }
        });
        return data;
    }

    async add_product(product: Partial<Product>): Promise<APIResponse> {
        const data = await fetch(`${API_ENDPOINT}/add`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        }).then(res => res.json())
        .then(res => {
            return {
                ok: true,
                data: res
            };
        })
        .catch(msg => {
            return {
                ok: false,
                data: null,
                msg: msg
            }
        });

        return data;
    }

    async update_product_title(id: number, new_title: string): Promise<APIResponse> {
        const data = await fetch(`${API_ENDPOINT}/${id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: new_title})
        }).then(res => res.json())
        .then(res => {
            return {ok: true, data: res};
        }).catch(msg => {
            return {
                ok: false,
                data: null,
                msg: msg
            }
        });

        return data;
    }

    async delete_product(id: number): Promise<APIResponse> {
        const data = await fetch(`${API_ENDPOINT}/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        }).then(res => res.json())
        .then(res => {
            return {ok: true, data: null};
        })
        .catch(msg => {
            return {ok: false, data: null, msg};
        });

        return data;
    }
}

const prodService = new ProductService();
prodService.get_products(0, 30).then(console.log);
prodService.get_product(29).then(console.log);
prodService.add_product({
    title: "Test - Add Product",
    descrition: "only for test",
    price: 3.4,
    brand: "H7M",
    sku: 'E30FK',
    stock: 10
}).then(console.log);
prodService.update_product_title(1, "Test - Edit Title").then(console.log);
prodService.delete_product(1).then(console.log);