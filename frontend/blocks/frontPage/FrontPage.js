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
    }
}


customElements.define("front-page", FrontPage);

export default FrontPage;