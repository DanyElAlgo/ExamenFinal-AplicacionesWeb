import authService from "./AuthService.js";

class BlogList {

    #blogs = [];

    get blogs() {
        return this.#blogs;
    }

    static instance = null;

    static {
        this.instance = new BlogList();
    }

    constructor() {
        if(this.instance)
            throw new Error("Ya existe una instancia");
    }

    setBlogs(blogs) {
        this.#blogs = blogs;
    }

    getFavorites() {
        const favoriteBlogs = this.#blogs.filter(blog => blog.favorite == true);
        return favoriteBlogs;
    }

    getMyArticles() {
        const myArticles = this.#blogs.filter(blog => blog.authorId == authService.getUserId());
        return myArticles;
    }


    addFavorite(blogId) {
        const newFavoriteBlog = this.#blogs.find(blog => blog.id == blogId);
        newFavoriteBlog.favorite = true;
    }

    removeFavorite(blogId) {
        const newFavoriteBlog = this.#blogs.find(blog => blog.id == blogId);
        newFavoriteBlog.favorite = false;
    }

    getById(blogId) {
        return this.#blogs.find(blog => blog.id == blogId);
    }

    saveBlog(blogId, newTitle, newContent) {
        const blog = this.getById(blogId);

        blog.title = newTitle;
        blog.content = newContent;
    }

    
}

export default BlogList;