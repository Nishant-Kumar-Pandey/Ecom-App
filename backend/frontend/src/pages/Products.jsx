import { motion } from 'framer-motion'
import { Plus, Heart, Filter, Grid, List as ListIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import { toggleWishlist } from '../redux/wishlistSlice'

const Products = () => {
    const dispatch = useDispatch()
    const wishlistItems = useSelector((state) => state.wishlist.items)

    const products = [
        { id: 1, name: "Neural Vision Pro", price: 2999, category: "Tech", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60" },
        { id: 2, name: "Aero Glow Watch", price: 599, category: "Wearables", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60" },
        { id: 3, name: "Ether Pods Max", price: 349, category: "Audio", img: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&auto=format&fit=crop&q=60" },
        { id: 4, name: "Quantum Rig", price: 4500, category: "Computing", img: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&auto=format&fit=crop&q=60" },
        { id: 5, name: "Lumina Desk", price: 899, category: "Home", img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=60" },
        { id: 6, name: "Nebula Chair", price: 1299, category: "Furniture", img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=60" },
    ]

    const isInWishlist = (id) => wishlistItems.some(item => item.id === id)

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
                <div>
                    <h2 className="text-5xl font-black tracking-tight">Curated Gear</h2>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Selected for the modern architect of reality.</p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="glass p-3 rounded-xl hover:bg-white/10 transition-colors">
                        <Filter size={20} />
                    </button>
                    <div className="glass p-1 rounded-xl flex">
                        <button className="p-2 bg-white/10 rounded-lg"><Grid size={18} /></button>
                        <button className="p-2 hover:bg-white/5 rounded-lg"><ListIcon size={18} /></button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {products.map((product, i) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card group cursor-pointer overflow-hidden pb-4"
                    >
                        <div className="relative aspect-square overflow-hidden rounded-xl mb-6">
                            <img
                                src={product.img}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    dispatch(toggleWishlist(product))
                                }}
                                className={`absolute top-4 right-4 p-2 glass rounded-full opacity-0 group-hover:opacity-100 transition-all ${isInWishlist(product.id) ? 'text-red-500 fill-red-500 bg-white/20 scale-110 opacity-100' : 'text-gray-400'}`}
                            >
                                <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                            </button>
                        </div>

                        <div className="space-y-4 px-2">
                            <div className="flex items-start justify-between">
                                <div>
                                    <span className="text-xs font-black uppercase tracking-widest text-purple-500">{product.category}</span>
                                    <h3 className="text-2xl font-black">{product.name}</h3>
                                </div>
                                <span className="text-2xl font-black">${product.price}</span>
                            </div>

                            <button
                                onClick={() => dispatch(addToCart(product))}
                                className="w-full py-3 glass hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                            >
                                Add to Cart <Plus size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Products
