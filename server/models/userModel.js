const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'नाम अनिवार्य है']
  },
  email: {
    type: String,
    required: [true, 'ईमेल अनिवार्य है'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'कृपया वैध ईमेल प्रदान करें']
  },
  password: {
    type: String,
    required: [true, 'पासवर्ड अनिवार्य है'],
    minlength: [6, 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// उपयोगकर्ता पासवर्ड को बचाने से पहले हैश करें
userSchema.pre('save', async function(next) {
  // अगर पासवर्ड संशोधित नहीं किया गया है तो आगे बढ़ें
  if (!this.isModified('password')) return next();
  
  // पासवर्ड हैश करें
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// पासवर्ड सत्यापित करने के लिए मेथड
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User; 