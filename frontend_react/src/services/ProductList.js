class ProductList {

    #products = [];

    get products() {
        return this.#products;
    }

    static instance = null;
    static {
        this.instance = new ProductList();
    }

    constructor(){
        if(ProductList.instance)
            throw new Error("Ya existe una instancia de la clase");
    }

    filterByCategory(categoryId){
        return this.#products.filter(product => product.categoryId == categoryId);
    }

    setProducts(newProducts) {
        this.#products = newProducts;
    }

    filterById(productIds) {
        const ids = new Set(productIds.map(id => Number(id)));
        return this.#products.filter(product => ids.has(product.id));
    }


    groupByCategories() {
        const result = {};

        for(let product of this.#products) {
            const categoryId = product.categoryId;

            if(!result[categoryId])
                result[categoryId] = [];

            result[categoryId].push(product);
        }

        return result;
    }
    
}


export default ProductList;