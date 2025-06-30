import prisma from "../db.js"

export const createOrder = async (req, res) => {


    const total = req.body.total;
    const productQuantity = Object.entries(req.body.products);
    const productDetails = [];

    for(const [key, value] of Object.entries(req.body.products)) {
        productDetails.push({
            productId: Number(key),
            quantity: Number(value)
        });
    }

    await prisma.order.create({
        data: {
            total: total,
            createdAt: new Date(Date.now()),
            userId: req.user.id,
            orderDetails: {
               create: productDetails
            }
        },
        include: {
            orderDetails: true
        }
    });

    res.sendStatus(201);
}