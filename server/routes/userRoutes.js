const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// उपयोगकर्ता रजिस्टर करें
router.post('/', registerUser);

// उपयोगकर्ता लॉगिन करें
router.post('/login', loginUser);

// उपयोगकर्ता प्रोफाइल प्राप्त करें (प्रोटेक्टेड राउट)
router.get('/profile', protect, getUserProfile);

module.exports = router; 