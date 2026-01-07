import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ShieldCheck, ArrowRight, ArrowLeft, Key, CheckCircle2, AlertCircle } from "lucide-react";
import axios from "axios";
import { API_URL } from "../config";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const loadingToast = toast.loading("Sending security code...");
        try {
            await axios.post(`${API_URL}/auth/forgot-password`, { email });
            toast.success("Security code transmitted to your email.", { id: loadingToast });
            setStep(2);
        } catch (error) {
            const msg = error.response?.data?.message || "Transmission failed. Verify email.";
            toast.error(msg, { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Security keys do not match.");
            return;
        }
        if (newPassword.length < 6) {
            toast.error("Security key must be at least 6 characters.");
            return;
        }

        setIsLoading(true);
        const loadingToast = toast.loading("Updating security records...");
        try {
            await axios.post(`${API_URL}/auth/reset-password`, { email, otp, newPassword });
            toast.success("Security key updated successfully.", { id: loadingToast });
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            const msg = error.response?.data?.message || "Reset failed. Verify code and try again.";
            toast.error(msg, { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20 px-4 flex items-center justify-center overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl relative z-10"
            >
                <div className="glass p-8 md:p-12 rounded-[4rem] shadow-2xl border-white/20 dark:border-white/5">
                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-10"
                            >
                                <div className="text-center">
                                    <div className="inline-flex p-5 rounded-[2rem] bg-indigo-600/10 border border-indigo-500/20 mb-6 text-indigo-600">
                                        <Key size={40} />
                                    </div>
                                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Access <span className="text-indigo-600">Recovery.</span></h2>
                                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Lost your security credentials?</p>
                                </div>

                                <form onSubmit={handleSendOTP} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Registered Email</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@nexus.com"
                                                className="input-premium w-full py-5 ps-14 pe-6 font-bold"
                                            />
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full btn-premium py-5 group"
                                    >
                                        <span className="text-sm uppercase tracking-[0.2em] font-black">{isLoading ? "Processing..." : "Transmit Security Code"}</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10"
                            >
                                <div className="text-center">
                                    <div className="inline-flex p-5 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 mb-6 text-emerald-500">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Verify <span className="text-emerald-500">Code.</span></h2>
                                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Code sent to your terminal</p>
                                </div>

                                <form onSubmit={handleResetPassword} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Security Code (OTP)</label>
                                        <input
                                            type="text"
                                            required
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder="XXXXXX"
                                            className="input-premium w-full py-5 px-6 font-black tracking-[0.5em] text-center text-xl"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">New Security Key</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                            <input
                                                type="password"
                                                required
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="input-premium w-full py-5 ps-14 pe-6 font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Confirm Security Key</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                            <input
                                                type="password"
                                                required
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="input-premium w-full py-5 ps-14 pe-6 font-bold"
                                            />
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full btn-premium py-5 group bg-emerald-600 shadow-emerald-500/20"
                                    >
                                        <span className="text-sm uppercase tracking-[0.2em] font-black">{isLoading ? "Synchronizing..." : "Update Security Records"}</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="mt-10 pt-10 border-t border-slate-100 dark:border-slate-800 text-center">
                        <button
                            onClick={() => step === 1 ? navigate("/login") : setStep(1)}
                            className="flex items-center justify-center gap-2 mx-auto text-xs font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors"
                        >
                            <ArrowLeft size={16} />
                            <span>{step === 1 ? "Return to Login" : "Change Email Address"}</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
