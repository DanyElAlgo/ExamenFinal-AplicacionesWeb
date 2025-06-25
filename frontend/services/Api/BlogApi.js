class BlogAPI {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }


    async getAllBlogs() {
        const response = await fetch(`${this.baseUrl}/blogs.json`);
        
        if(!response.ok)
            console.error("Error al obtener los blogs");

        return await response.json();
    }


    async getBlogsByAuthor(userId) {
        const response = await fetch(`${this.baseUrl}/blogs.json`);
        
        if(!response.ok)
            console.error("Error al obtener los blogs");

        const blogs = await response.json();

        blogs = blogs.filter(blog => blog.author.id == userId);

        return blogs;
    }


    async getFavoriteBlogs(userId) {
         const response = await fetch(`${this.baseUrl}/blogs.json`);
        
        if(!response.ok)
            console.error("Error al obtener los blogs");

        const blogs = await response.json();

        blogs = blogs.filter(blog => blog.favorite == true);

        return blogs;
    }
}

const blogAPI = new BlogAPI("/data");
export default blogAPI;