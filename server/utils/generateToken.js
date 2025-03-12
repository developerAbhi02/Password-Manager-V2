const jwt = require('jsonwebtoken');

/**
 * उपयोगकर्ता के लिए JWT टोकन जनरेट करें
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d' // 30 दिनों के लिए मान्य
  });
};

module.exports = generateToken; 