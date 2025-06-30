import { Router } from "express";
import { getProducts } from "../handlers/product.js";

const productRouter = Router();

productRouter.get("/", getProducts);

export default productRouter;