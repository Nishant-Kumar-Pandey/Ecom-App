import { motion } from 'framer-motion'
import { Sun, Moon, ShoppingCart, User, Search, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const dispatch = useDispatch()
    const { totalQuantity } = useSelector((state) => state.cart)
    const { user, isAuthenticated } = useSelector((state) => state.auth)

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-4 z-50 mx-4"
        >
            <div className="glass rounded-2xl px-6 py-4 flex items-center justify-between shadow-2xl border border-white/20 dark:border-white/10">
                <Link to="/" className="text-2xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    E-GLASS
                </Link>

                <div className="hidden md:flex items-center space-x-8 font-bold">
                    <Link to="/products" className="hover:text-purple-500 transition-colors">Shop</Link>
                    <Link to="/" className="hover:text-purple-500 transition-colors">Categories</Link>
                    <Link to="/" className="hover:text-purple-500 transition-colors">Deals</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <Search size={20} />
                    </button>
                    <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button className="p-2 rounded-full hover:bg-white/10 transition-colors relative">
                        <ShoppingCart size={20} />
                        {totalQuantity > 0 && (
                            <span className="absolute -top-1 -right-1 bg-purple-500 text-[10px] text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {totalQuantity}
                            </span>
                        )}
                    </button>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <Link to="/profile">
                                <div className="w-10 h-10 rounded-full border-2 border-purple-500 overflow-hidden glass">
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <User size={20} />
                                        </div>
                                    )}
                                </div>
                            </Link>
                            <button
                                onClick={() => dispatch(logout())}
                                className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <User size={20} />
                        </Link>
                    )}
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar
