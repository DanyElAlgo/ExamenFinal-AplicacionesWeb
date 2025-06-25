import BaseHTMLElement from '../base/BaseHTMLElement.js';

class ModalMenu extends BaseHTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async init() {
        await this.loadHTML("/blocks/modalMenu/modalMenu.template");
        this.applyRoutes();
    }

    connectedCallback() {
        this.init();    
    }


    applyRoutes() {
        const modal = this.shadowRoot.querySelector(".modal-menu");
        
        modal.addEventListener("click", (event) => {
            if(!event.target.classList.contains("modal-menu__item"))
                return;
            
            event.preventDefault();
            const href = event.target.getAttribute("href");
            globalThis.app.router.go(href);
        })

    }
}


customElements.define("modal-menu", ModalMenu);

export default ModalMenu;