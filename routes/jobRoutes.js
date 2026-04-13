const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// 1. Nayi Job Post karna (Employer ke liye)
router.post('/post', async (req, res) => {
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        res.status(201).json({ message: "Job Posted Successfully!", job: newJob });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. Jobs list dikhana (Worker ke liye)
router.get('/all', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;