const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and verify password
    if (user && await bcrypt.compare(password, user.password)) {
      // User is authenticated, generate JWT token
      const token = jwt.sign({ userId: user._id }, "c7ef8d2a7dc8d38422bd96e625435cb0adc8bc9d5a575ece6536e6eac35db835", { expiresIn: '1h' });

      // Send back user details and token
      res.status(200).json({ user: user.toObject(), token });
    } else {
      // Invalid credentials
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal Server Error");
  }
};


exports.register = async (req, res) => {
  const secretKey = "c7ef8d2a7dc8d38422bd96e625435cb0adc8bc9d5a575ece6536e6eac35db835";
  try {
    const requiredFields = ['username', 'email', 'password', 'firstName', 'lastName', 'phone'];
    for (const field of requiredFields) {
      if (!req.body[field]) {

        return res.status(400).send(`${field} is required`);
      }
    }


    const { username, email, password, firstName, lastName, phone } = req.body;
    const existingUser = await User.findOne({ email });
    console.log(existingUser,'sksksk')
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({username, email, firstName, lastName, phone ,password: hashedPassword});
    let result = await user.save();
    const token = jwt.sign({ userId: result._id }, secretKey, { expiresIn: '1h' }); // Change 'your_secret_key' to your actual secret key
   
    result = result.toObject();
    delete result.password;
    res.status(201).json({ user: result, token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
};






// const crypto = require('crypto');

// // Generate a random secsret key
// const secretKey = crypto.randomBytes(32).toString('hex');
// console.log("Generated Secret Key:", secretKey);
