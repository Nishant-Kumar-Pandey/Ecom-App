import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSearch } from "../context/SearchContext";

export default function Navbar() {
    const { isAuthenticated } = useSelector((state) => state.user || {});
    const cart = useSelector((state) => state.cart);
    const { search, setSearch } = useSearch();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 top-0 px-4 pt-6 animate-in">
            <div className="max-w-7xl mx-auto glass rounded-[2.5rem] p-4 flex items-center justify-between shadow-2xl-indigo">
                <Link to="/" className="flex items-center space-x-3 px-4 hover:scale-110 transition-transform duration-500">
                    <span className="text-3xl font-black tracking-tighter bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent transform">
                        LuxeMart 
                    </span>
                </Link>

                {/* Desktop Search Bar */}
                <div className="hidden lg:flex flex-1 max-w-lg mx-8">
                    <div className="relative w-full group">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                            <svg className="w-5 h-5 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="input-premium w-full py-3 ps-14 pe-6 text-sm font-bold text-gray-800 placeholder-gray-400"
                            placeholder="Search premium products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4 md:order-2">
                    <Link
                        to="/cart"
                        className="relative p-3 rounded-2xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 scale-hover group"
                    >
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cart.reduce((total, item) => total + item.quantity, 0) > 0 && (
                            <div className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 text-[10px] font-black text-white bg-indigo-600 rounded-full border-2 border-white shadow-lg animate-pulse">
                                {cart.reduce((total, item) => total + item.quantity, 0)}
                            </div>
                        )}
                    </Link>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-3 rounded-2xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors active:scale-95"
                    >
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>

                    <Link
                        to={isAuthenticated ? "/profile" : "/login"}
                        className="hidden md:flex items-center gap-3 bg-gray-900 px-6 py-3 rounded-2xl btn-premium text-white font-black text-sm shadow-xl hover:shadow-indigo-500/20"
                    >
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </div>
                        {isAuthenticated ? "Dashboard" : "Login"}
                    </Link>
                </div>

                <div className={`${isOpen ? "flex opacity-100 translate-y-0" : "hidden lg:flex opacity-0 lg:opacity-100 -translate-y-4 lg:translate-y-0"} absolute lg:relative top-full left-0 right-0 mt-4 lg:mt-0 p-6 lg:p-0 glass lg:bg-transparent lg:border-0 lg:shadow-none lg:backdrop-blur-none rounded-[2rem] flex-col lg:flex-row items-center gap-4 transition-all duration-500 z-40 lg:order-1`}>
                    <ul className="flex flex-col lg:flex-row items-center gap-6 w-full lg:w-auto">
                        {[
                            { name: "Home", path: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1-1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                            { name: "About", path: "/about", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                            { name: "Contact", path: "/contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }
                        ].map((item) => (
                            <li key={item.name} className="w-full lg:w-auto">
                                <Link
                                    to={item.path}
                                    className="flex items-center gap-3 py-3 px-6 lg:p-0 text-gray-700 hover:text-indigo-600 font-extrabold text-lg lg:text-sm transition-all scale-hover"
                                >
                                    <span className="lg:hidden p-2 bg-indigo-50 rounded-xl text-indigo-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
                                    </span>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        <li className="md:hidden w-full">
                            <Link to="/login" className="flex items-center justify-center gap-3 bg-gray-900 py-4 rounded-[1.5rem] text-white font-black">
                                Login to Account
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}