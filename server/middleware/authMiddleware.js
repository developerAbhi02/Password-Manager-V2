const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * ऑथेंटिकेशन मिडलवेयर
 * टोकन के आधार पर उपयोगकर्ता की प्रमाणिकता की जांच करें
 */
const protect = async (req, res, next) => {
  let token;

  // हेडर से टोकन प्राप्त करें
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // टोकन प्राप्त करें, "Bearer" प्रिफिक्स हटाकर
      token = req.headers.authorization.split(' ')[1];

      // टोकन वेरिफाई करें
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // डीकोडेड टोकन से उपयोगकर्ता आईडी प्राप्त करें और उपयोगकर्ता जानकारी प्राप्त करें
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'प्रमाणीकरण असफल, अवैध टोकन' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'प्रमाणीकरण असफल, कोई टोकन नहीं मिला' });
  }
};

module.exports = { protect }; 