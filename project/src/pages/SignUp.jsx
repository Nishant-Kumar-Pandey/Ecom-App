import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Mail, Lock, User, Eye, EyeOff, Camera, ArrowRight, Sparkles } from "lucide-react";
import axios from "axios";
import { API_URL } from "../config";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "", avatar: null });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      setFormData({ ...formData, avatar: file });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setAvatarPreview(null);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Initializing account...");
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }

      const response = await axios.post(`${API_URL}/auth/register`, formDataToSend);
      toast.success("Account initialized! Please login.", { id: loadingToast });
      navigate("/login");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Initialization failed!";
      toast.error(msg, { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20 px-4 flex items-center justify-center overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="glass p-8 md:p-12 rounded-[4rem] shadow-2xl border-white/20 dark:border-white/5">
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-indigo-500 mb-6"
            >
              <Sparkles className="animate-pulse" />
            </motion.div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight leading-[0.9]">
              Join the <br /> <span className="text-indigo-600">Luxe Network.</span>
            </h2>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-4">
              Unlock elite commerce experiences
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl relative z-10 bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
                >
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-slate-300 dark:text-slate-600" />
                  )}
                </motion.div>
                <label htmlFor="avatar" className="absolute bottom-0 right-0 z-20 w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center cursor-pointer shadow-xl hover:bg-indigo-500 transition-colors border-4 border-white dark:border-slate-800">
                  <Camera size={18} />
                  <input id="avatar" name="avatar" type="file" className="hidden" onChange={handleChange} />
                </label>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-4">Avatar Uplink</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Username</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="EliteMember"
                    className="input-premium w-full py-4 ps-14 pe-6 font-bold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@nexus.com"
                    className="input-premium w-full py-4 ps-14 pe-6 font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Security Key (Password)</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-premium w-full py-4 ps-14 pe-14 font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full btn-premium py-5 group"
            >
              <span className="text-sm uppercase tracking-[0.2em] font-black">Initialize Access</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm font-bold text-slate-400">
              Already authenticated?{" "}
              <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-8">
                Secure Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;       