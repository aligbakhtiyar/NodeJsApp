const TokenBlacklist = require('../models/TokenBlacklist');

const verifyToken = async (req, res, next) => {
  let token = req.header('Authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  token = token.split(' ')[1]; // Extract token

  // Check if token is blacklisted
  const isBlacklisted = await TokenBlacklist.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: 'Unauthorized: Token has been revoked' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyToken;
