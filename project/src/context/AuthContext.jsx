import React from 'react'
import { createContext, useState, useContext } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // Safe localStorage access
        if (typeof window !== 'undefined' && window.localStorage) {
            return localStorage.getItem("isAuthenticated") === "true";
        }
        return false;
    });
    const [user, setUser] = useState(() => {
        // Safe localStorage access
        if (typeof window !== 'undefined' && window.localStorage) {
            const userData = localStorage.getItem("user");
            return userData ? JSON.parse(userData) : null;
        }
        return null;
    });

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem("user", JSON.stringify(userData));
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("user");
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;