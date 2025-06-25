import BaseHTMLElement from "../base/BaseHTMLElement.js"


class AboutPage extends BaseHTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/aboutPage/aboutPage.template");
    }
}


customElements.define("about-page", AboutPage);
export default AboutPage;