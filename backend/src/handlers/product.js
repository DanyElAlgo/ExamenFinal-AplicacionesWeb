import prisma from "../db.js";

export const getProducts = async(req, res) => {
    const products = await prisma.product.findMany();

    res.json({ products });
}