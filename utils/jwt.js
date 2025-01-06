const jwt = require('jsonwebtoken');

// Secret key for signing and verifying tokens
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Use an environment variable for security
const JWT_EXPIRES_IN = '5m'; // Token expiration time

/**
 * Generate a JWT
 * @param {Object} payload - The data to include in the token
 * @returns {string} - The signed JWT
 */
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
console.log(generateToken,'generateToken')
/**
 * Verify a JWT
 * @param {string} token - The token to verify
 * @returns {Object} - Decoded payload if the token is valid
 * @throws {Error} - If the token is invalid or expired
 */

res.cookie('auth_token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });

// Respond with success
res.json({ message: 'Login successful' });
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Middleware to protect routes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user information to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

module.exports = {
  generateToken,
  verifyToken,
  authenticateToken,
};
