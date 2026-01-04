import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, decrementQuantity } from "../redux/cartSlice";
import StarRating from "./Rating.jsx";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const cartItem = cart.find(item => item.id === product.id);
    return (
        <div className="group relative glass p-4 rounded-[2.5rem] hover-lift transition-all duration-500 flex flex-col h-[480px] animate-in overflow-hidden">
            <div className="relative overflow-hidden aspect-square rounded-[2rem] mb-6">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-white/80 backdrop-blur-xl text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-2xl-indigo border border-white/20">
                        {product.category}
                    </span>
                </div>
            </div>

            <div className="flex flex-col flex-grow px-2">
                <h3 className="text-xl font-black text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {product.title}
                </h3>

                <div className="flex items-center gap-3 mb-6">
                    <div className="flex bg-indigo-50 px-3 py-1 rounded-full items-center gap-1.5">
                        <span className="text-indigo-600 text-sm font-black">{product.rating}</span>
                        <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    </div>
                </div>

                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-3xl font-black text-indigo-900 tracking-tighter">₹{product.price}</p>
                        {product.discountPercentage && (
                            <span className="text-[10px] text-white bg-indigo-600 px-3 py-1.5 rounded-full font-black shadow-lg shadow-indigo-200 uppercase tracking-widest">
                                Save {Math.round(product.discountPercentage)}%
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {cartItem ? (
                            <div className="flex-1 flex items-center justify-between bg-gray-900 text-white rounded-[1.5rem] p-1.5 shadow-2xl-dark animate-in">
                                <button
                                    onClick={() => dispatch(decrementQuantity(product.id))}
                                    className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-white/10 transition-colors active:scale-90"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                    </svg>
                                </button>
                                <span className="font-extrabold text-lg w-10 text-center">{cartItem.quantity}</span>
                                <button
                                    onClick={() => dispatch(addToCart(product))}
                                    className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-white/10 transition-colors active:scale-90"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => dispatch(addToCart(product))}
                                className="flex-1 flex items-center justify-center gap-3 py-4 bg-gray-950 hover:bg-black text-white rounded-[1.5rem] btn-premium shadow-2xl shadow-gray-200"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <span className="font-black text-sm uppercase tracking-widest">Add to Bag</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}