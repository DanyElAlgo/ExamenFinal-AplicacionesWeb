import cart from "../Cart.js"
import orderAPI from "../Api/OrderApi.js";

export const CartCommand = {
    ADD: 'add',
    PLACE_ORDER: 'place-order'
};


export const CartCommandExecutor = {
    


    execute(command) {
        const counter = document.querySelector(".layout-page__icon-cart-count");

        switch(command.name){
            case CartCommand.ADD:
                cart.addItem(command.args.productId);
                
                counter.textContent = cart.getQuantity();
                counter.style.display = 'block';

                document.dispatchEvent(new Event("reload-cart"));

                break;

            case CartCommand.PLACE_ORDER:
                counter.style.display = 'none';
                
                const order = {
                    total: cart.getTotalPrice(),
                    products: cart.productMap
                };
                
                orderAPI.placeOrder(order);
            
                cart.clear();

                document.dispatchEvent(new Event("reload-cart"));
                
                break;
                
        }   
    }
}