import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import toast from "react-hot-toast";


const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "", avatar: null });
  const [avatarPreview, setAvatarPreview] = useState(null);

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }

      const response = await axios.post(`${API_URL}/auth/register`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Registration Successful! Please Login.");
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Registration Failed!";
      toast.error(msg);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-indigo-50/30 pt-24 animate-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="text-center">
          <h2 className="text-4xl font-black tracking-tight text-gray-950">
            Join the Elite
          </h2>
          <p className="mt-3 text-sm font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
            Create your premium account & <br /> unlock exclusive benefits
          </p>
        </div>
      </div>

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md glass p-10 rounded-[3rem] shadow-2xl-indigo border border-white/40">
        <form className="space-y-8" onSubmit={handleSubmit}>

          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center group">
            <div className="relative w-28 h-28 mb-4">
              <div className="absolute inset-0 bg-indigo-600/10 rounded-full animate-pulse group-hover:bg-indigo-600/20 transition-colors"></div>
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-2xl relative z-10"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center border-4 border-white text-indigo-200 relative z-10 shadow-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
              )}
              <label htmlFor="avatar" className="absolute bottom-1 right-1 bg-gray-900 rounded-2xl p-2.5 cursor-pointer hover:bg-indigo-600 shadow-2xl transition-all duration-300 text-white z-20 hover:scale-110 active:scale-90 ring-4 ring-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
              </label>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Profile Identity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label htmlFor="username" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2 group-focus-within:text-indigo-600 transition-colors">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="EliteUser"
                className="input-premium w-full py-4 px-6 text-sm font-bold text-gray-800"
              />
            </div>
            <div className="group">
              <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2 group-focus-within:text-indigo-600 transition-colors">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@premium.com"
                className="input-premium w-full py-4 px-6 text-sm font-bold text-gray-800"
              />
            </div>
          </div>

          <div className="group">
            <label htmlFor="password" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2 group-focus-within:text-indigo-600 transition-colors">
              Security Key
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-premium w-full py-4 px-6 pr-14 text-sm font-bold text-gray-800"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-indigo-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center items-center gap-3 rounded-[1.5rem] bg-gray-900 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-2xl-indigo btn-premium"
          >
            Create Account
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-gray-100/50 text-center">
          <p className="text-sm font-extrabold text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500 underline underline-offset-8">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;       