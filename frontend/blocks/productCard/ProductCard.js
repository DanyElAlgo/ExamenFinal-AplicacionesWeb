import BaseHTMLElement from "../base/BaseHTMLElement.js";
import Command from "../../services/Command/Command.js"
import { CartCommand, CartCommandExecutor } from "../../services/Command/CartCommand.js";
import { LAYOUT_COMMAND, LayoutCommandExecutor } from "../../services/Command/LayoutCommand.js"

class ProductCard extends BaseHTMLElement {

    constructor() {
        super();
    }

    async init() {
        await this.loadHTML("/blocks/productCard/productCard.template");

        const title = this.dataset.title;
        const description = this.dataset.description;
        const src = this.dataset.src;
        const price = this.dataset.price;
        const vegetarian = this.dataset.vegetarian;
    
        const titleElement = this.querySelector(".product-card__title");
        const descriptionElement = this.querySelector(".product-card__description");
        const imageElement = this.querySelector(".product-card__img");
        const priceElement = this.querySelector(".product-card__price");

        titleElement.innerHTML = `<span class="product-card__title-text">${title}</span>${vegetarian == "true" ? '<img class="product-card__leaf" alt="vegetarian icon" src="/assets/img/leaf.svg">' : ""}`;
        descriptionElement.textContent = description;
        imageElement.src = src;
        priceElement.textContent = `${price}`;

        this.applyListeners();
    }


    applyListeners() {
        const productId = this.dataset.productId;
        const title = this.dataset.title;
        const src = this.dataset.src;
        const addButton = this.querySelector(".product-card__add-button");
                
        addButton.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("add-item", {
                detail: {
                    productId: productId
                },
                bubbles: true,
                composed: true
            }));

            const command = new Command(CartCommand.ADD, { productId: productId});
            CartCommandExecutor.execute(command);
        });

        this.addEventListener("click", (event) => {
          
            if(event.target.closest(".product-card__add-button"))
                return;

            this.dispatchEvent(new CustomEvent("see-item", {
                detail: {
                    productId: productId
                },
                bubbles: true,
                composed: true
            }));

            const commands = [];
            commands.push(new Command(LAYOUT_COMMAND.CHANGE_BACKGROUND, { url: src, width: '64%', height: '94vh'}));
            commands.push(new Command(LAYOUT_COMMAND.CHANGE_TITLE, { title: title }));
            commands.push(new Command(LAYOUT_COMMAND.TOGGLE_ADD_BUTTON, { show: true, productId: productId }));
            
            LayoutCommandExecutor.multipleExecute(commands);
        });
    }

    connectedCallback() {
        this.init();    
    }

}


customElements.define("product-card", ProductCard);
export default ProductCard;