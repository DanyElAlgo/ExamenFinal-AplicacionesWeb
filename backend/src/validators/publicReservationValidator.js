import { body } from "express-validator";

const publicReservationValidator = [
    body("name")
        .notEmpty()
        .withMessage("Se necesita un nombre para la reserva"),

    body("phoneNumber")
        .notEmpty()
        .withMessage("El telefono es requerido")
        .isMobilePhone("es-BO")
        .withMessage("El telefono es invalido"),

    body("email")
        .notEmpty()
        .withMessage("El email es requerido")
        .isEmail()
        .withMessage("El email es invalido"),

    body("guests")
        .notEmpty()
        .withMessage("Se deben tener invitados")
        .isNumeric()
        .withMessage("El numero de invitados es invalido"),

    body("date")
        .notEmpty()
        .withMessage("Se necesita una fecha")
        .isDate()
        .withMessage("La fecha es invalida"),

    body("time")
        .notEmpty()
        .withMessage("La hora es requerida")
        .matches(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
        .withMessage("Formato de la hora invalido (HH:mm o HH:mm:ss)")

];


export default publicReservationValidator;