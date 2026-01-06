import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Star, Plus, Minus, Heart } from "lucide-react";
import { addToCart, decrementQuantity } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const cartItem = cart.find(item => item.id === product.id);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10 }}
            className="group relative glass-card p-4 flex flex-col h-[500px] overflow-hidden"
        >
            {/* Image Section */}
            <div className="relative aspect-square rounded-[1.8rem] overflow-hidden mb-5">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover"
                />

                {/* Overlay Badges */}
                <div className="absolute top-4 inset-x-4 flex justify-between items-start">
                    <span className="px-4 py-1.5 rounded-full glass border border-white/20 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                        {product.category}
                    </span>
                    <motion.button
                        whileTap={{ scale: 0.8 }}
                        className="p-2.5 rounded-2xl glass border border-white/20 text-slate-400 hover:text-pink-500 transition-colors"
                    >
                        <Heart size={18} />
                    </motion.button>
                </div>

                {product.discountPercentage > 0 && (
                    <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-lg shadow-lg">
                            -{Math.round(product.discountPercentage)}% OFF
                        </span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white line-clamp-1">
                        {product.title}
                    </h3>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-lg">
                        <Star size={14} className="fill-amber-500 text-amber-500" />
                        <span className="text-sm font-black text-amber-600">{product.rating}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-400">({Math.floor(Math.random() * 100) + 50} reviews)</span>
                </div>

                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Price</span>
                            <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">₹{product.price}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <AnimatePresence mode="wait">
                            {cartItem ? (
                                <motion.div
                                    key="in-cart"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="flex-1 flex items-center justify-between bg-slate-900 dark:bg-slate-800 rounded-2xl p-1.5"
                                >
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => dispatch(decrementQuantity(product.id))}
                                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-white"
                                    >
                                        <Minus size={18} />
                                    </motion.button>
                                    <span className="font-black text-white">{cartItem.quantity}</span>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => dispatch(addToCart(product))}
                                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-white"
                                    >
                                        <Plus size={18} />
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <motion.button
                                    key="add-to-cart"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => dispatch(addToCart(product))}
                                    className="flex-1 btn-premium py-4"
                                >
                                    <ShoppingBag size={18} />
                                    <span className="text-sm uppercase tracking-widest font-black">Add to Bag</span>
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}