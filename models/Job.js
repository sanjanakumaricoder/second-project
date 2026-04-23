const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    budget: { type: String, required: true },
    description: { type: String },
    locationName: { type: String, required: true }, // e.g., "Vijay Nagar"
    
    // Asli Geo-Location logic
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], index: '2dsphere' } // [Longitude, Latitude]
    },
    
    // LinkedIn jaisa Applicant System
    applicants: [{
        worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        appliedAt: { type: Date, default: Date.now }
    }],
    
    status: { type: String, default: 'Open' } // Open, Closed, In-Progress
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);