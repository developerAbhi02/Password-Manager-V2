const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'शीर्षक अनिवार्य है']
  },
  username: {
    type: String,
    required: [true, 'उपयोगकर्ता नाम अनिवार्य है']
  },
  password: {
    type: String,
    required: [true, 'पासवर्ड अनिवार्य है']
  },
  url: {
    type: String
  },
  notes: {
    type: String
  },
  category: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Number,
    default: Date.now
  },
  updatedAt: {
    type: Number,
    default: Date.now
  }
});

const Password = mongoose.model('Password', passwordSchema);

module.exports = Password; 