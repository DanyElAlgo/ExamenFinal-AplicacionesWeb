import BaseHTMLElement from "../base/BaseHTMLElement.js";

class Button extends BaseHTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/button/button.template");
        
        const button = this.querySelector(".button");
        const title = this.dataset.title;
        button.textContent = title;
        
        if(this.dataset.focus) {
            this.lastElementChild.focus();
        }
    }

}


customElements.define("button-custom", Button);
export default Button;