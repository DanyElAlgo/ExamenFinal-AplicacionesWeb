import { Router } from "express";
import { protect } from "../modules/auth.js";
import { createBlog, getBlog, getBlogs, likeBlog, unlikeBlog, updateBlog } from "../handlers/blog.js";
import toggleBlogValidator from "../validators/toggleBlogValidator.js";
import { handleUserInput } from "../middlewares/handleUserInput.js";
import blogUpdateValidator from "../validators/blogUpdateValidator.js";
import singleBlogValidator from "../validators/singleBlogValidator.js";
import createBlogValidator from "../validators/createBlogValidator.js";

const blogRouter = Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/", protect, createBlogValidator, handleUserInput, createBlog);
blogRouter.get("/:id", singleBlogValidator, handleUserInput, getBlog);
blogRouter.put("/", protect, blogUpdateValidator, handleUserInput, updateBlog);
blogRouter.delete("/unlike/:id", protect, toggleBlogValidator, handleUserInput, unlikeBlog);
blogRouter.post("/like/:id", protect, toggleBlogValidator, handleUserInput, likeBlog);

export default blogRouter;