import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setCredentials } from '../redux/authSlice'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.type]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', formData)
            dispatch(setCredentials(response.data.user))
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card w-full max-w-md space-y-8"
            >
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-black tracking-tight">Welcome Back</h2>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Step into the future of commerce</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-center font-bold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold px-1">Email Address</label>
                        <div className="relative flex items-center">
                            <Mail className="absolute left-3 text-gray-400" size={18} />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="w-full pl-10 pr-4 py-3 glass bg-white/5 rounded-xl border border-white/10 focus:border-purple-500/50 outline-none transition-all font-medium"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold px-1">Password</label>
                        <div className="relative flex items-center">
                            <Lock className="absolute left-3 text-gray-400" size={18} />
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                className="w-full pl-10 pr-4 py-3 glass bg-white/5 rounded-xl border border-white/10 focus:border-purple-500/50 outline-none transition-all font-medium"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm px-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5" />
                            <span className="font-bold text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Remember me</span>
                        </label>
                        <Link to="/" className="text-purple-500 font-bold hover:underline">Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-black text-lg shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <>Sign In <LogIn size={20} /></>}
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                        Don't have an account? <Link to="/signup" className="text-purple-500 font-bold hover:underline">Create Account</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default Login
