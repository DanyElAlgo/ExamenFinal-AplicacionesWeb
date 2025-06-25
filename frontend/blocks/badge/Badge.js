import BaseHTMLElement from "../base/BaseHTMLElement.js";

class BadgeIcon extends BaseHTMLElement {
    
    constructor() {
        super();
    }

    connectedCallback() {
       this.init();
    }

    async init() {
        await this.loadHTML("/blocks/badge/badge.template");

        const imgElement = this.querySelector(".badge__icon");

        const svgPath = this.getAttribute("src");
        const width = this.getAttribute("width");
        const height = this.getAttribute("height");

        imgElement.src = svgPath;
        imgElement.width = width;
        imgElement.height = height;
    }
}

customElements.define("badge-icon", BadgeIcon);
export default BadgeIcon;