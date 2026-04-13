const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, phone, password, role, skill, location } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ phone });
        if (existingUser) return res.status(400).json({ message: "Mobile number pehle se register hai" });

        // Hash password only ONCE here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            phone,
            password: hashedPassword, // Hashed password save ho raha hai
            role,
            skill,
            location
        });

        await newUser.save();
        res.status(201).json({ message: "Registration Successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        console.log("Login Attempt Phone:", phone);

        // 1. Find User
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ message: "User nahi mila! Pehle register karein." });
        }

        // 2. Compare Password
        // bcrypt.compare(Plain_Password, Hashed_Password_from_DB)
        const isMatch = await bcrypt.compare(password, user.password);
        
        console.log("Password entered:", password);
        console.log("Is Match?:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Ghalat Password! Fir se koshish karein." });
        }

        // 3. Generate Token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            token,
            user: { id: user._id, name: user.name, role: user.role }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};













// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Sabse upar check karein ki 'exports' ki spelling sahi hai (s ke saath)
// exports.register = async (req, res) => {
//     try {
//         console.log("Registering user..."); // Debugging ke liye
//         const { name, phone, password, role, skill, location } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         await User.create({ name, phone, password: hashedPassword, role, skill, location });
//         res.status(201).json({ message: "Success" });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// exports.login = async (req, res) => {
//     try {
//         console.log("Logging in..."); // Debugging ke liye
//         const { phone, password } = req.body;
//         const user = await User.findOne({ phone });
//         if (user && (await bcrypt.compare(password, user.password))) {
//             const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//             res.json({ token, user });
//         } else {
//             res.status(401).json({ error: "Fail" });
//         }
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };