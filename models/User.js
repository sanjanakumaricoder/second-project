const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Worker', 'Employer'], required: true },
    skill: { type: String }, // Only for workers
    location: { type: String, required: true },
    rating: { type: Number, default: 5 }
});

module.exports = mongoose.model('User', UserSchema);