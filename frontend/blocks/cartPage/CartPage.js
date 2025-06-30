import BaseHTMLElement from '../base/BaseHTMLElement.js'
import cart from '../../services/Cart.js'
import ProductList from '../../services/ProductList.js'
import authService from '../../services/AuthService.js';
import Command from '../../services/Command/Command.js';
import { CartCommand, CartCommandExecutor } from '../../services/Command/CartCommand.js';

class CartPage extends BaseHTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML('/blocks/cartPage/cartPage.template');
        this.renderProducts();
        this.addListeners();
        
    }


    reloadCart = () => {
        this.renderProducts();
    }

    renderProducts() {
        const products = ProductList.instance.filterById(Object.keys(cart.productMap));
        const fragment = new DocumentFragment();
        const information = this.shadowRoot.querySelector(".cart-page__information");
        let totalNumber = 0;

        information.innerHTML = "";

        for(let product of products) {

            const priceNumber = Number(product.price);
            const quantity = Number(cart.productMap[product.id]);
            const productCard = document.createElement("product-card");

            totalNumber += (priceNumber * quantity);

            productCard.dataset.title = product.name;
            productCard.dataset.description = product.description;
            productCard.dataset.src = product.imageUrl;
            productCard.dataset.price = `$${priceNumber} X ${quantity} = $${priceNumber * quantity}`;
            productCard.dataset.productId = product.id;
            productCard.dataset.vegetarian = product.vegetarian;

            fragment.appendChild(productCard);
        }

        information.appendChild(fragment);


        if(products.length !== 0) {
            const template = this.shadowRoot.getElementById("cart-page__total-template");
            const element = template.content.cloneNode(true).firstElementChild;
            const totalPriceElement = element.querySelector(".cart-page__total-price");
            totalPriceElement.textContent = `$${totalNumber}`;

            information.appendChild(element);
        }
    }


    addListeners() {
        const formButton = this.shadowRoot.querySelector(".cart-page__form-button");
        const quantity = cart.getQuantity();

        formButton.addEventListener('click', () => {

            if(!authService.isLoggedIn())
                globalThis.app.router.go('/login');
            else if(quantity <= 0)
                console.log("No tienes productos añadidos");
            else {
                
                const command = new Command(CartCommand.PLACE_ORDER);
                CartCommandExecutor.execute(command);
                globalThis.app.router.go('/menu');
            }
            
        })

        document.addEventListener("reload-cart", this.reloadCart);
    }


    disconnectedCallback() {
        document.removeEventListener("reload-cart", this.reloadCart);
    }
}



customElements.define("cart-page", CartPage);
export default CartPage;