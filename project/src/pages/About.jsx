import React from "react";
import { motion } from "framer-motion";
import {
    Gem,
    Globe,
    Leaf,
    Sparkles,
    Users,
    Award,
    TrendingUp,
    ShieldCheck,
    ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();

    const stats = [
        {
            title: "Expert Curation",
            icon: <Gem className="w-8 h-8" />,
            desc: "Only the top 1% of luxury goods make it into our exclusive collection.",
            color: "from-blue-500 to-indigo-600",
            delay: 0.1
        },
        {
            title: "Global Network",
            icon: <Globe className="w-8 h-8" />,
            desc: "Direct partnerships with elite artisans and designers across 40+ countries.",
            color: "from-indigo-600 to-purple-600",
            delay: 0.2
        },
        {
            title: "Eco-Conscious",
            icon: <Leaf className="w-8 h-8" />,
            desc: "Redefining luxury through sustainable practices and ethical sourcing.",
            color: "from-emerald-500 to-teal-600",
            delay: 0.3
        },
        {
            title: "Elite Support",
            icon: <Sparkles className="w-8 h-8" />,
            desc: "Personalized concierge service available 24/7 for our distinguished members.",
            color: "from-rose-500 to-orange-600",
            delay: 0.4
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="bg-[var(--bg-primary)] min-h-screen pt-32 pb-20 transition-colors duration-500 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, 50, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.15, 0.1],
                        x: [0, -40, 0],
                        y: [0, -60, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]"
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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 mb-8"
                    >
                        <Award size={16} className="text-indigo-500" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Est. 2024 • Excellence in Luxury</span>
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-[0.9]">
                        The Future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                            Digital Elegance
                        </span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                        LuxeMart isn't just a platform; it's a curated ecosystem designed for those who demand the absolute best in life, quality, and design.
                    </p>
                </motion.div>

                {/* Mission Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[4rem] blur-2xl" />
                        <div className="relative glass p-10 md:p-14 rounded-[3.5rem] border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-xl">
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-8 tracking-tight italic">Our Philosophy</h2>
                            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8 font-medium">
                                At LuxeMart, we believe that true luxury lies in the details. Every product in our collection is meticulously vetted to ensure it meets our rigorous standards for craftsmanship, sustainability, and design.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { icon: <ShieldCheck className="text-emerald-500" />, text: "Guaranteed Authenticity" },
                                    { icon: <TrendingUp className="text-indigo-500" />, text: "Curated Global Trends" },
                                    { icon: <Users className="text-purple-500" />, text: "Exclusive Member Benefits" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <span className="font-black text-sm uppercase tracking-wider text-slate-700 dark:text-slate-300">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-6"
                    >
                        <div className="space-y-6 pt-12">
                            <div className="aspect-[4/5] rounded-[2.5rem] bg-indigo-600 flex items-center justify-center p-8 overflow-hidden relative group">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"
                                />
                                <span className="text-6xl font-black text-white/20 group-hover:text-white/40 transition-colors">LM</span>
                            </div>
                            <div className="aspect-square rounded-[2.5rem] glass-card flex flex-col items-center justify-center text-center p-6 border-none shadow-xl">
                                <span className="text-4xl font-black text-indigo-600 mb-2">5M+</span>
                                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Happy Users</span>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="aspect-square rounded-[2.5rem] glass-card flex flex-col items-center justify-center text-center p-6 border-none shadow-xl">
                                <span className="text-4xl font-black text-purple-600 mb-2">99%</span>
                                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Quality Rate</span>
                            </div>
                            <div className="aspect-[4/5] rounded-[2.5rem] bg-slate-900 flex items-center justify-center p-8 overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
                                <Sparkles className="w-16 h-16 text-indigo-400 group-hover:scale-110 transition-transform" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="glass-card p-10 rounded-[3rem] group border-none shadow-indigo-subtle"
                        >
                            <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                                {stat.icon}
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 italic tracking-tight">{stat.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed">{stat.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative p-1 overflow-hidden rounded-[4rem]"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-gradient-x" />
                    <div className="relative glass-card p-16 rounded-[3.9rem] text-center border-none shadow-none backdrop-blur-3xl">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">
                            Ready to Upgrade <br className="hidden md:block" />
                            Your Lifestyle?
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 font-bold text-xl leading-relaxed">
                            Join our elite community and gain early access to limited edition drops and exclusive designer collaborations.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/signup")}
                                className="bg-slate-900 dark:bg-white dark:text-slate-900 px-12 py-6 rounded-[2rem] text-white font-black text-lg shadow-2xl flex items-center gap-3 group"
                            >
                                Get Started
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/")}
                                className="glass-card px-12 py-6 rounded-[2rem] text-slate-900 dark:text-white font-black text-lg shadow-xl"
                            >
                                View Collection
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
