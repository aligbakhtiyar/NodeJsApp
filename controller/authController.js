const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password: password,
    });

    // Send response
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      //token: user.token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      //token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user profile (protected route)
// const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// Get all users (protected route)
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({}, { password: 0 }); // Exclude passwords from the response

//     if (!users || users.length === 0) {
//       return res.status(404).json({ message: 'No users found' });
//     }

//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// Helper function to generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };

module.exports = {
  registerUser,
  loginUser,
  //getUserProfile,
  //getAllUsers, // Export the new function
};