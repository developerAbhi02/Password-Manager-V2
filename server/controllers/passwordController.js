const Password = require('../models/passwordModel');

/**
 * @desc    उपयोगकर्ता के सभी पासवर्ड प्राप्त करें
 * @route   GET /api/passwords
 * @access  Private
 */
const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user._id });
    res.json(passwords);
  } catch (error) {
    console.error('पासवर्ड प्राप्त करने में त्रुटि:', error);
    res.status(500).json({ message: 'सर्वर त्रुटि' });
  }
};

/**
 * @desc    नया पासवर्ड बनाएं
 * @route   POST /api/passwords
 * @access  Private
 */
const createPassword = async (req, res) => {
  try {
    const { title, username, password, url, notes, category } = req.body;
    
    const newPassword = await Password.create({
      title,
      username,
      password,
      url,
      notes,
      category,
      user: req.user._id,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    
    res.status(201).json(newPassword);
  } catch (error) {
    console.error('पासवर्ड बनाने में त्रुटि:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'सर्वर त्रुटि' });
  }
};

/**
 * @desc    पासवर्ड अपडेट करें
 * @route   PUT /api/passwords/:id
 * @access  Private
 */
const updatePassword = async (req, res) => {
  try {
    const { title, username, password, url, notes, category } = req.body;
    
    // पासवर्ड खोजें और चेक करें कि वह उपयोगकर्ता का है
    const passwordEntry = await Password.findOne({ 
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!passwordEntry) {
      return res.status(404).json({ message: 'पासवर्ड नहीं मिला' });
    }
    
    // पासवर्ड अपडेट करें
    passwordEntry.title = title || passwordEntry.title;
    passwordEntry.username = username || passwordEntry.username;
    passwordEntry.password = password || passwordEntry.password;
    passwordEntry.url = url !== undefined ? url : passwordEntry.url;
    passwordEntry.notes = notes !== undefined ? notes : passwordEntry.notes;
    passwordEntry.category = category !== undefined ? category : passwordEntry.category;
    passwordEntry.updatedAt = Date.now();
    
    const updatedPassword = await passwordEntry.save();
    
    res.json(updatedPassword);
  } catch (error) {
    console.error('पासवर्ड अपडेट करने में त्रुटि:', error);
    res.status(500).json({ message: 'सर्वर त्रुटि' });
  }
};

/**
 * @desc    पासवर्ड हटाएं
 * @route   DELETE /api/passwords/:id
 * @access  Private
 */
const deletePassword = async (req, res) => {
  try {
    // पासवर्ड खोजें और चेक करें कि वह उपयोगकर्ता का है
    const passwordEntry = await Password.findOne({ 
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!passwordEntry) {
      return res.status(404).json({ message: 'पासवर्ड नहीं मिला' });
    }
    
    // पासवर्ड हटाएं
    await passwordEntry.deleteOne();
    
    res.json({ message: 'पासवर्ड हटा दिया गया है' });
  } catch (error) {
    console.error('पासवर्ड हटाने में त्रुटि:', error);
    res.status(500).json({ message: 'सर्वर त्रुटि' });
  }
};

module.exports = {
  getPasswords,
  createPassword,
  updatePassword,
  deletePassword
}; 