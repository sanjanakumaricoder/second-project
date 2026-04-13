import React, { useState, useEffect } from 'react';
import './../index.css';

const EmployerDash = () => {
    // 1. User State (LocalStorage se data uthana)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [editMode, setEditMode] = useState(false);
    const [tempData, setTempData] = useState({ ...user });
    
    // 📍 Filter state for workers
    const [workerSearch, setWorkerSearch] = useState(user.location || "");

    // 📍 Dummy Workers Data
    const [allWorkers] = useState([
        { id: 1, name: "Kailash Gehlot", skill: "Gardener", location: "Vijay Nagar", phone: "9826011111", status: "Available" },
        { id: 2, name: "Rahul Verma", skill: "Helper", location: "Bhawarkua", phone: "9977022222", status: "Working" },
        { id: 3, name: "Sohan Lal", skill: "Cleaning", location: "Palasia", phone: "9009033333", status: "Available" },
        { id: 4, name: "Deepak Singh", skill: "Gardener", location: "Vijay Nagar", phone: "9111044444", status: "Available" },
        { id: 5, name: "Arjun Kumar", skill: "Helper", location: "Rau", phone: "8822055555", status: "Available" },
        { id: 6, name: "Suresh Mehra", skill: "Cleaning", location: "Bhawarkua", phone: "7733066666", status: "Available" }
    ]);

    // Profile Save Function
    const handleSaveProfile = () => {
        localStorage.setItem('user', JSON.stringify(tempData));
        setUser(tempData);
        setEditMode(false);
        alert("Profile Update Ho Gayi! ✨");
    };

    // Filter Logic
    const nearestWorkers = allWorkers.filter(worker => 
        worker.location.toLowerCase().includes(workerSearch.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#f1f5f9] flex flex-col md:flex-row">
            
            {/* ========== SIDEBAR: OWNER PROFILE & EDIT ========== */}
            <aside className="w-full md:w-80 bg-white shadow-2xl p-8 md:h-screen sticky top-0 z-20 overflow-y-auto border-r border-slate-100 flex flex-col">
                <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl mx-auto flex items-center justify-center text-white text-4xl font-black shadow-xl mb-4">
                        {user.name?.[0]}
                    </div>
                    
                    {!editMode ? (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl font-black text-slate-800">{user.name}</h2>
                            <p className="text-orange-600 font-bold text-sm mb-6 flex items-center justify-center gap-1">
                                👑 Prime Owner • 📍 {user.location}
                            </p>
                            <button 
                                onClick={() => setEditMode(true)}
                                className="w-full py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all flex items-center justify-center gap-2"
                            >
                                ✏️ Edit My Profile
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4 text-left animate-slideUp bg-slate-50 p-4 rounded-2xl">
                            <div>
                                <label className="auth-label text-[10px]">Apna Naam</label>
                                <input type="text" className="auth-input p-2 text-sm" value={tempData.name} onChange={(e)=>setTempData({...tempData, name: e.target.value})} />
                            </div>
                            <div>
                                <label className="auth-label text-[10px]">Location (Area)</label>
                                <input type="text" className="auth-input p-2 text-sm" value={tempData.location} onChange={(e)=>setTempData({...tempData, location: e.target.value})} />
                            </div>
                            <div className="flex gap-2">
                                <button onClick={handleSaveProfile} className="flex-1 py-2 bg-orange-600 text-white rounded-lg font-bold text-xs">Save</button>
                                <button onClick={() => setEditMode(false)} className="flex-1 py-2 bg-slate-200 text-slate-600 rounded-lg font-bold text-xs">X</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-auto space-y-4">
                    <div className="p-4 bg-blue-50 rounded-2xl">
                        <p className="text-xs font-bold text-blue-400 uppercase">Dashboard Tips</p>
                        <p className="text-[11px] text-blue-700 mt-1 font-medium">Workers ko direct call karke dihadi fix karein.</p>
                    </div>
                    <button 
                        onClick={() => {localStorage.clear(); window.location.href='/login'}} 
                        className="w-full py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all"
                    >
                        🚪 Logout Account
                    </button>
                </div>
            </aside>

            {/* ========== MAIN CONTENT: WORKER DISCOVERY ========== */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    <header className="mb-10">
                        <h3 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Owner Dashboard</h3>
                        <p className="text-slate-500 font-medium">Apne area <span className="text-blue-600 font-bold">"{user.location}"</span> mein workers dhoondhein.</p>
                    </header>

                    <section className="mt-10">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-blue-600 rounded-full"></span> 
                                    Aas-Paas Ke Workers
                                </h3>
                            </div>
                            
                            <div className="relative w-full md:w-72">
                                <input 
                                    type="text" 
                                    placeholder="Area badlein..." 
                                    className="w-full p-4 pl-12 rounded-2xl border-none shadow-xl focus:ring-2 ring-blue-500 transition-all font-bold text-sm"
                                    value={workerSearch}
                                    onChange={(e) => setWorkerSearch(e.target.value)}
                                />
                                <span className="absolute left-4 top-4">📍</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {nearestWorkers.length > 0 ? nearestWorkers.map(worker => (
                                <div key={worker.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 group">
                                    <div className="flex gap-5 items-center">
                                        <div className="w-16 h-16 bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-2xl text-blue-600 font-bold border border-blue-100 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            {worker.name[0]}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-xl font-black text-slate-800">{worker.name}</h4>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${worker.status === 'Available' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                                    {worker.status}
                                                </span>
                                            </div>
                                            <p className="text-slate-500 font-bold text-sm">
                                                🛠️ {worker.skill} • 📍 {worker.location}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 w-full md:w-auto">
                                        <a href={`tel:${worker.phone}`} className="flex-1 md:flex-none px-6 py-3 bg-green-500 text-white rounded-xl font-black shadow-lg shadow-green-100 hover:scale-105 transition-all text-center">
                                            📞 Call
                                        </a>
                                        <a href={`https://wa.me/91${worker.phone}`} target="_blank" rel="noreferrer" className="flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white rounded-xl font-black hover:bg-blue-600 transition-all text-center">
                                            💬 WhatsApp
                                        </a>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-16 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                                    <p className="text-slate-400 font-bold">Maaf kijiye, is area mein koi worker nahi mila! 🔍</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default EmployerDash;