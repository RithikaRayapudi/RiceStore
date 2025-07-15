const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Route files (use correct relative paths based on new structure)
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');

// Track MongoDB connection
let isConnected = false;

// MongoDB Connection
const connectToDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
};

// Express app
const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('✅ Rice Store API is running');
});

// Export for Vercel (serverless function)
module.exports = async (req, res) => {
  await connectToDB();
  return app(req, res);
};
