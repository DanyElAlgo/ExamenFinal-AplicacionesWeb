import BaseHTMLElement from "../base/BaseHTMLElement.js";

class Navbar extends BaseHTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async init() {
        await this.loadHTML("/blocks/navbar/navbar.template");
        const modalMenu = this.shadowRoot.querySelector("modal-menu");
        const openButton = this.shadowRoot.querySelector(".navbar__menu-toggle");

        openButton.addEventListener("click", () => {
            modalMenu.classList.remove("navbar__modal-menu--hide");
        });


        modalMenu.shadowRoot.addEventListener("click", (event) => {
            if(!event.target.classList.contains("modal-menu__item"))
                return;

            modalMenu.classList.add("navbar__modal-menu--hide");
        })

        this.applyRoutes();
    }

    connectedCallback() {
        this.init();
    }


    applyRoutes() {
        const listLinks = this.shadowRoot.querySelector(".navbar__menu");
        const logo = this.shadowRoot.querySelector(".navbar__logo");

        listLinks.addEventListener("click", (event) => {
            if(!event.target.classList.contains("navbar__menu-item"))
                return;

            event.preventDefault();
            const href = event.target.getAttribute("href");

            globalThis.app.router.go(href);
        });


        logo.addEventListener("click", (event) =>{
            event.preventDefault();
            globalThis.app.router.go("/");
        });
    }

}

customElements.define("navbar-menu", Navbar);

export default Navbar;