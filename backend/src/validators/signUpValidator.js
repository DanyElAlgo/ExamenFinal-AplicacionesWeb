import { body } from "express-validator";

const signUpValidators = [
    body("name")
        .notEmpty()
        .withMessage("El nombre del usuario es requerido"),
    body("phoneNumber")
        .notEmpty()
        .withMessage("El numero de telefono es requerido")
        .isMobilePhone("es-BO")
        .withMessage("El numero de telefono es invalido, ya que no respeta las reglas de la region local"),
    body("email")
        .notEmpty()
        .withMessage("El email es requerido")
        .isEmail()
        .withMessage("El email es invalido"),    
    body("password")
        .notEmpty()
        .withMessage("La contraseña es requerida")
        .isLength({ min: 4 })
        .withMessage("La contraseña debe contener al menos 4 caracteres"),
    body("address")
        .notEmpty()
        .withMessage("La dirección es requerida") 
];

export default signUpValidators;