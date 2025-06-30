
const API_URL = import.meta.env.VITE_API_URL;

class BlogAPI {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getAllBlogs() {
        const url = `${this.baseUrl}/blog`;
        const response = await fetch(`${url}`, {
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

    async getBlogById(blogId) { 
        const url = `${this.baseUrl}/blog/${blogId}`;

        try {
            const response = await fetch(url);

            if(!response.ok)
                throw new Error("No se pudo encontrar el blog");

            const blog = await response.json();

            return blog;
        }
        catch(error) {
            console.error(error);
            throw new Error(error);
        }
        


    }

    async likeBlog(blogId) {
        const response = await fetch(`${this.baseUrl}/blog/like/${blogId}`, {
            headers: { "Authorization": `bearer ${localStorage.getItem("token") ?? ""}`},
            method: "POST"
        });

        if(!response.ok) {
            console.error("No se pudo actualizar los blogs");
        }
        else {
            console.log("Blog agregado a favoritos");
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
        else {
            console.log("Blog eliminado de favoritos");
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
}

const blogAPI = new BlogAPI(API_URL);
export default blogAPI;