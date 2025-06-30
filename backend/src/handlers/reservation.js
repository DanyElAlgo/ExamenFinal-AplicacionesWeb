import prisma from "../db.js";

export const createPublicReservation = async(req, res) => {

    const date = new Date(req.body.date);
    const time = parseStringTime(req.body.time);

    try {
        const reservation = await prisma.reservation.create({
            data: {
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                guests: Number(req.body.guests),
                date: date,
                time: time
            }
        });
        
        console.log(reservation);

        res.sendStatus(200);
    }
    catch(error) {
        console.log(error);
        res.status(500);
        res.json({ generalError: "Hubo un error al crear  la reservacion"});
    }
}

export const createPrivateReservation = async(req, res) => {
 
    const date = new Date(req.body.date);
    const time = parseStringTime(req.body.time);
   
    try {
        
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        });

        const reservation = await prisma.reservation.create({
            data: {
                name: user.name,
                phoneNumber: user.phoneNumber,
                email: user.email,
                guests: Number(req.body.guests),
                date: date,
                time: time,
                userId: user.id
            }
        });

        console.log(reservation);

        res.sendStatus(200);
    }
    catch(error) {
        console.log(error);
        res.status(500);
        res.json({ generalError: "Hubo un error al crear  la reservacion"});
    }
}


function parseStringTime(textTime) {
    const [hours, minutes, seconds] = textTime.split(":").map(Number);

    const date = new Date(Date.UTC(0, 0, 0, hours, minutes, seconds));

    return date;
}