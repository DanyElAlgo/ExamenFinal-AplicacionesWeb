import { body } from "express-validator"

const createBlogValidator = [
    body("title")
    .notEmpty()
    .withMessage("El blog debe tener un titulo"),
    body("description")
    .notEmpty()
    .withMessage("El blog debe tener una descripcion"),
    body("content")
    .notEmpty()
    .withMessage("El blog debe tener contenido"),
    body("imageUrl")
    .notEmpty()
    .withMessage("Debe existir una imagen")
];

export default createBlogValidator;