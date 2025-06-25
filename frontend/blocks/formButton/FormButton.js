import BaseHTMLElement from "../base/BaseHTMLElement.js"

class FormButton extends BaseHTMLElement {
    constructor() {
        super();
        
    }

    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/formButton/formButton.template");

        const button = this.querySelector(".form-button");
        button.textContent = this.dataset.title;
        button.disabled = this.dataset.state == "disabled";

    }


    attributeChangedCallback(name, oldValue, newValue) {
        const button = this.querySelector(".form-button");

        if(!button)
            return;

        if(name == "data-state")
            button.disabled = newValue === "disabled";
        
    }

    static get observedAttributes() {
        return ['data-state'];
    }
}


customElements.define("form-button", FormButton);
export default FormButton;