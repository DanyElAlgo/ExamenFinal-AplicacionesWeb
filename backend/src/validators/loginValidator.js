import { body } from "express-validator";


const loginValidators = [
    body('email')
        .notEmpty()
        .withMessage("El email es requerido")
        .isEmail()
        .withMessage("El email es invalido"),    
    body('password')
        .notEmpty()
        .withMessage("La contraseña es requerida")
        .isLength({ min: 4 })
        .withMessage("La contraseña debe contener al menos 4 caracteres")
]

export default loginValidators;