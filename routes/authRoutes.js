const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Assuming you have a middleware for protecting routes
const {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
} = require('../controller/authController');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
//router.get('/all',  getAllUsers); // New route for getting all users

// Protected routes
//router.get('/profile', protect, getUserProfile);

module.exports = router;