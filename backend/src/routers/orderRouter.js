import { Router } from "express";
import { protect } from "../modules/auth.js";
import { createOrder } from "../handlers/order.js";

const orderRouter = Router();

orderRouter.post("/", protect, createOrder);
export default orderRouter;

