import BaseHTMLElement from "../base/BaseHTMLElement.js";

class ContactPage extends BaseHTMLElement {
    
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/contactPage/contactPage.template");

        const route = this.shadowRoot.querySelector("badge-icon");
        route.addEventListener("click", () => {
            window.open("https://www.google.com/maps");
        })
    }
}

customElements.define("contact-page", ContactPage);
export default ContactPage;