import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

  const { logout: authLogout } = useAuth(); // Rename to avoid conflict with redux logout action

  const handleLogout = () => {
    dispatch(logout());
    authLogout();
    navigate("/login");
  };

  const handleSave = async () => {
    if (!newName.trim()) {
      setError("Username cannot be empty");
      return;
    }

    setIsLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("username", newName);
    formData.append("email", user.email);
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    try {
      const response = await axios.put(`${API_URL}/auth/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(updateProfile({
        name: response.data.user.username,
        avatar: response.data.user.avatar
      }));
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to update profile.";
      setError(msg);
      toast.error(msg);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 px-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Login</h2>
          <p className="text-gray-500 mb-8">You need to be logged in to view your profile and manage your account.</p>
          <Link to="/login" className="block w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const quickApps = [
    { name: "Orders", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", color: "bg-blue-500" },
    { name: "Coupons", icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z", color: "bg-purple-500" },
    { name: "Wishlist", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", color: "bg-red-500" },
    { name: "Account", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", color: "bg-emerald-500" },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20 pt-28 selection:bg-indigo-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="relative bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-500 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden mb-10 animate-in">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 p-4 opacity-10">
            <svg className="w-80 h-80 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="relative flex flex-col md:flex-row items-center gap-10">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-white to-indigo-300 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <img src={previewUrl || user.avatar} className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl object-cover transform transition duration-500 group-hover:scale-105" alt="Profile" />
              <label htmlFor="profile-upload" className="absolute bottom-2 right-2 bg-white p-3 rounded-full shadow-2xl text-indigo-600 hover:scale-125 transition-all duration-300 active:scale-90 ring-4 ring-white/50 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </label>
              <input type="file" id="profile-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
            <div className="text-center md:text-left text-white max-w-xl">
              {isEditing ? (
                <div className="mb-4">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="text-3xl md:text-4xl font-extrabold tracking-tight bg-white/20 border-2 border-white/30 rounded-2xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-white/20 w-full"
                    autoFocus
                  />
                  {error && <p className="mt-2 text-xs font-bold text-red-200 uppercase tracking-widest">{error}</p>}
                </div>
              ) : (
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-glow">{user.name}</h1>
              )}
              <p className="text-lg opacity-90 font-medium mb-6 text-indigo-50">{user.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-5 py-2 bg-white/20 backdrop-blur-xl rounded-2xl text-sm font-bold uppercase tracking-widest border border-white/30 shadow-lg">
                  {user.role}
                </span>
                <span className="px-5 py-2 bg-indigo-900/40 backdrop-blur-xl rounded-2xl text-sm font-bold border border-white/10 shadow-lg">
                  Member since 2024
                </span>
              </div>
            </div>
            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              disabled={isLoading}
              className={`md:ml-auto glass ${isEditing ? 'bg-white text-indigo-600' : 'hover:bg-white text-indigo-900'} px-8 py-3 rounded-[1.5rem] font-bold transition-all duration-300 self-center hover-lift border-0 shadow-indigo-900/20 flex items-center gap-2`}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Grid Section 2x2 Apps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-in delay-1 opacity-0">
          {quickApps.map((app) => (
            <div key={app.name} className="glass p-8 rounded-[2.5rem] hover-lift group cursor-pointer flex flex-col items-center text-center">
              <div className={`w-16 h-16 ${app.color} text-white rounded-[1.5rem] flex items-center justify-center mb-5 shadow-2xl transform group-hover:rotate-12 transition-all duration-500`}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={app.icon} />
                </svg>
              </div>
              <span className="font-extrabold text-gray-800 text-lg tracking-tight">{app.name}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Finance Options Section */}
          <div className="glass p-8 rounded-[2.5rem] animate-in delay-2 opacity-0">
            <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
              <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
              Finance Hub
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-[2rem] border border-indigo-100 flex items-center gap-6 cursor-pointer hover:bg-white hover:border-indigo-300 transition-all duration-300 group shadow-sm">
                <div className="bg-indigo-600 text-white p-4 rounded-[1.2rem] shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900">ShopHub Pay Later</h3>
                  <p className="text-gray-500 font-medium">Credit Limit: $2,500</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-[2rem] border border-emerald-100 flex items-center gap-6 cursor-pointer hover:bg-white hover:border-emerald-300 transition-all duration-300 group shadow-sm">
                <div className="bg-emerald-600 text-white p-4 rounded-[1.2rem] shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900">Prime Rewards Card</h3>
                  <p className="text-gray-500 font-medium">5% Cashback Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Finance on UPI Section */}
          <div className="glass p-8 rounded-[2.5rem] animate-in delay-2 opacity-0">
            <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              Instant UPI
            </h2>
            <div className="p-8 rounded-[2.5rem] bg-gray-900 text-white flex flex-col justify-between h-[180px] shadow-2xl relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute inset-0 bg-blue-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
              <div className="relative flex items-center justify-between">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" className="h-10 object-contain brightness-0 invert" alt="UPI" />
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-lg border border-white/20 shadow-xl">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                </div>
              </div>
              <div className="relative">
                <h3 className="text-2xl font-extrabold mb-1">Scan & Pay Anything</h3>
                <p className="text-white/60 font-medium">Seamless payments via UPI</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="mb-14 animate-in delay-3 opacity-0">
          <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3 ml-2">
            <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
            Continue Exploring
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide px-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="min-w-[180px] glass p-4 rounded-[2rem] hover-lift cursor-pointer">
                <div className="w-full aspect-square bg-gray-100/50 rounded-[1.5rem] mb-4 flex items-center justify-center relative group overflow-hidden">
                  <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <svg className="w-12 h-12 text-gray-300 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <span className="text-sm font-bold text-gray-800 px-2 line-clamp-1">Premium Product {i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Prompt */}
        <div className="bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 rounded-[3rem] p-10 shadow-2xl mb-14 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden animate-in delay-3 opacity-0">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
          </div>
          <div className="relative text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-black mb-2 text-glow">Your Opinion Counts</h2>
            <p className="opacity-70 text-lg font-medium">Rate your items to unlock exclusive reward points.</p>
            <div className="flex justify-center md:justify-start gap-3 mt-6">
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s} className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 group shadow-xl border border-white/10 active:scale-90">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                </button>
              ))}
            </div>
          </div>
          <button className="relative bg-white text-indigo-950 px-10 py-4 rounded-[1.5rem] font-black text-lg shadow-2xl hover:bg-indigo-50 hover-lift active:scale-95 transition-all">
            Rate Now
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
          {/* Settings Section */}
          <div className="lg:col-span-2 glass rounded-[2.5rem] overflow-hidden animate-in delay-4 opacity-0 self-start">
            <div className="p-8 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                <div className="w-2 h-8 bg-gray-600 rounded-full"></div>
                Account Settings
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { name: "Payment Methods", desc: "Manage cards & UPI IDs", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
                { name: "Language & Region", desc: "English (US) / New York", icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9c.83-2.082 1.352-4.467 1.352-7H6.75M16.5 13.25L13.25 16.5M13.25 13.25L16.5 16.5" },
                { name: "Notification Hub", desc: "Push, Email & SMS preferences", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
                { name: "Privacy & Security", desc: "2-Factor Auth & Session Data", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
              ].map((s) => (
                <div key={s.name} className="p-6 flex items-center justify-between cursor-pointer hover:bg-indigo-50/50 transition-all duration-300 group">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-gray-100 rounded-2xl text-gray-500 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={s.icon} /></svg>
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-900 text-lg">{s.name}</p>
                      <p className="text-sm text-gray-500 font-medium">{s.desc}</p>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {/* My Activity */}
            <div className="glass p-8 rounded-[2.5rem] animate-in delay-4 opacity-0">
              <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-2 h-8 bg-purple-600 rounded-full"></div>
                Activity
              </h2>
              <div className="flex flex-col gap-4">
                <div className="p-5 bg-gray-50 rounded-[1.5rem] flex items-center justify-between cursor-pointer hover:bg-white border border-transparent hover:border-purple-200 transition-all shadow-sm">
                  <span className="font-bold text-gray-700 text-lg">My Reviews</span>
                  <span className="text-sm bg-purple-100 text-purple-700 font-black px-4 py-1.5 rounded-full shadow-inner">12</span>
                </div>
                <div className="p-5 bg-gray-50 rounded-[1.5rem] flex items-center justify-between cursor-pointer hover:bg-white border border-transparent hover:border-purple-200 transition-all shadow-sm">
                  <span className="font-bold text-gray-700 text-lg">Questions</span>
                  <span className="text-sm bg-purple-100 text-purple-700 font-black px-4 py-1.5 rounded-full shadow-inner">3</span>
                </div>
              </div>
            </div>

            {/* Sell Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-[2.5rem] p-8 shadow-2xl text-white relative overflow-hidden group animate-in delay-4 opacity-0">
              <div className="absolute -right-4 -bottom-4 opacity-10 transform scale-150 rotate-12 transition-transform duration-1000 group-hover:rotate-45">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.82v-1.91c-1.84-.18-3.52-1.12-4.59-2.58l1.41-1.41c.84 1.13 2.11 1.84 3.49 1.95v-3.15c-1.84-.44-3.52-1.38-4.59-2.84l1.41-1.41c.84 1.13 2.11 1.84 3.49 1.95V4h2.82v1.91c1.84.18 3.52 1.12 4.59 2.58l-1.41 1.41c-.84-1.13-2.11-1.84-3.49-1.95v3.15c1.84.44 3.52 1.38 4.59 2.84l-1.41 1.41c-.84-1.13-2.11-1.84-3.49-1.95v1.91z" /></svg>
              </div>
              <h2 className="text-2xl font-black mb-2 text-glow">Earn with ShopHub</h2>
              <p className="opacity-80 font-medium mb-6">Global reach, 0% listing fee.</p>
              <button className="w-full bg-white text-emerald-700 py-4 rounded-[1.2rem] font-black text-lg shadow-xl hover:scale-[1.03] active:scale-95 transition-all">
                Start Selling
              </button>
            </div>
          </div>
        </div>

        {/* Info List */}
        <div className="glass rounded-[2.5rem] mb-12 animate-in delay-4 opacity-0 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {[
              { name: "Support Center", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { name: "Legal Policies", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
              { name: "Feedback", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            ].map(item => (
              <div key={item.name} className="p-8 flex items-center justify-center gap-4 hover:bg-gray-50/50 cursor-pointer transition-colors group">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon} /></svg>
                <span className="font-bold text-gray-700 group-hover:text-gray-900">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-white text-red-500 border-4 border-red-50 py-6 rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-4 shadow-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-500 group active:scale-[0.98] animate-in delay-4 opacity-0"
        >
          <div className="p-2 bg-red-100 group-hover:bg-white/20 rounded-xl transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
          </div>
          Logout
        </button>
      </div>
    </div>
  );
}