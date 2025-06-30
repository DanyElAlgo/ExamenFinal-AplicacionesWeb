import { param } from "express-validator";

const singleBlogValidator = [
    param("id")
    .isNumeric()
    .withMessage("Se debe referenciar correctamente a un blog")
];

export default singleBlogValidator;