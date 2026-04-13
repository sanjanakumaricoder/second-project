const express = require('express');
const router = express.Router();
// Path check karein: controller file ka naam 'authController.js' hi hona chahiye
const authController = require('../controllers/authController');

// Debugging: Isse humein pata chalega ki functions load huye ya nahi
console.log("Functions loaded:", authController);

// Agar upar wala require kaam kar raha hai, toh hum aise assign karenge:
const register = authController.register;
const login = authController.login;

if (typeof register !== 'function' || typeof login !== 'function') {
    console.log("❌ ERROR: register ya login function nahi mil rahe!");
}

router.post('/register', register);
router.post('/login', login);

module.exports = router;