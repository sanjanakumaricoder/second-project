import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
                KaamConnect 🛠️
            </h1>
            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <span className="font-semibold text-gray-700 underline decoration-blue-500">
                            Hi, {user.name} ({user.role})
                        </span>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                            Logout
                        </button>
                    </>
                ) : (
                    <button onClick={() => navigate('/login')} className="text-blue-600 font-bold">
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}