const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

/**
 * @desc    उपयोगकर्ता रजिस्टर करें
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // चेक करें कि उपयोगकर्ता पहले से मौजूद है या नहीं
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'इस ईमेल से उपयोगकर्ता पहले से ही पंजीकृत है' });
    }

    // नया उपयोगकर्ता बनाएं
    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'अमान्य उपयोगकर्ता डेटा' });
    }
  } catch (error) {
    console.error('रजिस्ट्रेशन त्रुटि:', error);
    res.status(500).json({ message: 'सर्वर त्रुटि' });
  }
};

/**
 * @desc    उपयोगकर्ता लॉगिन करें और टोकन प्राप्त करें
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ईमेल से उपयोगकर्ता खोजें
    const user = await User.findOne({ email });

    // चेक करें कि उपयोगकर्ता मौजूद है और पासवर्ड सही है
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'अमान्य ईमेल या पासवर्ड' });
    }
  } catch (error) {
    console.error('लॉगिन त्रुटि:', error);
    res.status(500).json({ message: 'सर्वर त्रुटि' });
  }
};

/**
 * @desc    उपयोगकर्ता प्रोफाइल प्राप्त करें
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email
      });
    } else {
      res.status(404).json({ message: 'उपयोगकर्ता नहीं मिला' });
    }
  } catch (error) {
    console.error('प्रोफाइल प्राप्त करने में त्रुटि:', error);
    res.status(500).json({ message: 'सर्वर त्रुटि' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
}; 