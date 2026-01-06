import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Sun, Moon, User, Menu, X } from "lucide-react";
import { useSearch } from "../context/SearchContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
    const { isAuthenticated } = useSelector((state) => state.user || {});
    const cart = useSelector((state) => state.cart);
    const { darkMode, toggleTheme } = useTheme();
    const { search, setSearch } = useSearch();
    const [isOpen, setIsOpen] = useState(false);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed w-full z-50 top-0 px-4 pt-6"
        >
            <div className="max-w-7xl mx-auto glass rounded-[2.5rem] px-6 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2 group">
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/40"
                    >
                        <ShoppingCart className="text-white w-6 h-6" />
                    </motion.div>
                    <span className="text-2xl font-black tracking-tighter text-gradient">
                        DealNest
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8 ml-12">
                    {["Home", "About", "Contact"].map((item) => (
                        <Link
                            key={item}
                            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            className="relative text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Desktop Search Bar */}
                <div className="hidden lg:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                            type="text"
                            className="input-premium w-full py-3 ps-12 pe-6 text-sm font-bold"
                            placeholder="Premium search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleTheme}
                        className="p-3 rounded-2xl glass-card text-indigo-600"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={darkMode ? "dark" : "light"}
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.3 }}
                            >
                                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>

                    <Link to="/cart" className="relative p-3 rounded-2xl glass-card text-indigo-600 group">
                        <ShoppingCart size={24} />
                        {cartCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center text-[10px] font-black text-white bg-indigo-600 rounded-full border-2 border-[var(--bg-secondary)] shadow-lg"
                            >
                                {cartCount}
                            </motion.span>
                        )}
                    </Link>

                    <Link
                        to={isAuthenticated ? "/profile" : "/login"}
                        className="hidden md:flex btn-premium"
                    >
                        <User size={18} />
                        <span>{isAuthenticated ? "Dashboard" : "Login"}</span>
                    </Link>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-3 rounded-2xl glass-card text-slate-600 dark:text-slate-400"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="lg:hidden absolute top-full left-4 right-4 mt-4 p-6 glass rounded-[2.5rem] shadow-2xl"
                    >
                        <ul className="flex flex-col gap-4">
                            {["Home", "About", "Contact", "Profile"].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-200 font-bold"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}