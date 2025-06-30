import { API_URL } from "../conf/BackendUrl.js";

class BlogAPI {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getAllBlogs() {
        const response = await fetch(`${this.baseUrl}/blog`, {
            method: "GET",
            headers: { "Authorization": `bearer ${localStorage.getItem("token") ?? ""}`}
        });
        
        if(!response.ok) {
            console.error("Error al obtener los blogs");
            return [];
        }
        
        const data = await response.json();

        return data;
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

    async likeBlog(blogId) {
        const response = await fetch(`${this.baseUrl}/blog/like/${blogId}`, {
            headers: { "Authorization": `bearer ${localStorage.getItem("token") ?? ""}`},
            method: "POST"
        });

        if(!response.ok) {
            console.error("No se pudo actualizar los blogs");
        }
    }

    async unlikeBlog(blogId) {
         const response = await fetch(`${this.baseUrl}/blog/unlike/${blogId}`, {
            headers: { "Authorization": `bearer ${localStorage.getItem("token") ?? ""}`},
            method: "DELETE"
        });

        if(!response.ok) {
            console.error("No se pudo actualizar los blogs");
        }
    }

    async saveBlog(blogId, newTitle, newContent) {

        const response = await fetch(`${this.baseUrl}/blog`, {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `bearer ${localStorage.getItem("token") ?? ""}`
            },
            method: "PUT",
            body: JSON.stringify({
                id: blogId,
                title: newTitle,
                content: newContent
            })
        });

        if(!response.ok){
            console.error("No se pudo actualizar el blog");
        }
    }

    async createBlog(blog) {
        const url = `${this.baseUrl}/blog`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${localStorage.getItem("token") ?? ""}`
            },
            body: JSON.stringify(blog)
        });

        if(!response.ok) {
            throw new Error("No fue posible crear el blog");
        }
    }
}

const blogAPI = new BlogAPI(API_URL);
export default blogAPI;