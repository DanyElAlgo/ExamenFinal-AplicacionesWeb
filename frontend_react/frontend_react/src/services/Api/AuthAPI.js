const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

class AuthService {

    async login(user) {

        try {
            const response = await fetch(`${BACKEND_URL}/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.generalError);
            }
           
            return data.token;
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
                throw new Error(data.generalError);
            }

            return data.token;
        }
        catch(error) {
            console.log(error);
            throw new Error(error);
        }
    }


    parseToken(token) {
        const textParseToken = atob(token.split('.')[1]);
        const payload = JSON.parse(textParseToken);

        return payload;
    }

    getUserId() {
        return app.userId;
    }

}


const authService = new AuthService();
export default authService;