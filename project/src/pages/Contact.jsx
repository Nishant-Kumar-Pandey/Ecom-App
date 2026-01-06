import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Phone,
    Mail,
    MapPin,
    Send,
    MessageSquare,
    Clock,
    ArrowRight,
    Headset
} from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Form submitted:", formData);
        setIsSubmitting(false);
        // Reset form or show success message
    };

    const contactInfo = [
        {
            title: "Concierge Service",
            detail: "+1 (555) LUXE-MART",
            subDetail: "Toll-free, 24/7 Support",
            icon: <Phone className="w-6 h-6" />,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Email Inquiry",
            detail: "elite@luxemart.com",
            subDetail: "Response within 2 hours",
            icon: <Mail className="w-6 h-6" />,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10"
        },
        {
            title: "Global HQ",
            detail: "5th Avenue, New York, NY",
            subDetail: "Corporate Office",
            icon: <MapPin className="w-6 h-6" />,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        }
    ];

    return (
        <div className="bg-[var(--bg-primary)] min-h-screen pt-32 pb-20 transition-colors duration-500 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.15, 0.1],
                        rotate: [0, -90, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
                    >
                        <Headset size={16} className="text-indigo-500" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Elite Concierge • 24/7 Availability</span>
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-[0.9]">
                        Let's Start a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                            Conversation
                        </span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                        Whether you're seeking a specific masterpiece or need assistance with your collection, our elite team is here to provide unparalleled support.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {contactInfo.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i }}
                                whileHover={{ x: 10 }}
                                className="glass-card p-8 rounded-[2.5rem] group border-none shadow-xl hover:shadow-2xl transition-all"
                            >
                                <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 italic tracking-tight">{item.title}</h3>
                                <p className="text-slate-900 dark:text-white font-black text-lg mb-1">{item.detail}</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">{item.subDetail}</p>
                            </motion.div>
                        ))}

                        {/* Additional Info Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-slate-900 dark:bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                            />
                            <MessageSquare className="w-10 h-10 mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                            <h3 className="text-xl font-black mb-4 italic tracking-tight">Live Chat</h3>
                            <p className="text-white/70 font-medium mb-6 leading-relaxed">
                                Need an immediate response? Our specialists are online and ready to help.
                            </p>
                            <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-100 transition-colors shadow-xl">
                                Launch Chat
                            </button>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-8 md:p-12 rounded-[4rem] border-none shadow-2xl backdrop-blur-2xl relative"
                        >
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-20" />

                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Identify Yourself</label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="input-premium w-full px-8 py-6 rounded-[2rem] font-bold"
                                                placeholder="Full Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Electronic Mail</label>
                                        <div className="relative group">
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="input-premium w-full px-8 py-6 rounded-[2rem] font-bold"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Inquiry Topic</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="input-premium w-full px-8 py-6 rounded-[2rem] font-bold"
                                        placeholder="How can we assist you today?"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Your Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className="input-premium w-full px-8 py-6 rounded-[2.5rem] resize-none font-bold"
                                        placeholder="Share your thoughts with us..."
                                    ></textarea>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-7 rounded-[2rem] font-black text-lg uppercase tracking-widest flex items-center justify-center gap-4 transition-all shadow-indigo-premium ${isSubmitting
                                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                        : "btn-premium"
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Clock className="animate-spin" /> Transmitting...
                                        </>
                                    ) : (
                                        <>
                                            Send Transmission <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
