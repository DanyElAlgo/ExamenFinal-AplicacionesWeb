const API_URL = import.meta.env.VITE_API_URL;

class ReservationAPI {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }


    async reservateWithoutSession(reservation) {
        const url = `${this.baseUrl}/reservation/public`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reservation)
            });

            if(!response.ok)
                throw new Error("No se pudo hacer la reservacion");

            return true;
        }
        catch(error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }


    async reservateWithSession(reservation) {
    
        const url = `${this.baseUrl}/reservation`;
      
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization" : `bearer ${localStorage.getItem("token") ?? ""}`
                },
                body: JSON.stringify(reservation)
            });

            if(!response.ok)
                throw new Error("No se pudo hacer la reservacion");

            return true;
        }
        catch(error) {
            console.error(error);
            throw new Error(error.message);
        }
    }
}


const reservationAPI = new ReservationAPI(API_URL);
export default reservationAPI;