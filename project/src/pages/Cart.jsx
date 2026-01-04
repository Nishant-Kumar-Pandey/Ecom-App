import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart, decrementQuantity, clearCart } from "../redux/cartSlice";

export default function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-indigo-50/20 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-in">
                <div className="text-center glass p-16 rounded-[3.5rem] shadow-2xl-indigo border border-white/40 max-w-lg">
                    <div className="mx-auto h-24 w-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center mb-8">
                        <svg className="h-12 w-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h3 className="text-3xl font-black text-gray-950 mb-4">Your bag is empty</h3>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-relaxed mb-10">
                        Looks like you haven't <br /> picked your premium items yet.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center px-10 py-5 bg-gray-900 text-white rounded-[1.5rem] font-black text-lg btn-premium shadow-2xl"
                    >
                        Start Exploring
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfdfe] py-24 px-4 sm:px-6 lg:px-8 selection:bg-indigo-100">
            <div className="max-w-7xl mx-auto pt-8">
                <div className="flex items-center gap-4 mb-12 animate-in">
                    <h1 className="text-5xl font-black text-gray-950 tracking-tighter">Shopping Bag</h1>
                    <span className="h-2 w-2 rounded-full bg-indigo-600 mt-4"></span>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items Section */}
                    <div className="flex-1 space-y-8 animate-in delay-1">
                        {cart.map((item, idx) => (
                            <div key={item.id} className="glass p-8 rounded-[2.5rem] shadow-2xl-indigo border border-white/40 flex flex-col sm:flex-row items-center gap-10 hover-lift transition-all duration-500 group">
                                <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-[2rem] shadow-xl relative">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-indigo-600/5 group-hover:bg-transparent transition-colors"></div>
                                </div>

                                <div className="flex-1 w-full flex flex-col">
                                    <div className="flex justify-between items-start gap-4 mb-4">
                                        <div>
                                            <h3 className="text-2xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mt-1">{item.category}</p>
                                        </div>
                                        <p className="text-2xl font-black text-gray-950 tracking-tighter">₹{item.price * item.quantity}</p>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-6 mt-8">
                                        <div className="flex items-center gap-3 p-1.5 glass-dark rounded-[1.5rem] shadow-xl">
                                            <button
                                                onClick={() => dispatch(decrementQuantity(item.id))}
                                                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white text-white hover:text-gray-900 transition-all active:scale-90"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M20 12H4" /></svg>
                                            </button>
                                            <span className="w-10 text-center font-black text-xl text-white">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch(addToCart(item))}
                                                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white text-white hover:text-gray-900 transition-all active:scale-90"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M12 4v16m8-8H4" /></svg>
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="flex items-center gap-3 px-6 py-3 rounded-2xl text-red-500 font-extrabold hover:bg-red-50 transition-colors group/del"
                                        >
                                            <svg className="w-5 h-5 group-hover/del:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            <span className="text-sm uppercase tracking-widest">Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary Section */}
                    <div className="lg:w-[400px] animate-in delay-2">
                        <div className="glass p-10 rounded-[3.5rem] shadow-2xl-indigo border border-white/40 sticky top-32 lg:pb-12">
                            <h2 className="text-2xl font-black text-gray-950 mb-10 tracking-tight">Summary</h2>

                            <div className="space-y-6 mb-10">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Items</span>
                                    <span className="text-lg font-black text-gray-900">{totalItems} Units</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Shipping</span>
                                    <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full uppercase tracking-tighter">Complimentary</span>
                                </div>
                                <div className="h-px bg-gray-100 mt-6"></div>
                                <div className="flex items-center justify-between pt-4">
                                    <span className="text-base font-black text-gray-900 tracking-tight">Grand Total</span>
                                    <span className="text-4xl font-black text-indigo-600 tracking-tighter">₹{totalAmount}</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => navigate('/checkout')}
                                className="w-full flex justify-center items-center gap-3 px-8 py-5 bg-gray-900 text-white rounded-[1.8rem] font-black text-lg btn-premium shadow-2xl-dark mb-6"
                            >
                                Checkout
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7-7 7" /></svg>
                            </button>

                            <div className="text-center">
                                <button
                                    onClick={() => dispatch(clearCart())}
                                    className="w-full py-4 glass border-red-100 text-red-500 font-black text-sm uppercase tracking-widest rounded-[1.8rem] hover:bg-red-50 transition-colors mb-6 flex items-center justify-center gap-3"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    Reset Bag
                                </button>
                                <Link to="/" className="text-xs font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-600 transition-colors underline underline-offset-8">
                                    or Continue Hunt
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}