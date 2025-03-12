const express = require('express');
const { 
  getPasswords, 
  createPassword, 
  updatePassword, 
  deletePassword 
} = require('../controllers/passwordController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// सभी राउट्स को प्रोटेक्ट करें - ऑथेंटिकेशन की आवश्यकता है
router.use(protect);

// सभी पासवर्ड प्राप्त करें और नया पासवर्ड बनाएं
router.route('/')
  .get(getPasswords)
  .post(createPassword);

// पासवर्ड अपडेट और हटाएं
router.route('/:id')
  .put(updatePassword)
  .delete(deletePassword);

module.exports = router; 