const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if traveler already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Traveler already registered" });

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Eco-traveler registered!", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser };