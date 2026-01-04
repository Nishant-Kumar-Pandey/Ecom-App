import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
      toast.success("Login Successful!");
      navigate("/profile");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Invalid credentials. Please try again.";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-indigo-50/30 pt-24 animate-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 rounded-[2rem] bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-200 transform -rotate-12 hover:rotate-0 transition-transform duration-500 glass-dark border-0">
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mt-10 text-4xl font-black tracking-tight text-gray-950">
            Welcome Back
          </h2>
          <p className="mt-3 text-sm font-bold text-gray-500 uppercase tracking-widest">
            Access your premium dashboard
          </p>
        </div>
      </div>

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md glass p-10 rounded-[3rem] shadow-2xl-indigo border border-white/40">
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-3 animate-shake">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-bold text-red-600">{error}</p>
          </div>
        )}
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="group">
            <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2 group-focus-within:text-indigo-600 transition-colors">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" /></svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-premium w-full py-4 pl-14 pr-6 text-sm font-bold text-gray-800"
                placeholder="you@premium.com"
              />
            </div>
          </div>

          <div className="group">
            <div className="flex items-center justify-between mb-3 ml-2">
              <label htmlFor="password" className="block text-xs font-black uppercase tracking-widest text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                Security Key
              </label>
              <div className="text-xs">
                <a href="#" className="font-extrabold text-indigo-600 hover:text-indigo-500 tracking-tighter">
                  Recover access?
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-premium w-full py-4 pl-14 pr-14 text-sm font-bold text-gray-800"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-5 text-gray-400 hover:text-indigo-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.457 10.457 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center items-center gap-3 rounded-[1.5rem] bg-gray-900 border border-transparent px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-2xl-indigo btn-premium"
          >
            Authenticate
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7-7 7" /></svg>
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-gray-100/50 text-center">
          <p className="text-sm font-extrabold text-gray-400">
            Don't have an elite account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 underline underline-offset-8">
              Join the Hub
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;