const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    budget: { type: String, required: true },
    category: { type: String, required: true }, // e.g., Gardener, Helper
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);