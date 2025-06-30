import { createContext, useContext, useState } from "react";
import authService from "../services/Api/AuthAPI";

const AuthContext = createContext();

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context)
        throw new Error("Se debe usar el proveedor");

    return context;
}

export const AuthContextProvider = ({ children }) => {

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") ?? null;
    });
    const [userId, setUserId] = useState(() => {
        return localStorage.getItem("userId") ?? -1;
    });


    const login = (token) => {

        const payload = authService.parseToken(token);
        const newUserId = payload.id;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", newUserId);

        setToken(token);
        setUserId(userId);
    }

    const logout = () => {
        setToken(null);
        setUserId(-1);

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    }

    return (
        <AuthContext.Provider value={{ token, userId, setToken, setUserId , logout, login }}>
            { children }
        </AuthContext.Provider>
    );
}