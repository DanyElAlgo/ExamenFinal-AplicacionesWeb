import { BACKEND_URL } from "./conf/BackendUrl.js";

class AuthService {

    isLoggedIn() {
        return globalThis.app.isAuthenticated;
    }

    async login(user) {

        try {
            const response = await fetch(`${BACKEND_URL}/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if(!response.ok) {
                return data;
            }
           
            localStorage.setItem("token", data.token);
            const textParseToken = atob(data.token.split('.')[1]);
            const token = JSON.parse(textParseToken);

            app.userId = token.id;
            app.isAuthenticated = true;

            document.dispatchEvent(new Event("reload-layout"));

            return token;
        }
        catch(error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async createUser(user) { 
        try {
            const response = await fetch(`${BACKEND_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if(!response.ok) {
                return data;
            }

            localStorage.setItem("token", data.token);
            const textParseToken = atob(data.token.split('.')[1]);
            const token = JSON.parse(textParseToken);

            app.userId = token.id;
            app.isAuthenticated = true;

            document.dispatchEvent(new Event("reload-layout"));

            return token;
        }
        catch(error) {
            console.log(error);
            throw new Error(error);
        }
    }

    getUserId() {
        return app.userId;
    }

}


const authService = new AuthService();
export default authService;