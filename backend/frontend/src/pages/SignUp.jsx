import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Camera, ArrowRight, Loader2 } from 'lucide-react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../redux/authSlice'

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: null
    })
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        if (e.target.name === 'avatar') {
            const file = e.target.files[0]
            setFormData({ ...formData, avatar: file })
            setPreview(URL.createObjectURL(file))
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const data = new FormData()
        data.append('username', formData.username)
        data.append('email', formData.email)
        data.append('password', formData.password)
        if (formData.avatar) {
            data.append('avatar', formData.avatar)
        }

        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            console.log('Registration Success:', response.data)

            // Auto-login after registration if the backend supports it or just redirect
            // Usually register might not return user object for session, let's check Authcontroller
            // In Authcontroller.js, it returns { message: "User registered successfully" }
            // So we should redirect to login.
            navigate('/login')
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[90vh] px-4 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card w-full max-w-lg space-y-8 p-10"
            >
                <div className="text-center space-y-2">
                    <h2 className="text-5xl font-black tracking-tight">Join Us</h2>
                    <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">Create your future profile today</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-center font-bold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-3xl glass overflow-hidden flex items-center justify-center border-2 border-dashed border-white/20 group-hover:border-purple-500/50 transition-all">
                                {preview ? (
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <Camera className="text-gray-400" size={40} />
                                )}
                            </div>
                            <input
                                type="file"
                                name="avatar"
                                onChange={handleChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept="image/*"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-purple-600 p-2 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                <Plus size={16} className="text-white" />
                            </div>
                        </div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Upload Avatar</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold px-1">Username</label>
                            <div className="relative flex items-center">
                                <User className="absolute left-3 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 glass bg-white/5 rounded-xl border border-white/10 focus:border-purple-500/50 outline-none transition-all font-medium"
                                    placeholder="john_doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold px-1">Email Address</label>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-3 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 glass bg-white/5 rounded-xl border border-white/10 focus:border-purple-500/50 outline-none transition-all font-medium"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold px-1">Password</label>
                        <div className="relative flex items-center">
                            <Lock className="absolute left-3 text-gray-400" size={18} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 glass bg-white/5 rounded-xl border border-white/10 focus:border-purple-500/50 outline-none transition-all font-medium"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-black text-xl shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={24} /> : <>Create Account <ArrowRight size={20} /></>}
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                        Already have an account? <Link to="/login" className="text-purple-500 font-bold hover:underline">Sign In</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

const Plus = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
)

export default SignUp
