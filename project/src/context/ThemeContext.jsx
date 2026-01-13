import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        // Safe localStorage access - check if window/localStorage exists
        if (typeof window !== 'undefined' && window.localStorage) {
            const saved = localStorage.getItem("darkMode");
            return saved ? JSON.parse(saved) : false;
        }
        return false;
    });

    useEffect(() => {
        // Safe localStorage access
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem("darkMode", JSON.stringify(darkMode));
        }
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const toggleTheme = () => setDarkMode(!darkMode);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
