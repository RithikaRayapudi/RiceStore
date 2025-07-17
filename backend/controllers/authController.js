const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
const existingUser = await User.findOne({ email, role });
if (existingUser) {
  return res.status(400).json({ message: "User already exists with this email and role" });
}


    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, phone, password: hashedPwd, role });
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
