import { body } from "express-validator";


const blogUpdateValidator = [
    body("id")
        .notEmpty()
        .withMessage("Se necesita el identificador del blog")
        .isNumeric()
        .withMessage("El identificador es un valor numerico"),

    body("title")
        .notEmpty()
        .withMessage("El blog requiere un titulo"),

    body("content")
        .notEmpty()
        .withMessage("El blog necesita un contenido")
];

export default blogUpdateValidator;