import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart, decrementQuantity, clearCart } from "../redux/cartSlice";
import { resolveImageUrl } from "../config";

export default function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="bg-[var(--bg-primary)] min-h-screen pt-32 pb-20 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass p-20 rounded-[3.5rem] text-center animate-in">
                        <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-8">
                            <svg className="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Bag is Empty</h2>
                        <p className="text-gray-500 dark:text-gray-400 font-bold mb-10">Your next premium discovery is just a click away.</p>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-gray-900 dark:bg-white dark:text-gray-900 text-white px-10 py-5 rounded-2xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            Start Exploring
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[var(--bg-primary)] min-h-screen pt-32 pb-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-in">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
                            Your <span className="text-indigo-600 dark:text-indigo-400">Bag</span>
                        </h1>
                        <p className="text-xl text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
                            {cart.length} Exclusive {cart.length === 1 ? 'Item' : 'Items'}
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div key={item.id} className="glass p-6 rounded-[2.5rem] flex flex-col sm:flex-row items-center gap-8 animate-in group">
                                <div className="w-40 h-40 rounded-3xl overflow-hidden shadow-xl flex-shrink-0">
                                    <img src={resolveImageUrl(item.thumbnail)} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="flex-1 w-full">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-2xl font-black text-gray-900 dark:text-white">{item.title}</h3>
                                        <button
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all"
                                        >
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                    <p className="text-indigo-600 dark:text-indigo-400 font-black text-xl mb-6">₹{item.price}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center bg-gray-50 dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-700">
                                            <button
                                                onClick={() => dispatch(decrementQuantity(item.id))}
                                                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 shadow-sm transition-all"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" /></svg>
                                            </button>
                                            <span className="w-12 text-center font-black text-gray-900 dark:text-white text-lg">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch(addToCart(item))}
                                                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 shadow-sm transition-all"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v12M6 12h12" /></svg>
                                            </button>
                                        </div>
                                        <p className="font-black text-2xl text-gray-900 dark:text-white tracking-tighter">₹{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="animate-in delay-1">
                        <div className="glass p-10 rounded-[3.5rem] shadow-2xl sticky top-32">
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Summary</h3>
                            <div className="space-y-6 mb-8">
                                <div className="flex justify-between text-gray-500 dark:text-gray-400 font-bold">
                                    <span>Total Items</span>
                                    <span className="text-gray-900 dark:text-white">{totalItems} Units</span>
                                </div>
                                <div className="flex justify-between text-gray-500 dark:text-gray-400 font-bold">
                                    <span>Shipping</span>
                                    <span className="text-emerald-500 uppercase tracking-widest text-sm font-black">Complimentary</span>
                                </div>
                                <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-end">
                                    <span className="text-xl font-black text-gray-900 dark:text-white">Total</span>
                                    <div className="text-right">
                                        <span className="block text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">₹{totalPrice.toFixed(2)}</span>
                                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">Incl. VAT</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate("/checkout")}
                                className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-black py-6 rounded-2xl btn-premium text-lg shadow-2xl transition-all active:scale-95 mb-6"
                            >
                                Begin Checkout
                            </button>
                            <div className="text-center">
                                <button
                                    onClick={() => dispatch(clearCart())}
                                    className="w-full py-4 glass border-red-100 dark:border-red-900/20 text-red-500 font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-3"
                                >
                                    Reset Bag
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}