import BaseHTMLElement from '../base/BaseHTMLElement.js'

class FrontPage extends BaseHTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
       this.init();
    }

    async init() {
        await this.loadHTML('/blocks/frontPage/frontPage.template');

        this.addListeners();
    }

    addListeners() {

        const badgeMenu = this.shadowRoot.querySelector(".front-page__badge-menu");
        const badgeReservation = this.shadowRoot.querySelector(".front-page__badge-reservation");
        const badgeRestaurant = this.shadowRoot.querySelector(".front-page__badge-restaurant");

        badgeMenu.addEventListener("click", () => {
            globalThis.app.router.go("/menu");
        });

        badgeReservation.addEventListener("click", () => {
            globalThis.app.router.go("/book");
        });

        badgeRestaurant.addEventListener("click", () => {
            globalThis.app.router.go("/about");
        });
    }
}


customElements.define("front-page", FrontPage);

export default FrontPage;