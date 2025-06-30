import { API_URL } from "../conf/BackendUrl.js";

class ReservationAPI {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }


    async reservateWithoutSession(reservation) {
    
        try {
            const response = await fetch(`${this.baseUrl}/reservation/public`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reservation)
            });

            if(!response.ok)
                return false;

            return true;
        }
        catch(error) {
            console.error(error);

            return false;
        }
    }


    async reservateWithSession(reservation) {
    
        try {
            const response = await fetch(`${this.baseUrl}/reservation`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization" : `bearer ${localStorage.getItem("token") ?? ""}`
                },
                body: JSON.stringify(reservation)
            });

            if(!response.ok)
                return false;

            return true;
        }
        catch(error) {
            console.error(error);

            return false;
        }
    }
}


const reservationAPI = new ReservationAPI(API_URL);
export default reservationAPI;