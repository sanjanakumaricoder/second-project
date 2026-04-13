import React, { useState, useEffect } from 'react';
import './../index.css';

const WorkerDash = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [isContactModal, setIsContactModal] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    // Profile Edit State
    const [editMode, setEditMode] = useState(false);
    const [tempData, setTempData] = useState({ ...user });

    const dummyJobs = [
        { id: 1, title: "Garden Maintenance", owner: "Vijay Rathore", budget: "₹600", location: "Vijay Nagar, Indore", skill: "Gardener", phone: "9826012345", desc: "Bade garden ki cutting aur pani dena hai." },
        { id: 2, title: "House Shifting Helper", owner: "Priya Sharma", budget: "₹450", location: "Bhawarkua, Indore", skill: "Helper", phone: "9977054321", desc: "Saaman uthane mein madad chahiye." },
        { id: 3, title: "Deep Kitchen Cleaning", owner: "Hotel Sayaji", budget: "₹1200", location: "Magar Kheda, Indore", skill: "Cleaning", phone: "7312400000", desc: "Kitchen deep cleaning." },
        { id: 4, title: "Nursery Caretaker", owner: "Green Indore", budget: "₹500", location: "Rau, Indore", skill: "Gardener", phone: "9425098765", desc: "Naye paudhe lagane hain." }
    ];

    const filteredJobs = dummyJobs.filter(job => {
        const matchesSearch = job.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || job.skill === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const handleSaveProfile = () => {
        localStorage.setItem('user', JSON.stringify(tempData));
        setUser(tempData);
        setEditMode(false);
        alert("Profile Update Ho Gayi! ✨");
    };

    return (
        <div className="min-h-screen bg-[#f1f5f9] flex flex-col md:flex-row">
            
            {/* ========== LEFT SIDEBAR (Profile Section) ========== */}
            <aside className="w-full md:w-80 bg-white shadow-2xl p-8 md:h-screen sticky top-0 z-20 overflow-y-auto">
                <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl mx-auto flex items-center justify-center text-white text-4xl font-black shadow-xl mb-4">
                        {user.name?.[0]}
                    </div>
                    
                    {!editMode ? (
                        <>
                            <h2 className="text-2xl font-black text-slate-800">{user.name}</h2>
                            <p className="text-blue-600 font-bold mb-6 italic">{user.skill} in {user.location}</p>
                            <button 
                                onClick={() => setEditMode(true)}
                                className="w-full py-3 border-2 border-slate-100 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all mb-4"
                            >
                                ✏️ Edit Profile
                            </button>
                        </>
                    ) : (
                        <div className="space-y-4 text-left animate-slideUp">
                            <div>
                                <label className="auth-label">Naam</label>
                                <input type="text" className="auth-input p-3" value={tempData.name} onChange={(e)=>setTempData({...tempData, name: e.target.value})} />
                            </div>
                            <div>
                                <label className="auth-label">Location</label>
                                <input type="text" className="auth-input p-3" value={tempData.location} onChange={(e)=>setTempData({...tempData, location: e.target.value})} />
                            </div>
                            <div>
                                <label className="auth-label">Skill</label>
                                <select className="auth-input p-3" value={tempData.skill} onChange={(e)=>setTempData({...tempData, skill: e.target.value})}>
                                    <option value="Gardener">Gardener</option>
                                    <option value="Helper">Helper</option>
                                    <option value="Cleaning">Cleaning</option>
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={handleSaveProfile} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm">Save</button>
                                <button onClick={() => setEditMode(false)} className="flex-1 py-3 bg-slate-100 text-slate-500 rounded-xl font-bold text-sm">Cancel</button>
                            </div>
                        </div>
                    )}
                </div>

                <hr className="my-8 border-slate-100" />
                
                <div className="space-y-4">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Dashboard Menu</p>
                    <button className="w-full text-left p-3 rounded-xl bg-blue-50 text-blue-600 font-bold">🏠 All Jobs</button>
                    <button className="w-full text-left p-3 rounded-xl text-slate-500 font-bold hover:bg-slate-50">📑 My Applied</button>
                    <button onClick={() => {localStorage.clear(); window.location.href='/login'}} className="w-full text-left p-3 rounded-xl text-red-400 font-bold hover:bg-red-50">🚪 Logout</button>
                </div>
            </aside>

            {/* ========== RIGHT CONTENT (Jobs Feed) ========== */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    
                    {/* Search & Filters */}
                    <div className="mb-10">
                        <div className="relative mb-6">
                            <input 
                                type="text" 
                                placeholder="Indore ke kis area mein kaam chahiye? (e.g. Rau)" 
                                className="w-full p-5 pl-14 rounded-3xl border-none shadow-xl focus:ring-4 ring-blue-500/10 transition-all font-medium"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <span className="absolute left-6 top-5 text-xl">🔍</span>
                        </div>

                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                            {['All', 'Gardener', 'Helper', 'Cleaning'].map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-300'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Job Cards List */}
                    <div className="space-y-6">
                        {filteredJobs.length > 0 ? filteredJobs.map(job => (
                            <div key={job.id} className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 group">
                                <div className="flex gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">
                                        {job.skill === 'Gardener' ? '🌿' : job.skill === 'Cleaning' ? '🧹' : '🤝'}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                                        <p className="text-slate-500 font-medium">📍 {job.location} • <span className="text-green-600 font-bold">{job.budget}</span></p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsContactModal(job)}
                                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all whitespace-nowrap"
                                >
                                    Talk to Owner
                                </button>
                            </div>
                        )) : (
                            <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 text-slate-400 font-bold">
                                Maaf kijiye, is category mein koi kaam nahi mila! 🔍
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Contact Modal (Same as before) */}
            {isContactModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 text-center shadow-2xl animate-slideUp">
                        <h3 className="text-2xl font-black mb-4">{isContactModal.owner}</h3>
                        <p className="text-slate-500 mb-6 font-medium">{isContactModal.desc}</p>
                        <div className="flex flex-col gap-3">
                            <a href={`tel:${isContactModal.phone}`} className="w-full py-4 bg-green-500 text-white rounded-2xl font-black">📞 Call Now</a>
                            <a href={`https://wa.me/91${isContactModal.phone}`} target="_blank" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black">💬 WhatsApp</a>
                            <button onClick={() => setIsContactModal(null)} className="mt-2 text-slate-400 font-bold">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkerDash;