const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Worker', 'Employer'], required: true },
    skill: { type: String }, // Only for workers
    location: { type: String, required: true },
    // UserSchema mein ye fields add karein
rating: { type: Number, default: 0 },
totalJobsCompleted: { type: Number, default: 0 },
reviews: [{
    ownerName: String,
    comment: String,
    stars: Number,
    date: { type: Date, default: Date.now }
}]
});

module.exports = mongoose.model('User', UserSchema);