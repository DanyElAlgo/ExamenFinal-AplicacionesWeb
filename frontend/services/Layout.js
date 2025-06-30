import Command from "./Command/Command.js";
import { CartCommand, CartCommandExecutor } from "./Command/CartCommand.js";
import authService from "./AuthService.js";


class Layout {

    init() {
        const personIcon = document.querySelector(".layout-page__account-icon");
        const registrationButton = document.querySelector(".layout-page__account-register");
        personIcon.style.display = 'flex';
        registrationButton.style.display = 'inline-block';

        if(!authService.isLoggedIn()) {
            personIcon.style.display = 'none';
        }
        else {
            registrationButton.style.display = 'none';
        }
    }


    addListeners() {
        const personIcon = document.querySelector(".layout-page__account-icon");
        const addButtonLayout = document.querySelector(".layout-page__add-button");
        const cartIcon = document.querySelector(".layout-page__account-icon--cart");
        const registerButton = document.querySelector(".layout-page__account-register");

        personIcon.addEventListener("click",() => {
            document.dispatchEvent(new Event("sign-out"));
        });

        addButtonLayout.addEventListener("click", () => {
            //alert(`Añadido al carrito el producto con Id = ${addButtonLayout.dataset.productId}`);
            const command = new Command(CartCommand.ADD, {productId: addButtonLayout.dataset.productId});
            CartCommandExecutor.execute(command);
        });

        registerButton.addEventListener("click", () => {
            globalThis.app.router.go("/signup")
        });

        cartIcon.addEventListener("click", () => {
            globalThis.app.router.go("/cart");
        });
    }

}


const layout = new Layout();
export default layout;