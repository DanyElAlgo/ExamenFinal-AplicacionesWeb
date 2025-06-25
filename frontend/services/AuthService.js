class AuthService {

    isLoggedIn() {
        return globalThis.app.isAuthenticated;
    }

    getUserId() {
        return globalThis.app.userId;
    }

}


const authService = new AuthService();
export default authService;