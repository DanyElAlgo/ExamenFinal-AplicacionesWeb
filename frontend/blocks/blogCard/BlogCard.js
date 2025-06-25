import BaseHTMLElement from "../base/BaseHTMLElement.js";
import { formatDateTime } from "../../utils/Time.js";
import Command from "../../services/Command/Command.js";
import { BlogCommandExecutor, BLOG_COMMAND } from "../../services/Command/BlogCommand.js";

class BlogCard extends BaseHTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/blogCard/blogCard.template");

        const title = this.dataset.title;
        const description = this.dataset.description;
        const authorId = this.dataset.authorId;
        const authorName = this.dataset.authorName;
        const date = this.dataset.date;
        const img = this.dataset.img;
        const favorite = this.dataset.favorite;
        const showStar = this.dataset.showStar;
        const id = this.dataset.id;


        const imgElement = this.querySelector(".blog-card__image");
        const dateElement = this.querySelector(".blog-card__date-content");
        const titleElement = this.querySelector(".blog-card__title");
        const descriptionElement = this.querySelector(".blog-card__description");
        const authorElement = this.querySelector(".blog-card__author");

        imgElement.src = img;
        dateElement.textContent = formatDateTime(new Date(date));
        titleElement.textContent = title;
        descriptionElement.textContent = description;
        authorElement.textContent = authorName;

        const star = this.querySelector(".blog-card__logo-star");

        if(favorite == "true") {
            star.src = "/assets/img/star.svg";
        }
        else {
            star.src = "/assets/img/star-not-filled.svg";
        }

        star.parentElement.addEventListener("click", (event) => {
            const liked = star.src.includes("/assets/img/star.svg");
            star.src = ( liked ? "/assets/img/star-not-filled.svg" : "/assets/img/star.svg");
            let command;

            if(liked) {
                command = new Command(BLOG_COMMAND.REMOVE_FAVORITE, { blogId: id});
            }
            else {
                command = new Command(BLOG_COMMAND.ADD_FAVORITE, { blogId: id });
            }


            BlogCommandExecutor.execute(command);
        })

        if(showStar != "true") {
            star.parentElement.style.display = "none";
        }

    }

    showStar() {

    }
}

customElements.define("blog-card", BlogCard);
export default BlogCard;