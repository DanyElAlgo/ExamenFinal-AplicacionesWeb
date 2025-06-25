class Cart {

    #productMap = {};

    get productMap() {
        return this.#productMap;
    }

    addItem(productId) {
        if(!this.#productMap[productId])
            this.#productMap[productId] = 0;

        this.#productMap[productId] += 1;

        console.log(this.#productMap);
    }

    isEmpty(){
        return Object.keys(this.#productMap) === 0;
    }

    getQuantity() {
        return Object.values(this.#productMap).reduce((sum, quantity) => sum + quantity, 0);
    }


    clear() {
        this.#productMap = {};
    }

}


const cart = new Cart();
export default cart;