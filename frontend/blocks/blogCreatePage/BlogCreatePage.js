import BaseHTMLElement from "../base/BaseHTMLElement.js";
import blogAPI from "../../services/Api/BlogApi.js";

class BlogCreatePage extends BaseHTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }


    connectedCallback() {
        this.init();
    }

    async init () {
        await this.loadHTML("/blocks/blogCreatePage/blogCreatePage.template");

        const preview = this.shadowRoot.querySelector(".blog-create-page__description-preview");
        const editable = this.shadowRoot.querySelector(".blog-create-page__description-editable");
        const createButton = this.shadowRoot.querySelector(".blog-create-page__save-button");

        preview.addEventListener("click", () => {
            preview.hidden = true;
            editable.hidden = false;
            editable.focus();

            editable.style.height = editable.scrollHeight + "px";
        });

        editable.addEventListener("blur", () => {
            preview.hidden = false;
            editable.hidden = true;

            this.renderPreview(editable.value);
        });

        editable.addEventListener("input", () => {
            editable.style.height = editable.scrollHeight + "px";
        });

        createButton.addEventListener("click", () => {
            this.submitForm();
        })
    }

    renderPreview(content) {
        const text = content.split('\n');
        const preview = this.shadowRoot.querySelector(".blog-create-page__description-preview");
        const lines = [];

        for(let line of text) {
            let newLine = "";

            if(line.startsWith("# ")) {
                newLine = `<h2 class="blog-create-page__description--title">${line.substring(2)}</h1>`;        
            }
            else if(line.trim() === "" || line.trim() === "---") {
                newLine = `<br>`;
            }
            else {
                newLine = `<p class="blog-create-page__description--paragraph">${line}</p>`;
            }

            lines.push(newLine);
        }

        preview.innerHTML = lines.join('');
    }


    async submitForm() {
        const title = this.shadowRoot.querySelector(".blog-create-page__header-title");
        const description = this.shadowRoot.querySelector(".blog-create-page__description--small");
        const content = this.shadowRoot.querySelector(".blog-create-page__description-editable");
        const imageUrl = this.shadowRoot.querySelector('[name="imageUrl"]');

        const blog = {
            title: title.textContent,
            description: description.textContent,
            content: content.value,
            imageUrl: imageUrl.value
        };

        await blogAPI.createBlog(blog);
        globalThis.app.router.go("/blog");
    }
}

customElements.define("blog-create-page", BlogCreatePage);
export default BlogCreatePage;