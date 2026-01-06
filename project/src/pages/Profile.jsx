import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Camera, Save, X, LogOut, Package,
  Ticket, Heart, Settings, Shield, Bell, Globe,
  CreditCard, Zap, Star, ChevronRight, MessageSquare,
  TrendingUp, HelpCircle
} from "lucide-react";
import { logout, updateProfile } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, isAuthenticated } = useSelector((state) => state.user || {});
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.avatar || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout: authLogout } = useAuth();

  const handleLogout = () => {
    dispatch(logout());
    authLogout();
    toast.success("Disconnected safely.");
    navigate("/login");
  };

  const handleSave = async () => {
    if (!newName.trim()) {
      setError("Identity must have a name.");
      return;
    }

    setIsLoading(true);
    setError("");
    const loadingToast = toast.loading("Updating Uplink...");
    const formData = new FormData();
    formData.append("username", newName);
    formData.append("email", user.email);
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    try {
      const response = await axios.put(`${API_URL}/auth/profile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(updateProfile({
        name: response.data.user.username,
        avatar: response.data.user.avatar
      }));
      setIsEditing(false);
      toast.success("Profile records updated.", { id: loadingToast });
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Uplink synchronization failed.";
      setError(msg);
      toast.error(msg, { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsEditing(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center glass p-12 rounded-[3.5rem] max-w-md w-full border-indigo-500/20"
        >
          <div className="w-24 h-24 bg-indigo-600/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
            <Shield size={48} className="text-indigo-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Access Denied</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 font-bold uppercase text-xs tracking-widest leading-relaxed">
            Please authenticate to view your <br /> premium analytics.
          </p>
          <Link to="/login" className="btn-premium w-full py-5 block tracking-widest font-black uppercase text-sm">
            Go to Authenticator
          </Link>
        </motion.div>
      </div>
    );
  }

  const quickApps = [
    { name: "My Orders", icon: Package, color: "text-blue-500", bg: "bg-blue-500/10", count: "14" },
    { name: "Vouchers", icon: Ticket, color: "text-purple-500", bg: "bg-purple-500/10", count: "3" },
    { name: "Wishlist", icon: Heart, color: "text-red-500", bg: "bg-red-500/10", count: "28" },
    { name: "Settings", icon: Settings, color: "text-emerald-500", bg: "bg-emerald-500/10", count: null },
  ];

  const stats = [
    { label: "Points", value: "12.4k", icon: Zap },
    { label: "Level", value: "Elite", icon: Star },
    { label: "Spend", value: "$4.2k", icon: TrendingUp },
  ];

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen pb-20 pt-32 px-4 transition-colors duration-300 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key="profile-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-12"
          >
            {/* Hero Header */}
            <div className="relative bg-slate-900 dark:bg-slate-900 rounded-[3.5rem] p-8 md:p-14 shadow-2xl overflow-hidden min-h-[400px] flex flex-col justify-center">
              {/* Abstract Background Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500 opacity-20 blur-[120px] rounded-full"
              />
              <motion.div
                animate={{ x: [0, 50, 0] }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute -bottom-40 -left-20 w-80 h-80 bg-purple-500 opacity-20 blur-[100px] rounded-full"
              />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <motion.div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-700" />
                  <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-8 border-slate-900 shadow-2xl bg-slate-800">
                    <img src={previewUrl || user.avatar} className="w-full h-full object-cover" alt="Profile" />
                    <label htmlFor="profile-upload" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="text-white w-10 h-10" />
                    </label>
                  </div>
                  <input type="file" id="profile-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
                </motion.div>

                <div className="flex-1 text-center md:text-left text-white">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    {isEditing ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="text-4xl md:text-6xl font-black bg-white/10 border-b-4 border-white/20 px-4 py-1 outline-none w-full max-w-md focus:border-indigo-500 transition-colors"
                      />
                    ) : (
                      <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase">
                        {user.name}
                      </h1>
                    )}
                    <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse border-4 border-emerald-500/20 shadow-xl shadow-emerald-500/50" />
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-slate-400 mb-8 lowercase opacity-80">{user.email}</p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-6">
                    {stats.map(stat => (
                      <div key={stat.label} className="bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
                        <stat.icon size={20} className="text-indigo-400" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-50">{stat.label}</span>
                          <span className="text-lg font-black tracking-tight">{stat.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 self-center md:self-end">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <button onClick={handleSave} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-indigo-500/20 transition-all">
                        <Save size={18} /> Sync
                      </button>
                      <button onClick={() => { setIsEditing(false); setNewName(user.name); setPreviewUrl(user.avatar); }} className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all">
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all">
                      Edit Identity
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Apps & Settings */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {quickApps.map((app, idx) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * idx }}
                  className="glass-card p-6 flex flex-col items-center text-center group cursor-pointer border-none"
                >
                  <div className={`w-16 h-16 ${app.bg} rounded-[1.5rem] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                    <app.icon size={32} className={app.color} />
                  </div>
                  <span className="font-black text-slate-700 dark:text-slate-200 uppercase text-[10px] tracking-widest">{app.name}</span>
                  {app.count && <span className="mt-2 text-2xl font-black text-slate-900 dark:text-white line-height-1">{app.count}</span>}
                </motion.div>
              ))}
            </div>

            {/* Recent Orders / Feed */}
            <div className="glass-card p-8 border-none overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Recent Transmissions</h3>
                <button className="text-xs font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-400">View All Archive</button>
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-6 p-4 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-indigo-500/10 group">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-black text-slate-400 group-hover:text-indigo-500 transition-colors">#{i}843</div>
                    <div className="flex-1">
                      <h4 className="font-black text-slate-900 dark:text-white tracking-tight">Premium Nexus Hub</h4>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Delivered Sep 12, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-indigo-600">$1,499.00</p>
                      <span className="text-[10px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">Completed</span>
                    </div>
                    <ChevronRight className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Secondary Actions */}
          <div className="lg:col-span-4 space-y-8">
            {/* Finance Hub */}
            <div className="glass p-8 rounded-[3.5rem] border-none bg-gradient-to-br from-indigo-600/5 to-purple-600/5">
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                <Zap size={24} className="text-indigo-600" /> Hub Finance
              </h3>
              <div className="space-y-4">
                <div className="p-6 rounded-[2rem] glass-card border-none hover:border-indigo-500/30 group">
                  <div className="flex justify-between items-start mb-6">
                    <CreditCard size={32} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-8 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt="Card" />
                  </div>
                  <p className="font-black text-slate-400 tracking-[0.2em] mb-1">•••• •••• •••• 8432</p>
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase text-slate-400">Primary Card</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">$8,450.00</span>
                  </div>
                </div>
                <button className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-sm font-black text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-all uppercase tracking-widest">
                  Link New Asset
                </button>
              </div>
            </div>

            {/* Settings & Support List */}
            <div className="glass-card p-6 border-none">
              <div className="space-y-2">
                {[
                  { label: "Security & Shield", icon: Shield, color: "text-blue-500" },
                  { label: "Notification Hub", icon: Bell, color: "text-amber-500" },
                  { label: "Global Presence", icon: Globe, color: "text-indigo-500" },
                  { label: "Elite Support", icon: HelpCircle, color: "text-emerald-500" },
                ].map(item => (
                  <button key={item.label} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group">
                    <div className="flex items-center gap-4">
                      <item.icon size={20} className={`${item.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                      <span className="text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 py-5 rounded-3xl bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white font-black uppercase text-xs tracking-[0.2em] transition-all group"
                >
                  <LogOut size={18} /> Disconnect Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}