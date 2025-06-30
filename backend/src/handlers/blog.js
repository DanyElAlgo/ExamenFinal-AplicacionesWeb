import prisma from "../db.js";
import jwt from "jsonwebtoken"

export const getBlogs = async (req, res) => {
    const bearer = req.headers.authorization;
   
    let payload = null;
    let blogs = null;
    let userId = -1;

    if(bearer && bearer.split(" ")[1]) {
        const token = bearer.split(" ")[1];
        payload = jwt.verify(token, process.env.JWT_SECRET);
        userId = payload.id;

        blogs = await prisma.blog.findMany({
            include: {
                favoriteBlogs: {
                    where: {
                        userId: userId
                    }
                },
                users: {
                    select: {
                        name: true
                    }
                }
            }
        });
    }
    else {
        blogs = await prisma.blog.findMany({
            include: {
                users: {
                    select: {
                        name: true
                    }
                }
            }
        });
    }

    blogs = blogs.map(blog => {

        let favorite = true;

        if(!blog.favoriteBlogs || blog.favoriteBlogs.length === 0){ 
            favorite = false;
        }
            
        delete blog.favoriteBlogs;

        return {
            ...blog,
            content: blog.content.replace(/\\n/g, "\n"),
            favorite: favorite
        }
    })

    res.json(blogs);
}


export const getBlog = async(req, res) => {
    const blogId = Number(req.params["id"]);

    let blog = await prisma.blog.findUnique({
        where: {
            id: blogId
        },
        include: {
            users: {
                select: {
                    name: true
                }
            }
        }
    });

    if(Object.is(blog, null))
        res.sendStatus(404);

    blog = {
        ...blog,
        content: blog.content.replace(/\\n/g, "\n")
    }

    return res.json(blog)
}


export const likeBlog = async (req, res) => {    
    const userId = req.user.id;
    const favoriteBlogId = Number(req.params["id"]);

    try {

        await prisma.favoriteBlog.create({
            data: {
                userId: userId,
                blogId: favoriteBlogId
            }
        });

        res.sendStatus(200);
    }
    catch(error) {
        console.log(error);
        res.sendStatus(500);
    }

    

    
}

export const unlikeBlog = async (req, res) => {
    const userId = req.user.id;
    const favoriteBlogId = Number(req.params["id"]);

    try {
        await prisma.favoriteBlog.delete({
            where: {
                blogId_userId: {
                    blogId: favoriteBlogId,
                    userId: userId
                }
            }
        });

        res.sendStatus(200);
    }
    catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
    
}


export const updateBlog = async(req, res) => {
    
    const blogId = Number(req.body.id);

    try {
        await prisma.blog.update({
            where: {
                id: blogId
            },
            data: {
                title: req.body.title,
                content: req.body.content
            }
        });

        res.sendStatus(200);
    }
    catch(error) {
        console.error(error);
        res.sendStatus(500);
    }
    
}


export const createBlog = async(req, res) => {
    
    try {
        const blog = await prisma.blog.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                content: req.body.content,
                date: new Date(Date.now()),
                imageUrl: req.body.imageUrl,
                authorId: req.user.id
            }
        });

        res.status(201);
        res.json(blog);
    }
    catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}