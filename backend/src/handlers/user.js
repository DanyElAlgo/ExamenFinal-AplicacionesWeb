import prisma from "../db.js";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth.js";

export const createNewUser = async (req, res) => {
    const hash = await hashPassword(req.body.password);
    
    const existUser = await prisma.user.findFirst({
        where: {
            email: req.body.email
        }
    })
    
    if(!Object.is(existUser, null)) {
        res.status(400).json({"generalError": "El correo ya está en uso"});
        return;
    }
        
    const user = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: hash,
            address: req.body.address        
        }
    });

    const token = createJWT(user);
    res.json({ token });
}

export const signin = async (req, res) => {
    
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    });

    const isValid = await comparePasswords(req.body.password, user?.password ?? "");

    if(!isValid) {
        res.status(400);
        res.json({ "generalError": "Credenciales incorrectas"});
    }
    else {
        const token = createJWT(user);
        res.json({ token });
    }
}