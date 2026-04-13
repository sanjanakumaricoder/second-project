import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ phone: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', credentials);
            
            // Token aur User info save karein
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            alert("Swagat hai! Login ho gaya.");

            // Role ke hisaab se sahi dashboard par bhejeb
            if (res.data.user.role === 'Worker') {
                navigate('/worker-dash');
            } else {
                navigate('/employer-dash');
            }
        } catch (err) {
            alert(err.response?.data?.message || "Phone number ya password galat hai!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden bg-[#f8fafc]">
            {/* Background Animated Blobs (From your index.css) */}
            <div className="blob-bg">
                <div className="blob-1"></div>
                <div className="blob-2"></div>
                <div className="blob-3"></div>
            </div>

            <div className="auth-card animate-slideUp">
                <div className="card-inner border-[1px] border-white/40 shadow-2xl backdrop-blur-xl">
                    
                    {/* Header Section */}
                    <div className="text-center mb-10">
                        <div className="status-badge mx-auto mb-4 animate-bounce-slow">
                            <span className="status-dot">
                                <span className="status-dot-ping"></span>
                                <span className="status-dot-static"></span>
                            </span>
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[2px]">Secure Access</span>
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Wapas Aayein</h2>
                        <p className="text-slate-500 font-medium text-sm mt-1">Apne account mein login karein</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="group">
                            <label className="auth-label group-focus-within:text-blue-600 transition-colors">Phone Number</label>
                            <input 
                                type="text" 
                                placeholder="98XXXXXXXX" 
                                className="auth-input hover:border-blue-200"
                                onChange={(e) => setCredentials({...credentials, phone: e.target.value})} 
                                required 
                            />
                        </div>

                        <div className="group">
                            <label className="auth-label group-focus-within:text-blue-600 transition-colors">Password</label>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                className="auth-input hover:border-blue-200"
                                onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
                                required 
                            />
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="auth-submit auth-submit-worker mt-4 py-4 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-2xl flex justify-center items-center gap-3"
                        >
                            {loading ? "Rukiye..." : "Login Karein 🚀"}
                        </button>
                    </form>

                    {/* Navigation Link */}
                    <div className="text-center mt-10 space-y-3">
                        <p className="text-slate-500 font-semibold text-sm">
                            Account nahi hai? 
                            <span 
                                onClick={() => navigate('/')} 
                                className="text-blue-600 ml-2 cursor-pointer hover:underline underline-offset-4 decoration-2 font-bold"
                            >
                                Register Karein
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;