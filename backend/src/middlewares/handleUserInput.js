import { validationResult } from "express-validator";


export const handleUserInput = (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body, req.user);

    if(!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
    }
    else {
        next();
    }

}