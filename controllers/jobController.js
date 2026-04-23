const Job = require('../models/Job');

// 1. Create Job (Owner ke liye)
exports.createJob = async (req, res) => {
    try {
        const { title, category, budget, locationName, lng, lat } = req.body;
        const job = new Job({
            employer: req.user.id,
            title, category, budget, locationName,
            location: { coordinates: [lng, lat] }
        });
        await job.save();
        res.status(201).json({ message: "Job Post Ho Gayi! 🚀", job });
    } catch (err) {
        res.status(500).json({ message: "Server Error: Post nahi ho payi" });
    }
};

// 2. Find Nearby Jobs (Worker ke liye - LinkedIn Feed)
exports.getNearbyJobs = async (req, res) => {
    try {
        const { lng, lat, maxDistance = 5000 } = req.query; // Default 5km radius
        const jobs = await Job.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    $maxDistance: parseInt(maxDistance)
                }
            },
            status: 'Open'
        }).populate('employer', 'name phone');
        
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: "Location search fail ho gaya" });
    }
};

// 3. One-Tap Apply (LinkedIn-style interaction)
exports.applyToJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job nahi mili" });

        // Check if already applied
        const alreadyApplied = job.applicants.find(a => a.worker.toString() === req.user.id);
        if (alreadyApplied) return res.status(400).json({ message: "Aapne pehle hi apply kiya hai" });

        job.applicants.push({ worker: req.user.id });
        await job.save();
        res.json({ message: "Aapka naam Owner ko bhej diya gaya hai! ✅" });
    } catch (err) {
        res.status(500).json({ message: "Apply nahi ho paya" });
    }
};