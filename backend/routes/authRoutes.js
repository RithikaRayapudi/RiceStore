const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// REGISTER route
router.post('/register', async (req, res) => {
  console.log("HIT /api/auth/register");
  console.log(req.body);
  const { name, email, phone, password } = req.body;
  const role = 'customer';  // Only customers register via this route

  try {
    // Check if a user already exists with this email or phone
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email or phone' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// LOGIN route (includes hardcoded admin)
router.post('/login', async (req, res) => {
  const { phone, password } = req.body;

  try {
    // 🔐 Hardcoded Admin Shortcut
    if (phone === '7671879837' && password === 'rayapudi_08') {
      const token = jwt.sign(
        { phone, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      return res.json({
        message: 'Admin login successful',
        token,
        user: {
          name: 'Admin',
          phone,
          role: 'admin'
        }
      });
    }

    // Customer login
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
