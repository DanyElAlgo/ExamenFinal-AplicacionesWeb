import { Router } from "express";
import blogRouter from "./routers/blogRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import reservationRouter from "./routers/reservationRouter.js";

const router = Router();

router.use("/blog", blogRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/reservation", reservationRouter);

export default router;

