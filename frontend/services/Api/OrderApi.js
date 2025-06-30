import { API_URL } from "../conf/BackendUrl.js";


class OrderAPI {
    
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async placeOrder(order) {
        

        try {
            const response = await fetch(`${this.baseUrl}/order`, {
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${localStorage.getItem("token")}`
                 },
                method: "POST",
                body: JSON.stringify(order)
            });

            const message = await response.text();

            if(!response.ok) {
                console.error(message);
            }
            else {
                console.log(message);
            }

        }
        catch(error) {
            console.error(error);
            throw new Error(error);
        }
    }
}

const orderAPI = new OrderAPI(API_URL);
export default orderAPI;