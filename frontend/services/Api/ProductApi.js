import { API_URL } from "../conf/BackendUrl.js";

class ProductAPI {
    
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }


    async getProducts() {

        if(localStorage.getItem("products")) {
            return JSON.parse(localStorage.getItem("products"));
        }

        const response = await fetch(`${this.baseUrl}/product`);

        if(!response.ok) {
            console.error(response.status, "Error al obtener los productos");
            return [];
        }

        const data = await response.json();
        localStorage.setItem("products", JSON.stringify(data.products));
        
        return data.products;
    }
}


const productAPI = new ProductAPI(API_URL);
export default productAPI;