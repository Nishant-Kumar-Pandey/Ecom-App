import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react'

const Home = () => {
    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden rounded-[3rem]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/30 blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/20 blur-[100px] rounded-full" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center space-y-8 px-4"
                >
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-tight">
                        FUTURE OF <br />
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            SHOPPING
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
                        Experience the next generation of e-commerce with our glassmorphic interface and lightning-fast performance.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold text-lg flex items-center gap-2 hover:scale-105 transition-transform">
                            Shop Now <ArrowRight size={20} />
                        </button>
                        <button className="px-8 py-4 glass rounded-full font-bold text-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors">
                            Browse Collections
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Features */}
            <section className="grid md:grid-cols-3 gap-8 px-4">
                {[
                    { icon: <Zap className="text-yellow-500" />, title: "Fast Delivery", desc: "Get your products within 24 hours with our global network." },
                    { icon: <Shield className="text-green-500" />, title: "Secure Payment", desc: "Military-grade encryption for all your transactions." },
                    { icon: <Sparkles className="text-purple-500" />, title: "Premium Quality", desc: "Only the best curated products for our exclusive members." }
                ].map((feat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card flex flex-col items-center text-center space-y-4"
                    >
                        <div className="p-4 bg-white/5 rounded-2xl shadow-inner">
                            {feat.icon}
                        </div>
                        <h3 className="text-2xl font-black">{feat.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">{feat.desc}</p>
                    </motion.div>
                ))}
            </section>
        </div>
    )
}

export default Home
