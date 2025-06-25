import Command from "./Command/Command.js";
import { CartCommand, CartCommandExecutor } from "./Command/CartCommand.js";
import authService from "./AuthService.js";


class Layout {

    init() {
        if(!authService.isLoggedIn()) {
            const personIcon = document.querySelector(".layout-page__account-icon");
            personIcon.style.display = 'none';
        }
        else {
            const registrationButton = document.querySelector(".layout-page__account-register");
            registrationButton.style.display = 'none';
        }

        const addButtonLayout = document.querySelector(".layout-page__add-button");

        addButtonLayout.addEventListener("click", () => {
            //alert(`Añadido al carrito el producto con Id = ${addButtonLayout.dataset.productId}`);
            const command = new Command(CartCommand.ADD, {productId: addButtonLayout.dataset.productId});
            CartCommandExecutor.execute(command);
        });

        const cartIcon = document.querySelector(".layout-page__account-icon--cart");

        cartIcon.addEventListener("click", () => {
            globalThis.app.router.go("/cart");
        });


        const registerButton = document.querySelector(".layout-page__account-register");

        registerButton.addEventListener("click", () => {
            globalThis.app.router.go("/signup")
        })
        
    }
}


const layout = new Layout();
export default layout;