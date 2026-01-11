import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Profile = lazy(() => import("./pages/Profile"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Checkout = lazy(() => import("./pages/Checkout"));

import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
    return (
        <ThemeProvider>
            <Router>
                <Navbar />
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Suspense>
                <Toaster position="top-center" toastOptions={{
                    style: {
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        color: '#333',
                        fontWeight: 'bold',
                    },
                    className: 'glass shadow-2xl',
                }} />
            </Router>
        </ThemeProvider>
    );
}