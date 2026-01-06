import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    CreditCard,
    Building2,
    Wallet,
    Clock,
    ShieldCheck,
    ChevronRight,
    Smartphone,
    Plus,
    Lock
} from "lucide-react";

const PaymentOptionsModal = ({ isOpen, onClose, onPaymentComplete, user = null }) => {
    const [selectedMethod, setSelectedMethod] = useState("cards");
    const [cardDetails, setCardDetails] = useState({
        number: "",
        expiry: "",
        cvv: "",
        saveCard: false,
    });
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCardDetails({
            ...cardDetails,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleContinue = async () => {
        setIsProcessing(true);
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        onPaymentComplete(selectedMethod, cardDetails);
        setIsProcessing(false);
    };

    const paymentMethods = [
        { id: "cards", label: "Credit / Debit Cards", icon: <CreditCard className="w-5 h-5" /> },
        { id: "netbanking", label: "Net Banking", icon: <Building2 className="w-5 h-5" /> },
        { id: "wallet", label: "Digital Wallets", icon: <Wallet className="w-5 h-5" /> },
        { id: "upi", label: "UPI Apps", icon: <Smartphone className="w-5 h-5" /> },
        { id: "paylater", label: "Pay Later", icon: <Clock className="w-5 h-5" /> }
    ];

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 300 } },
        exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    <motion.div
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />

                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative bg-white dark:bg-slate-950 rounded-[3rem] shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row h-[700px] border border-white/20 dark:border-slate-800"
                    >
                        {/* Left Sidebar - Transaction Summary */}
                        <div className="w-full md:w-[35%] bg-slate-900 dark:bg-slate-900 p-10 text-white relative flex flex-col overflow-hidden">
                            {/* Animated Background Elements */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.1, 0.2, 0.1]
                                }}
                                transition={{ duration: 10, repeat: Infinity }}
                                className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500 rounded-full blur-[80px]"
                            />
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.1, 0.15, 0.1]
                                }}
                                transition={{ duration: 12, repeat: Infinity, delay: 1 }}
                                className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500 rounded-full blur-[100px]"
                            />

                            <div className="relative z-10 h-full flex flex-col">
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                                        <ShieldCheck className="text-indigo-400 w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] opacity-50">Secure Checkout</h4>
                                        <span className="font-black text-lg tracking-tight italic">LuxeMart Pay</span>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="glass-card bg-white/5 border-white/10 p-8 rounded-[2rem]">
                                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Investment Amount</p>
                                        <h3 className="text-5xl font-black tracking-tighter mb-6">₹549<span className="text-xl text-slate-500 font-medium ml-1">.00</span></h3>
                                        <div className="h-px bg-white/10 w-full mb-6"></div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                                                <span>Subtotal</span>
                                                <span className="text-white">₹499.00</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                                                <span>Tax (GST 10%)</span>
                                                <span className="text-white">₹50.00</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 px-6 py-4 glass-card bg-indigo-500/10 border-indigo-500/20 rounded-2xl">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        <p className="text-xs font-bold text-slate-300">Logged in as <span className="text-white">
                                            {user?.phone
                                                ? user.phone.replace(/(\+\d{1,4})?[\s-]?\d{3,5}[\s-]?(\d{3,5})/, "$1 ***** $2")
                                                : "+ ********* 25"}
                                        </span></p>
                                    </div>
                                </div>

                                <div className="mt-auto pt-8 flex items-center justify-center gap-6 opacity-40">
                                    <Plus size={20} />
                                    <Lock size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">End-to-End Encrypted</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Payment Methods */}
                        <div className="w-full md:w-[65%] flex flex-col bg-white dark:bg-slate-950 relative">
                            {/* Header */}
                            <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-slate-800/50">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight italic">Payment Method</h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Select your preferred transaction channel</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-4 bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex flex-1 overflow-hidden">
                                {/* Navigation Rail */}
                                <div className="w-1/3 bg-slate-50 dark:bg-slate-900/50 border-r border-slate-100 dark:border-slate-800/50 p-6 space-y-3 overflow-y-auto">
                                    {paymentMethods.map((method) => (
                                        <motion.button
                                            key={method.id}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedMethod(method.id)}
                                            className={`w-full text-left px-5 py-5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-between transition-all duration-300 ${selectedMethod === method.id
                                                ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xl shadow-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20 translate-x-2"
                                                : "text-slate-500 dark:text-slate-500 hover:bg-white dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-300"
                                                }`}
                                        >
                                            <span className="flex items-center gap-4">
                                                {method.icon}
                                                {method.label.split(' ')[0]}
                                            </span>
                                            {selectedMethod === method.id && (
                                                <motion.div
                                                    layoutId="active-indicator"
                                                    className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Content Area */}
                                <div className="w-2/3 p-10 overflow-y-auto">
                                    <AnimatePresence mode="wait">
                                        {selectedMethod === "cards" ? (
                                            <motion.div
                                                key="cards"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-8"
                                            >
                                                <div className="flex items-center justify-between mb-8">
                                                    <h3 className="text-slate-900 dark:text-white font-black italic text-xl tracking-tight">Card Information</h3>
                                                    <div className="flex gap-2">
                                                        <div className="w-10 h-6 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700" />
                                                        <div className="w-10 h-6 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700" />
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Account Number</label>
                                                        <input
                                                            type="text"
                                                            name="number"
                                                            value={cardDetails.number}
                                                            onChange={handleInputChange}
                                                            placeholder="0000 0000 0000 0000"
                                                            className="input-premium w-full px-8 py-5 rounded-2xl font-mono text-lg tracking-[0.1em]"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-6">
                                                        <div className="space-y-3">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Validity</label>
                                                            <input
                                                                type="text"
                                                                name="expiry"
                                                                value={cardDetails.expiry}
                                                                onChange={handleInputChange}
                                                                placeholder="MM / YY"
                                                                className="input-premium w-full px-8 py-5 rounded-2xl font-mono"
                                                            />
                                                        </div>
                                                        <div className="space-y-3">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Verification</label>
                                                            <input
                                                                type="password"
                                                                name="cvv"
                                                                value={cardDetails.cvv}
                                                                onChange={handleInputChange}
                                                                placeholder="•••"
                                                                maxLength="4"
                                                                className="input-premium w-full px-8 py-5 rounded-2xl font-mono"
                                                            />
                                                        </div>
                                                    </div>

                                                    <label className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer group">
                                                        <input
                                                            type="checkbox"
                                                            name="saveCard"
                                                            checked={cardDetails.saveCard}
                                                            onChange={handleInputChange}
                                                            className="w-5 h-5 rounded-lg border-2 border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500/20 transition-all cursor-pointer"
                                                        />
                                                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-tight uppercase tracking-wider group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                                                            Archive card for future transactions as per global standards
                                                        </span>
                                                    </label>

                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={handleContinue}
                                                        disabled={isProcessing}
                                                        className={`w-full py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl transition-all ${isProcessing
                                                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                                            : "btn-premium"
                                                            }`}
                                                    >
                                                        {isProcessing ? (
                                                            <span className="flex items-center justify-center gap-3">
                                                                <Clock className="animate-spin w-4 h-4" /> Processing...
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center justify-center gap-3">
                                                                Authorize Payment <ChevronRight size={18} />
                                                            </span>
                                                        )}
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="others"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="h-full flex flex-col items-center justify-center text-center p-12"
                                            >
                                                <div className="w-24 h-24 glass-card bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-8 border-none">
                                                    <Lock size={32} className="text-indigo-500 animate-pulse" />
                                                </div>
                                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 italic">Vault Restricted</h3>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-bold max-w-xs">
                                                    This specific transmission channel is currently undergoing security audits.
                                                </p>
                                                <button
                                                    onClick={() => setSelectedMethod("cards")}
                                                    className="mt-10 px-8 py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform"
                                                >
                                                    Use Default Card Channel
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PaymentOptionsModal;
