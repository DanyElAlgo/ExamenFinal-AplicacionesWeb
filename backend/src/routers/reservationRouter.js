import { Router } from "express";
import { protect } from "../modules/auth.js";
import publicReservationValidator from "../validators/publicReservationValidator.js";
import privateReservationValidator from "../validators/privateReservationValidator.js";
import { handleUserInput } from "../middlewares/handleUserInput.js";
import { createPublicReservation, createPrivateReservation } from "../handlers/reservation.js";

const reservationRouter = Router();

reservationRouter.post("/public", publicReservationValidator, handleUserInput, createPublicReservation);
reservationRouter.post("/", protect, privateReservationValidator, handleUserInput, createPrivateReservation);

export default reservationRouter;