const TokenBlacklist = require('../models/TokenBlacklist');

exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from header
    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }

    // Decode token to get expiration time (assuming you're using JWT)
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    // Save token to blacklist
    await TokenBlacklist.create({ token, expiresAt: new Date(decoded.exp * 1000) });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out', error: error.message });
  }
};
