class BaseHTMLElement extends HTMLElement {

    constructor() {
        super();
    }


    async loadHTML(path) {
        const response = await fetch(path);
        const html = await response.text();

        this.shadowRoot ? this.shadowRoot.innerHTML = html : this.innerHTML = html;
    }

}

export default BaseHTMLElement;