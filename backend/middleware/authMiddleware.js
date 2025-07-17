const express = require('express');
const verifyToken = require('./middleware/verifyToken');
const app = express();

// Public Routes
app.get('/manifest.json', (req, res) => {
  res.sendFile(__dirname + '/public/manifest.json');
});
app.post('/api/auth/login', loginHandler);

// Protected Routes
app.get('/api/user/profile', verifyToken, profileHandler);
