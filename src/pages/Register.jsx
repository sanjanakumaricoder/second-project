import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('Worker');
    const [formData, setFormData] = useState({ name: '', phone: '', location: '', skill: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { ...formData, role });
            alert("Registration Success! Ab Login karein.");
            navigate('/login');
        } catch (err) {
            alert("Registration Fail!");
        }
    };

    // Keyframes animation style
    const keyframes = `
        @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(20px, -20px) scale(1.1); }
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ping {
            75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes bounceSlow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
    `;

    return (
        <>
            <style>{keyframes}</style>
            <div style={{
                minHeight: '100vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                overflow: 'hidden',
                backgroundColor: '#f8fafc'
            }}>
                {/* Background Animated Blobs */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    overflow: 'hidden',
                    zIndex: 0
                }}>
                    <div style={{
                        position: 'absolute',
                        width: '400px',
                        height: '400px',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        borderRadius: '50%',
                        filter: 'blur(60px)',
                        opacity: 0.6,
                        top: '-100px',
                        left: '-100px',
                        animation: 'float 20s ease-in-out infinite'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        width: '500px',
                        height: '500px',
                        background: 'linear-gradient(135deg, #f97316, #ef4444)',
                        borderRadius: '50%',
                        filter: 'blur(60px)',
                        opacity: 0.6,
                        bottom: '-150px',
                        right: '-150px',
                        animation: 'float 20s ease-in-out infinite',
                        animationDelay: '-5s'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        width: '300px',
                        height: '300px',
                        background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                        borderRadius: '50%',
                        filter: 'blur(60px)',
                        opacity: 0.4,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        animation: 'float 20s ease-in-out infinite',
                        animationDelay: '-10s'
                    }}></div>
                </div>

                {/* Auth Card */}
                <div style={{
                    animation: 'slideUp 0.8s ease-out',
                    position: 'relative',
                    zIndex: 10,
                    width: '100%',
                    maxWidth: '32rem'
                }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '2rem',
                        padding: '2rem',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        border: '1px solid rgba(255, 255, 255, 0.4)'
                    }}>
                        
                        {/* Top Branding Section */}
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: 'rgba(59, 130, 246, 0.1)',
                                padding: '0.5rem 1rem',
                                borderRadius: '9999px',
                                marginBottom: '1rem'
                            }}>
                                <span style={{
                                    position: 'relative',
                                    display: 'inline-flex',
                                    width: '12px',
                                    height: '12px'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#3b82f6',
                                        borderRadius: '50%',
                                        animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                                        opacity: 0.75
                                    }}></span>
                                    <span style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#3b82f6',
                                        borderRadius: '50%'
                                    }}></span>
                                </span>
                                <span style={{
                                    fontSize: '10px',
                                    fontWeight: 900,
                                    color: '#2563eb',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px'
                                }}>Bharat Ka Portal</span>
                            </div>
                            <h2 style={{
                                fontSize: '2.25rem',
                                fontWeight: 900,
                                color: '#0f172a',
                                letterSpacing: '-0.025em',
                                margin: 0
                            }}>Naya Account</h2>
                            <p style={{
                                color: '#64748b',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                                marginTop: '0.25rem'
                            }}>
                                Join as <span style={{ color: role === 'Worker' ? '#2563eb' : '#f97316' }}>{role}</span> to get started
                            </p>
                        </div>

                        {/* Premium Role Selector */}
                        <div style={{
                            padding: '0.375rem',
                            background: 'rgba(241, 245, 249, 0.5)',
                            borderRadius: '1rem',
                            marginBottom: '2rem',
                            display: 'flex',
                            gap: '0.5rem'
                        }}>
                            <div 
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    fontSize: '0.875rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    borderRadius: '0.75rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontWeight: 'bold',
                                    backgroundColor: role === 'Worker' ? '#2563eb' : 'transparent',
                                    color: role === 'Worker' ? 'white' : '#64748b',
                                    boxShadow: role === 'Worker' ? '0 10px 15px -3px rgba(37, 99, 235, 0.2)' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (role !== 'Worker') {
                                        e.target.style.backgroundColor = 'rgba(255,255,255,0.5)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (role !== 'Worker') {
                                        e.target.style.backgroundColor = 'transparent';
                                    }
                                }}
                                onClick={() => setRole('Worker')}
                            >
                                🛠️ Worker
                            </div>
                            <div 
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    fontSize: '0.875rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    borderRadius: '0.75rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontWeight: 'bold',
                                    backgroundColor: role === 'Employer' ? '#f97316' : 'transparent',
                                    color: role === 'Employer' ? 'white' : '#64748b',
                                    boxShadow: role === 'Employer' ? '0 10px 15px -3px rgba(249, 115, 22, 0.2)' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (role !== 'Employer') {
                                        e.target.style.backgroundColor = 'rgba(255,255,255,0.5)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (role !== 'Employer') {
                                        e.target.style.backgroundColor = 'transparent';
                                    }
                                }}
                                onClick={() => setRole('Employer')}
                            >
                                💼 Owner
                            </div>
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <label style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 'bold',
                                    color: '#334155',
                                    marginLeft: '0.25rem',
                                    display: 'block',
                                    marginBottom: '0.25rem',
                                    transition: 'color 0.3s ease'
                                }}>Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Rahul Sharma" 
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        backgroundColor: '#f8fafc',
                                        border: '2px solid #e2e8f0',
                                        borderRadius: '0.75rem',
                                        outline: 'none',
                                        transition: 'all 0.3s ease',
                                        fontSize: '1rem',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#3b82f6';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                    required 
                                />
                            </div>

                            <div>
                                <label style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 'bold',
                                    color: '#334155',
                                    marginLeft: '0.25rem',
                                    display: 'block',
                                    marginBottom: '0.25rem'
                                }}>Phone Number</label>
                                <input 
                                    type="text" 
                                    placeholder="+91 9988XXXXXX" 
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        backgroundColor: '#f8fafc',
                                        border: '2px solid #e2e8f0',
                                        borderRadius: '0.75rem',
                                        outline: 'none',
                                        transition: 'all 0.3s ease',
                                        fontSize: '1rem',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#3b82f6';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                                    required 
                                />
                            </div>

                            {role === 'Worker' && (
                                <div style={{
                                    animation: 'bounceSlow 0.5s ease-out'
                                }}>
                                    <label style={{
                                        fontSize: '0.875rem',
                                        fontWeight: 'bold',
                                        color: '#334155',
                                        marginLeft: '0.25rem',
                                        display: 'block',
                                        marginBottom: '0.25rem'
                                    }}>Choose Skill</label>
                                    <select 
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            backgroundColor: '#f8fafc',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '0.75rem',
                                            outline: 'none',
                                            transition: 'all 0.3s ease',
                                            fontSize: '1rem',
                                            cursor: 'pointer',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#3b82f6';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#e2e8f0';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                        onChange={(e) => setFormData({...formData, skill: e.target.value})} 
                                        required
                                    >
                                        <option value="">Select your work</option>
                                        <option value="Gardener">Gardener (Mali)</option>
                                        <option value="Cleaning">Cleaning (Safai)</option>
                                        <option value="Helper">Helper (Sahayak)</option>
                                        <option value="Electrician">Electrician</option>
                                    </select>
                                </div>
                            )}

                            <div>
                                <label style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 'bold',
                                    color: '#334155',
                                    marginLeft: '0.25rem',
                                    display: 'block',
                                    marginBottom: '0.25rem'
                                }}>Location</label>
                                <input 
                                    type="text" 
                                    placeholder="Indore, Madhya Pradesh" 
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        backgroundColor: '#f8fafc',
                                        border: '2px solid #e2e8f0',
                                        borderRadius: '0.75rem',
                                        outline: 'none',
                                        transition: 'all 0.3s ease',
                                        fontSize: '1rem',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#3b82f6';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})} 
                                    required 
                                />
                            </div>

                            <div>
                                <label style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 'bold',
                                    color: '#334155',
                                    marginLeft: '0.25rem',
                                    display: 'block',
                                    marginBottom: '0.25rem'
                                }}>Password</label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        backgroundColor: '#f8fafc',
                                        border: '2px solid #e2e8f0',
                                        borderRadius: '0.75rem',
                                        outline: 'none',
                                        transition: 'all 0.3s ease',
                                        fontSize: '1rem',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#3b82f6';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                                    required 
                                />
                            </div>

                            {/* Submit Button with Dynamic Gradient */}
                            <button 
                                type="submit" 
                                style={{
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    borderRadius: '1rem',
                                    fontWeight: 900,
                                    fontSize: '1.125rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                    background: role === 'Worker' 
                                        ? 'linear-gradient(135deg, #2563eb, #4f46e5)' 
                                        : 'linear-gradient(135deg, #f97316, #dc2626)',
                                    color: 'white'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 30px 60px -12px rgba(0, 0, 0, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                                }}
                                onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
                                onMouseUp={(e) => e.target.style.transform = 'translateY(-2px)'}
                            >
                                Register Now <span style={{ marginLeft: '0.5rem' }}>🚀</span>
                            </button>
                        </form>

                        <p style={{
                            textAlign: 'center',
                            marginTop: '2rem',
                            color: '#64748b',
                            fontWeight: 600,
                            fontSize: '0.875rem'
                        }}>
                            Already have an account? 
                            <span 
                                onClick={() => navigate('/login')} 
                                style={{
                                    color: '#2563eb',
                                    marginLeft: '0.5rem',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '4px',
                                    textDecorationThickness: '2px'
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                                onMouseLeave={(e) => e.target.style.color = '#2563eb'}
                            >
                                Login Here
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;