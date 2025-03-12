const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const passwordRoutes = require('./routes/passwordRoutes');

// .env फाइल से कॉन्फिग लोड करें
dotenv.config();

// एक्सप्रेस ऐप इनिशियलाइज़ करें
const app = express();

// मिडलवेयर
app.use(cors());
app.use(express.json());

// MongoDB कनेक्शन
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB से कनेक्शन सफल हुआ');
  })
  .catch((error) => {
    console.error('MongoDB कनेक्शन में त्रुटि:', error);
  });

// राउट्स
app.use('/api/users', userRoutes);
app.use('/api/passwords', passwordRoutes);

// सर्वर को पोर्ट पर सुनें
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`सर्वर पोर्ट ${PORT} पर चल रहा है`);
});

module.exports = app; 