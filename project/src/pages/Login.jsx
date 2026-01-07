import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { login } from "../redux/userSlice";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const loadingToast = toast.loading("Authenticating...");
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });

      const userData = {
        name: response.data.user?.username || email.split("@")[0],
        email: response.data.user?.email || email,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        role: "Premium Member",
        ...response.data.user
      };

      dispatch(login(userData));
      auth.login(userData);
      toast.success("Welcome back!", { id: loadingToast });
      navigate("/profile");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Invalid credentials. Please try again.";
      setError(msg);
      toast.error(msg, { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20 px-4 flex items-center justify-center overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="glass p-8 md:p-12 rounded-[3.5rem] shadow-2xl border-white/20 dark:border-white/5">
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="inline-flex p-5 rounded-[2rem] bg-indigo-600 shadow-xl shadow-indigo-500/20 mb-6"
            >
              <ShieldCheck size={40} className="text-white" />
            </motion.div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
              Identity <span className="text-indigo-600">Verified.</span>
            </h2>
            <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">
              Enter your premium credentials
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">
                Digital ID (Email)
              </label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@nexus.com"
                  className="input-premium w-full py-5 ps-14 pe-6 font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Security Key
                </label>
                <Link to="/forgot-password" size="sm" className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-500">
                  Lost access?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-premium w-full py-5 ps-14 pe-14 font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <p className="text-sm font-bold text-red-500">{error}</p>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full btn-premium py-5 group"
            >
              <span className="text-sm uppercase tracking-[0.2em] font-black">Authenticate</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm font-bold text-slate-400">
              No credentials?{" "}
              <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-8">
                Initialize New Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;