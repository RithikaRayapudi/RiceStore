// const express = require('express');
// const verifyToken = require('./middleware/verifyToken');
// const app = express();

// // Public Routes
// app.get('/manifest.json', (req, res) => {
//   res.sendFile(__dirname + '/public/manifest.json');
// });
// app.post('/api/auth/login', loginHandler);

// // Protected Routes
// app.get('/api/user/profile', verifyToken, profileHandler);


const express = require('express');
const path = require('path');
const verifyToken = require('./middleware/verifyToken');

const app = express();

// Dummy handlers for demonstration
const loginHandler = (req, res) => res.send('Login successful');
const profileHandler = (req, res) => res.send('Profile data');

// Public route
app.get('/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'manifest.json'));
});

// Public login route
app.post('/api/auth/login', loginHandler);

// Protected route
app.get('/api/user/profile', verifyToken, profileHandler);

app.listen(3000, () => console.log('Server running on port 3000'));
