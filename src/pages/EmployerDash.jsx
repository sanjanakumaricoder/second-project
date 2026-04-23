

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../index.css';

const EmployerDash = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [myJobs, setMyJobs] = useState([]);
    const [workers, setWorkers] = useState([]); // Workers search ke liye
    const [searchQuery, setSearchQuery] = useState('');
    const [showPostModal, setShowPostModal] = useState(false);
    const [activeTab, setActiveTab] = useState('my-jobs'); // 'my-jobs' ya 'search-workers'
    
    const [newJob, setNewJob] = useState({ 
        title: '', 
        category: 'Helper', 
        budget: '', 
        locationName: '',
        description: '' 
    });

    // 1. Data Fetching (Jobs aur Workers)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                // Apni posts mangwana
                const jobsRes = await axios.get('http://localhost:5000/api/jobs/my-jobs', {
                    headers: { 'x-auth-token': token }
                });
                setMyJobs(jobsRes.data);

                // Saare Workers mangwana (Search ke liye)
                const workersRes = await axios.get('http://localhost:5000/api/auth/workers', {
                    headers: { 'x-auth-token': token }
                });
                setWorkers(workersRes.data);
            } catch (err) {
                console.error("Data load fail!");
            }
        };
        fetchData();
    }, []);

    // 2. Job Post Function
    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/jobs/create', newJob, {
                headers: { 'x-auth-token': token }
            });
            setShowPostModal(false);
            window.location.reload(); 
        } catch (err) { alert("Post fail ho gaya!"); }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row">
            {/* --- SIDEBAR --- */}
            <aside className="w-full md:w-80 bg-white shadow-2xl p-8 border-r border-slate-100 sticky top-0 h-screen flex flex-col">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-orange-600 rounded-[2rem] mx-auto flex items-center justify-center text-white text-4xl font-black mb-4 shadow-xl">
                        {user.name?.[0]}
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tighter">{user.name}</h2>
                    <p className="text-orange-600 font-bold text-[10px] uppercase tracking-widest mt-1">Employer / Owner</p>
                </div>

                <nav className="space-y-3">
                    <button 
                        onClick={() => setActiveTab('my-jobs')}
                        className={`w-full p-4 rounded-2xl font-bold text-left transition-all ${activeTab === 'my-jobs' ? 'bg-orange-600 text-white shadow-lg shadow-orange-100' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        📋 My Job Posts
                    </button>
                    <button 
                        onClick={() => setActiveTab('search-workers')}
                        className={`w-full p-4 rounded-2xl font-bold text-left transition-all ${activeTab === 'search-workers' ? 'bg-orange-600 text-white shadow-lg shadow-orange-100' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        🔍 Search Workers
                    </button>
                </nav>

                <button onClick={() => setShowPostModal(true)} className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:scale-105 transition-all">
                    ➕ Post New Job
                </button>
                
                <button onClick={() => {localStorage.clear(); window.location.href='/login'}} className="mt-auto py-3 text-red-400 font-bold hover:bg-red-50 rounded-xl">Logout</button>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    
                    {/* SEARCH BOX (Dynamic for both Workers and Jobs) */}
                    <div className="relative mb-10">
                        <input 
                            type="text" 
                            placeholder={activeTab === 'my-jobs' ? "Search in your jobs..." : "Search worker by skill (e.g. Plumber, Driver)..."} 
                            className="w-full p-6 rounded-[2rem] border-none shadow-xl focus:ring-2 ring-orange-500 font-bold"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* TAB 1: MY JOBS & APPLICANTS */}
                    {activeTab === 'my-jobs' && (
                        <div className="space-y-8">
                            <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tighter">Your Active Listings</h3>
                            {myJobs.filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase())).map(job => (
                                <div key={job._id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
                                    <div className="flex justify-between items-center mb-6 border-b pb-4 border-slate-50">
                                        <div>
                                            <h4 className="text-xl font-black text-slate-800">{job.title}</h4>
                                            <p className="text-slate-400 text-sm font-bold">📍 {job.locationName} • <span className="text-green-600">{job.budget}</span></p>
                                        </div>
                                        <div className="bg-orange-50 px-4 py-1 rounded-full text-orange-600 text-xs font-black uppercase">Active</div>
                                    </div>

                                    {/* Select & Connect with Applicants */}
                                    <div className="bg-slate-50 p-5 rounded-3xl">
                                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 italic">Applicants for this job:</p>
                                        {job.applicants?.length > 0 ? job.applicants.map(app => (
                                            <div key={app.worker?._id} className="flex justify-between items-center bg-white p-4 rounded-2xl mb-3 shadow-sm hover:border-blue-200 border border-transparent transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-black">{app.worker?.name?.[0]}</div>
                                                    <div>
                                                        <p className="font-black text-slate-700">{app.worker?.name}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{app.worker?.skill}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <a href={`tel:${app.worker?.phone}`} className="px-4 py-2 bg-green-500 text-white rounded-xl text-xs font-black shadow-lg hover:bg-green-600 transition-all">Call 📞</a>
                                                    <a href={`https://wa.me/91${app.worker?.phone}`} target="_blank" rel="noreferrer" className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-blue-600 transition-all">WhatsApp</a>
                                                </div>
                                            </div>
                                        )) : <p className="text-xs text-slate-400 italic text-center py-2">No applicants yet. Wait for workers to show interest.</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* TAB 2: SEARCH WORKERS DIRECTLY */}
                    {activeTab === 'search-workers' && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tighter">Available Workers in Indore</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {workers.filter(w => w.skill.toLowerCase().includes(searchQuery.toLowerCase())).map(worker => (
                                    <div key={worker._id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
                                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black mb-3">
                                            {worker.name[0]}
                                        </div>
                                        <h4 className="text-lg font-black text-slate-800">{worker.name}</h4>
                                        <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">{worker.skill}</p>
                                        <div className="flex gap-2 w-full mt-auto">
                                            <a href={`tel:${worker.phone}`} className="flex-1 py-3 bg-green-500 text-white rounded-xl text-xs font-black">Call</a>
                                            <a href={`https://wa.me/91${worker.phone}`} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl text-xs font-black">Chat</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </main>

            {/* --- POST JOB MODAL --- */}
            {showPostModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative">
                        <h2 className="text-2xl font-black text-slate-800 mb-8 text-center">Naya Kaam Post Karein</h2>
                        <form className="space-y-4" onSubmit={handlePost}>
                            <input type="text" placeholder="Kaam ka Title (e.g. Paint Job)" className="auth-input p-4 w-full" onChange={e => setNewJob({...newJob, title: e.target.value})} required />
                            <input type="text" placeholder="Budget (Dihadi ₹)" className="auth-input p-4 w-full" onChange={e => setNewJob({...newJob, budget: e.target.value})} required />
                            <input type="text" placeholder="Area (e.g. Vijay Nagar, Rau)" className="auth-input p-4 w-full" onChange={e => setNewJob({...newJob, locationName: e.target.value})} required />
                            <textarea placeholder="Kaam ki thodi detail likhein..." className="auth-input p-4 w-full h-24 resize-none" onChange={e => setNewJob({...newJob, description: e.target.value})}></textarea>
                            <button type="submit" className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black shadow-xl shadow-orange-100 mt-4 transition-all hover:bg-orange-700">Live Post Karein 🚀</button>
                            <button type="button" onClick={() => setShowPostModal(false)} className="w-full text-slate-300 font-bold text-sm mt-4">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployerDash;





















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './../index.css';

// const EmployerDash = () => {
//     const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
//     const [editMode, setEditMode] = useState(false);
//     const [tempData, setTempData] = useState({ ...user });
//     const [workerSearch, setWorkerSearch] = useState(user.location || "");

//     // --- YE APKE JOBS HAIN (BACKEND SE AIYE HUE) ---
//     // Note: applicants array ab populated hona chahiye worker details ke saath
//     const [myJobs, setMyJobs] = useState([
//         { 
//             id: 1, title: "Garden Cleaning", category: "Gardener", budget: "₹500", 
//             applicants: [
//                 { worker: { _id: "w1", name: "Kailash Gehlot", phone: "9826011111" }, appliedAt: new Date() }
//             ] 
//         }
//     ]);

//     const [allWorkers] = useState([
//         { id: 1, name: "Kailash Gehlot", skill: "Gardener", location: "Vijay Nagar", phone: "9826011111", status: "Available", rating: 4.8, totalJobs: 12 },
//         { id: 2, name: "Rahul Verma", skill: "Helper", location: "Bhawarkua", phone: "9977022222", status: "Working", rating: 4.2, totalJobs: 5 }
//     ]);

//     const handleSaveProfile = () => {
//         localStorage.setItem('user', JSON.stringify(tempData));
//         setUser(tempData);
//         setEditMode(false);
//         alert("Profile Update Ho Gayi! ✨");
//     };

//     const nearestWorkers = allWorkers.filter(worker => 
//         worker.location.toLowerCase().includes(workerSearch.toLowerCase())
//     );

//     return (
//         <div className="min-h-screen bg-[#f1f5f9] flex flex-col md:flex-row">
//             <aside className="w-full md:w-80 bg-white shadow-2xl p-8 md:h-screen sticky top-0 z-20 overflow-y-auto border-r border-slate-100">
//                 <div className="text-center mb-8">
//                     <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl mx-auto flex items-center justify-center text-white text-4xl font-black shadow-xl mb-4">{user.name?.[0]}</div>
//                     {!editMode ? (
//                         <div className="animate-fadeIn">
//                             <h2 className="text-2xl font-black text-slate-800">{user.name}</h2>
//                             <p className="text-orange-600 font-bold text-sm mb-6 italic">👑 Owner @ {user.location}</p>
//                             <button onClick={() => setEditMode(true)} className="w-full py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-600">✏️ Edit Profile</button>
//                         </div>
//                     ) : (
//                         <div className="space-y-4 text-left animate-slideUp bg-slate-50 p-4 rounded-2xl">
//                             <input type="text" className="auth-input p-2 text-sm" value={tempData.name} onChange={(e)=>setTempData({...tempData, name: e.target.value})} />
//                             <input type="text" className="auth-input p-2 text-sm" value={tempData.location} onChange={(e)=>setTempData({...tempData, location: e.target.value})} />
//                             <div className="flex gap-2">
//                                 <button onClick={handleSaveProfile} className="flex-1 py-2 bg-orange-600 text-white rounded-lg font-bold text-xs">Save</button>
//                                 <button onClick={() => setEditMode(false)} className="flex-1 py-2 bg-slate-200 text-slate-600 rounded-lg font-bold text-xs">X</button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 <button onClick={() => {localStorage.clear(); window.location.href='/login'}} className="w-full py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl">🚪 Logout</button>
//             </aside>

//             <main className="flex-1 p-6 md:p-12 overflow-y-auto">
//                 <div className="max-w-5xl mx-auto">
//                     {/* --- OWNER'S POSTED JOBS WITH APPLICANTS LIST --- */}
//                     <section className="mb-12">
//                         <h3 className="text-2xl font-black text-slate-800 mb-6">Active Jobs & Applicants</h3>
//                         {myJobs.map(job => (
//                             <div key={job.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 mb-6">
//                                 <div className="flex justify-between items-start mb-4">
//                                     <h4 className="text-xl font-black">{job.title}</h4>
//                                     <span className="text-green-600 font-bold">{job.budget}</span>
//                                 </div>

//                                 {/* APPLICANTS SUB-SECTION (ASLI REAL-LIFE CONNECTION) */}
//                                 <div className="mt-4 p-4 bg-slate-50 rounded-2xl">
//                                     <h5 className="font-black text-xs text-blue-600 mb-3 uppercase">Workers Who Applied:</h5>
//                                     {job.applicants && job.applicants.length > 0 ? job.applicants.map(app => (
//                                         <div key={app.worker._id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm mb-2">
//                                             <div>
//                                                 <p className="font-bold text-slate-800">{app.worker.name}</p>
//                                                 <p className="text-[10px] text-slate-400 font-bold">Interested • {new Date(app.appliedAt).toLocaleDateString()}</p>
//                                             </div>
//                                             <a href={`tel:${app.worker.phone}`} className="px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-black shadow-lg shadow-green-100">Call Now 📞</a>
//                                         </div>
//                                     )) : <p className="text-xs text-slate-400 italic">Abhi kisi ne apply nahi kiya...</p>}
//                                 </div>
//                             </div>
//                         ))}
//                     </section>

//                     {/* --- WORKER DISCOVERY --- */}
//                     <section>
//                         <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//                             <h3 className="text-2xl font-black text-slate-800">Find Workers</h3>
//                             <input type="text" className="p-3 rounded-xl border-none shadow-md text-sm" placeholder="Area badlein..." value={workerSearch} onChange={(e) => setWorkerSearch(e.target.value)} />
//                         </div>
//                         <div className="grid grid-cols-1 gap-4">
//                             {nearestWorkers.map(worker => (
//                                 <div key={worker.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
//                                     {worker.rating >= 4.5 && <div className="absolute top-0 right-0 bg-yellow-400 text-[10px] font-black px-4 py-1 rounded-bl-2xl">TOP RATED 🏆</div>}
//                                     <div className="flex items-center gap-4">
//                                         <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-black">{worker.name[0]}</div>
//                                         <div>
//                                             <h4 className="text-lg font-black">{worker.name}</h4>
//                                             <p className="text-xs text-slate-500">⭐ {worker.rating} • ({worker.totalJobs} Jobs Done)</p>
//                                         </div>
//                                     </div>
//                                     <a href={`tel:${worker.phone}`} className="px-6 py-3 bg-green-500 text-white rounded-xl font-black text-sm">Call Now 📞</a>
//                                 </div>
//                             ))}
//                         </div>
//                     </section>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default EmployerDash;























