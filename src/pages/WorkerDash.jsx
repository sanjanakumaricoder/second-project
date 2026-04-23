import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../index.css';

const WorkerDash = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [jobs, setJobs] = useState([]); // Employer ki jobs
    const [isContactModal, setIsContactModal] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showServiceModal, setShowServiceModal] = useState(false);
    
    // Worker apni service post karne ke liye state
    const [myService, setMyService] = useState({ 
        title: '', 
        budget: '', 
        locationName: user.location || '',
        description: '' 
    });

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/jobs');
                setJobs(res.data);
            } catch (err) { console.error("Jobs load fail!"); }
        };
        fetchJobs();
    }, []);

    // 1. Employer ki job ke liye Apply karna
    const handleApply = async (jobId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`http://localhost:5000/api/jobs/apply/${jobId}`, {}, {
                headers: { 'x-auth-token': token }
            });
            alert(res.data.message);
        } catch (err) { alert(err.response?.data?.message || "Apply fail!"); }
    };

    // 2. Worker apni service/profile post karega (Naya Feature)
    const handlePostService = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            // Worker jab post karega toh role backend handle karega
            await axios.post('http://localhost:5000/api/jobs/create-service', myService, {
                headers: { 'x-auth-token': token }
            });
            alert("Aapki Service post ho gayi! Ab Employers aapko dekh sakte hain. 🚀");
            setShowServiceModal(false);
        } catch (err) { alert("Service post fail!"); }
    };

    return (
        <div className="min-h-screen bg-[#f1f5f9] flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-80 bg-white shadow-2xl p-8 md:h-screen sticky top-0 flex flex-col z-20">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white text-3xl font-black mb-4 shadow-xl shadow-blue-100">{user.name?.[0]}</div>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">{user.name}</h2>
                    <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest mt-1 italic">{user.skill} | {user.location}</p>
                </div>
                
                <button 
                    onClick={() => setShowServiceModal(true)} 
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:scale-105 transition-all mb-4"
                >
                    📢 Post My Service
                </button>

                <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase ml-2">Quick Links</p>
                    <button className="w-full p-4 bg-blue-50 text-blue-600 rounded-2xl font-bold text-left">🏠 Nearby Jobs</button>
                    <button className="w-full p-4 text-slate-500 rounded-2xl font-bold text-left hover:bg-slate-50">⭐ My Ratings</button>
                </div>

                <button onClick={() => {localStorage.clear(); window.location.href='/login'}} className="mt-auto py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all">Logout 🚪</button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    {/* Search Employer Jobs */}
                    <div className="relative mb-10">
                        <input 
                            type="text" 
                            placeholder="Indore mein kaam search karein (e.g. Paint, Cleaning)..." 
                            className="w-full p-6 rounded-[2.5rem] border-none shadow-xl focus:ring-4 ring-blue-500/20 font-bold text-slate-700 outline-none" 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                        <span className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                    </div>

                    <h3 className="text-2xl font-black text-slate-800 mb-8 tracking-tighter italic">
                        <span className="text-blue-600">|</span> Available Jobs for You
                    </h3>

                    <div className="space-y-6">
                        {jobs.filter(j => j.title?.toLowerCase().includes(searchQuery.toLowerCase()) || j.locationName?.toLowerCase().includes(searchQuery.toLowerCase())).map(job => (
                            <div key={job._id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-2xl transition-all group">
                                <div className="flex-1">
                                    <h4 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                                    <div className="flex gap-4 mt-1">
                                        <p className="text-slate-500 font-bold text-sm">📍 {job.locationName}</p>
                                        <p className="text-green-600 font-black text-sm">💰 {job.budget}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <button 
                                        onClick={() => handleApply(job._id)} 
                                        className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-[1.5rem] font-black shadow-lg shadow-blue-100 active:scale-95 transition-all"
                                    >
                                        Interested ✋
                                    </button>
                                    <button 
                                        onClick={() => setIsContactModal(job)} 
                                        className="flex-1 px-6 py-4 bg-slate-100 text-slate-700 rounded-[1.5rem] font-black hover:bg-slate-200"
                                    >
                                        Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Modal: Details & Communicate */}
            {isContactModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 text-center shadow-2xl">
                        <div className="w-20 h-20 bg-blue-50 rounded-full mx-auto flex items-center justify-center text-3xl mb-4">👤</div>
                        <h3 className="text-2xl font-black text-slate-800 mb-2">{isContactModal.employer?.name}</h3>
                        <p className="text-slate-500 mb-8 font-medium italic">"Owner se baat karke kaam fix karein."</p>
                        
                        <div className="flex flex-col gap-3">
                            <a 
                                href={`tel:${isContactModal.employer?.phone}`} 
                                className="w-full py-4 bg-green-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-green-100 flex items-center justify-center gap-2"
                            >
                                📞 Call Owner
                            </a>
                            <a 
                                href={`https://wa.me/91${isContactModal.employer?.phone}?text=Namaste, main ${user.name} hoon, maine KaamConnect par aapka '${isContactModal.title}' wala post dekha.`} 
                                target="_blank" rel="noreferrer"
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl"
                            >
                                WhatsApp Chat
                            </a>
                            <button onClick={() => setIsContactModal(null)} className="mt-4 text-slate-400 font-bold uppercase text-xs">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Post My Service */}
            {showServiceModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl">
                        <h2 className="text-2xl font-black text-slate-800 mb-8 text-center tracking-tighter">Apni Service Post Karein</h2>
                        <form className="space-y-4" onSubmit={handlePostService}>
                            <input type="text" placeholder="Service Name (e.g. Professional Painter)" className="auth-input p-4 w-full" onChange={e => setMyService({...myService, title: e.target.value})} required />
                            <input type="text" placeholder="Aapki Fees / Rate (₹)" className="auth-input p-4 w-full" onChange={e => setMyService({...myService, budget: e.target.value})} required />
                            <input type="text" placeholder="Location" className="auth-input p-4 w-full" value={myService.locationName} onChange={e => setMyService({...myService, locationName: e.target.value})} required />
                            <textarea placeholder="Apne baare mein thoda batayein..." className="auth-input p-4 w-full h-24 resize-none" onChange={e => setMyService({...myService, description: e.target.value})}></textarea>
                            <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-100 mt-4 hover:bg-blue-700 transition-all">Live Post My Service 🚀</button>
                            <button type="button" onClick={() => setShowServiceModal(false)} className="w-full text-slate-300 font-bold text-sm mt-4">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkerDash;

















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './../index.css';

// const WorkerDash = () => {
//     const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
//     const [jobs, setJobs] = useState([]);
//     const [isContactModal, setIsContactModal] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');

//     // Database se jobs khichna
//     useEffect(() => {
//         const fetchJobs = async () => {
//             try {
//                 const res = await axios.get('http://localhost:5000/api/jobs');
//                 setJobs(res.data);
//             } catch (err) {
//                 console.error("Backend se jobs nahi aa rahi!");
//             }
//         };
//         fetchJobs();
//     }, []);

//     // Apply Logic
//     const handleApply = async (jobId) => {
//         try {
//             const token = localStorage.getItem('token');
//             const res = await axios.post(`http://localhost:5000/api/jobs/apply/${jobId}`, {}, {
//                 headers: { 'x-auth-token': token }
//             });
//             alert(res.data.message);
//         } catch (err) {
//             alert(err.response?.data?.message || "Apply fail ho gaya");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-[#f1f5f9] flex flex-col md:flex-row">
//             <aside className="w-full md:w-80 bg-white shadow-2xl p-8 md:h-screen sticky top-0 flex flex-col">
//                 <div className="text-center">
//                     <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white text-3xl font-black mb-4 shadow-lg">{user.name?.[0]}</div>
//                     <h2 className="text-xl font-black text-slate-800">{user.name}</h2>
//                     <p className="text-blue-600 font-bold text-xs uppercase tracking-widest">{user.skill} | {user.location}</p>
//                 </div>
//                 <button onClick={() => {localStorage.clear(); window.location.href='/login'}} className="mt-auto py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl">Logout 🚪</button>
//             </aside>

//             <main className="flex-1 p-6 md:p-12 overflow-y-auto">
//                 <div className="max-w-4xl mx-auto">
//                     <input type="text" placeholder="Search area (e.g. Vijay Nagar)..." className="w-full p-5 rounded-3xl border-none shadow-xl mb-10 focus:ring-2 ring-blue-500 font-bold" onChange={(e) => setSearchQuery(e.target.value)} />
//                     <div className="space-y-6">
//                         {jobs.filter(j => j.locationName?.toLowerCase().includes(searchQuery.toLowerCase())).map(job => (
//                             <div key={job._id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-xl transition-all">
//                                 <div>
//                                     <h4 className="text-xl font-black text-slate-800">{job.title}</h4>
//                                     <p className="text-slate-500 font-bold">📍 {job.locationName} • <span className="text-green-600">{job.budget}</span></p>
//                                 </div>
//                                 <div className="flex gap-2 w-full md:w-auto">
//                                     <button onClick={() => handleApply(job._id)} className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-100">Interested ✋</button>
//                                     <button onClick={() => setIsContactModal(job)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-black">Details</button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </main>

//             {/* CALL MODAL FIX: Isme Dialer Redirect hai */}
//             {isContactModal && (
//                 <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
//                     <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 text-center shadow-2xl">
//                         <h3 className="text-2xl font-black text-slate-800 mb-4">{isContactModal.employer?.name}</h3>
//                         <p className="text-slate-500 mb-6 font-medium italic">"{isContactModal.title} ke liye Owner ko call karein."</p>
//                         <div className="flex flex-col gap-3">
//                             {/* Real Redirect Logic */}
//                             <a href={`tel:${isContactModal.employer?.phone}`} className="w-full py-4 bg-green-500 text-white rounded-2xl font-black shadow-lg text-center">📞 Call Owner Now</a>
//                             <button onClick={() => setIsContactModal(null)} className="mt-2 text-slate-400 font-bold uppercase text-xs">Close</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default WorkerDash;













