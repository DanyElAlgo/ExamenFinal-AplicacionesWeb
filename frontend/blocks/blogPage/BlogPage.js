import BaseHTMLElement from "../base/BaseHTMLElement.js";
import blogAPI from "../../services/Api/BlogApi.js";
import BlogList from "../../services/BlogList.js";
import authService from "../../services/AuthService.js";
import { IMAGE_PAGES } from "../../services/conf/ImagePagesConst.js";

class BlogPage extends BaseHTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.init();
  }

  async init() {
    await this.loadHTML("/blocks/blogPage/blogPage.template");
    await this.getBlogs();

    const creatButton = this.shadowRoot.querySelector(
      ".blog-page__create-button"
    );

    if (authService.isLoggedIn()) {
      this.addNav();
      this.renderBlogs(
        BlogList.instance.blogs,
        this.normalCardAddEventListener,
        true,
        true
      );
      creatButton.classList.remove("blog-page__create-button--hidden");
      creatButton.classList.add("blog-page__create-button--show");

      creatButton.addEventListener("click", () => {
        globalThis.app.router.go("/blog/create");
      });
    } else {
      const nav = this.shadowRoot.querySelector(".blog-page__nav");

      nav.style.display = "none";
      this.renderBlogs(
        BlogList.instance.blogs,
        this.normalCardAddEventListener,
        true,
        false
      );
    }
  }

  async getBlogs() {
    BlogList.instance.setBlogs(await blogAPI.getAllBlogs());
  }

  renderBlogs(blogs, addEventListenerCard, clickeable, showStar) {
    const blogContainer = this.shadowRoot.querySelector(".blog-page__blogs");
    const fragment = new DocumentFragment();


    for (let blog of blogs) {
      const card = document.createElement("blog-card");

      card.dataset.title = blog.title;
      card.dataset.description = blog.description;
      card.dataset.authorId = blog.authorId;
      card.dataset.authorName = `Author: ${blog.users.name}`;
      card.dataset.date = blog.date;
      card.dataset.img = blog.imageUrl;
      card.dataset.favorite = blog.favorite;
      card.dataset.id = blog.id;

      if (clickeable) card.classList.add("blog-page__card--clickeable");

      if (showStar) card.dataset.showStar = "true";

      addEventListenerCard(card);

      fragment.appendChild(card);
    }

    blogContainer.appendChild(fragment);

    this.addTriggerLoader(blogs);
  }

  addTriggerLoader(blogs) {
    const blogContainer = this.shadowRoot.querySelector(".blog-page__blogs");
    const loaderTemplate = this.shadowRoot.getElementById("loader-template");
    if (loaderTemplate) {
      const loaderClone = loaderTemplate.content.cloneNode(true);
      const loaderTrigger = loaderClone.querySelector(".loader__trigger");
      blogContainer.appendChild(loaderTrigger);

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadMore(blogs);
          }
        });
      }, {
        threshold: 0.1
      });

      this.observer.observe(loaderTrigger);
    }
    else {
      console.warn("Loader template not found.");
    }
  }

  addNav() {
    const news = this.shadowRoot.getElementById("news");
    const favorites = this.shadowRoot.getElementById("favorites");
    const articles = this.shadowRoot.getElementById("articles");

    news.focus();

    news.addEventListener("click", () => {
      const blogContainer = this.shadowRoot.querySelector(".blog-page__blogs");
      blogContainer.innerHTML = "";
      this.renderBlogs(
        BlogList.instance.blogs,
        this.normalCardAddEventListener,
        true,
        true
      );
    });

    favorites.addEventListener("click", () => {
      const blogContainer = this.shadowRoot.querySelector(".blog-page__blogs");
      blogContainer.innerHTML = "";
      this.renderBlogs(
        BlogList.instance.getFavorites(),
        this.normalCardAddEventListener,
        true,
        true
      );
    });

    articles.addEventListener("click", () => {
      const blogContainer = this.shadowRoot.querySelector(".blog-page__blogs");
      blogContainer.innerHTML = "";
      this.renderBlogs(
        BlogList.instance.getMyArticles(),
        this.normalCardAddEventListener,
        true,
        false
      );
    });
  }

  normalCardAddEventListener(card) {
    card.addEventListener("click", (event) => {
      if (event.target.closest(".blog-card__like-button")) return;

      IMAGE_PAGES.BLOG_DETAIL_PAGE.url = card.dataset.img;
      IMAGE_PAGES.BLOG_DETAIL_PAGE.width = "963px";

      globalThis.app.router.go(`/blog/${card.dataset.id}`);
    });
  }
  
  async loadMore(blogs) {
    this.renderBlogs(
      blogs,
      this.normalCardAddEventListener,
      true,
      true
    );
    const loaderElement = this.shadowRoot.querySelector(".loader__trigger");
    if (loaderElement) {
      this.observer.unobserve(loaderElement);
    }
    const blogContainer = this.shadowRoot.querySelector(".blog-page__blogs");
    const previousLoader = blogContainer.querySelector(".loader__trigger");
    if (previousLoader) {
      previousLoader.remove();
    }
  }
}

customElements.define("blog-page", BlogPage);
export default BlogPage;