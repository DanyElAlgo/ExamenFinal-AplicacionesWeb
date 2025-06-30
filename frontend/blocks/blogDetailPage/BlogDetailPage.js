import BaseHTMLElement from "../base/BaseHTMLElement.js";
import BlogList from "../../services/BlogList.js";
import { formatDateTime } from "../../utils/Time.js";
import authService from "../../services/AuthService.js";
import Command from "../../services/Command/Command.js";
import { BlogCommandExecutor, BLOG_COMMAND } from "../../services/Command/BlogCommand.js";

class BlogDetailPage extends BaseHTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/blogDetailPage/blogDetailPage.template");
        const blog = BlogList.instance.getById(this.dataset.blogId);

        const title = this.shadowRoot.querySelector(".blog-detail-page__header-title");
        const date = this.shadowRoot.querySelector(".blog-detail-page__date-content");
        const author = this.shadowRoot.querySelector(".blog-detail-page__description-author");

        title.textContent = blog.title;
        date.textContent = formatDateTime(new Date(blog.date));
        author.textContent = `Author: ${blog.users.name}`;

        const content = blog.content;

        this.renderPreview(content);

        if(authService.isLoggedIn() && blog.authorId== authService.getUserId()){
            this.enableEdit(content);
        }
    }


    enableEdit(content) {
        const preview = this.shadowRoot.querySelector(".blog-detail-page__description-preview");
        const editable = this.shadowRoot.querySelector(".blog-detail-page__description-editable");
        const title = this.shadowRoot.querySelector(".blog-detail-page__header-title");
        const formButton = this.shadowRoot.querySelector("form-button");


        formButton.hidden = false;

        title.contentEditable = true;
        editable.textContent = content;

        editable.addEventListener("input", () => {
            editable.style.height = editable.scrollHeight + "px";
        })
        
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

        formButton.addEventListener("click", (event) => {
            event.preventDefault();
            
            const command = new Command(BLOG_COMMAND.SAVE_BLOG, { blogId: this.dataset.blogId, title: title.textContent, content: editable.value });
            BlogCommandExecutor.execute(command);
            globalThis.app.router.go("/blog");
        })

    }

    renderPreview(content) {
        const text = content.split('\n');
        const preview = this.shadowRoot.querySelector(".blog-detail-page__description-preview");
        const lines = [];

        for(let line of text) {
            let newLine = "";

            if(line.startsWith("# ")) {
                newLine = `<h2 class="blog-detail-page__description--title">${line.substring(2)}</h1>`;        
            }
            else if(line.trim() === "" || line.trim() === "---") {
                newLine = `<br>`;
            }
            else {
                newLine = `<p class="blog-detail-page__description--paragraph">${line}</p>`;
            }

            lines.push(newLine);
        }

        preview.innerHTML = lines.join('');
    }

}

customElements.define("blog-detail-page", BlogDetailPage);
export default BlogDetailPage;
