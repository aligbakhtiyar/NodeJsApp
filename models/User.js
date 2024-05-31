  // models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
firstName: {
  type: String,
},
LastName: {
  type: String,
},
username: {
  type: String,
  required: true
},
email: {
  type: String,
  required: true,
  unique: true,
  // You might want to add additional validation for email format here
},
password: {
  type: String,
  required: true
  // You might want to add additional validation for password strength here
},

phone: {
  type: String,
  validate: {
    validator: function(v) {
      // Custom validation function to check if phone number contains only numbers
      return /^[0-9]+$/.test(v);
    },
    message: props => `${props.value} is not a valid phone number!`
  },
  unique: true
},
address: {
  type: String,
  // You might want to add additional validation for address here
},
profileImage: {
  type: String,
  // You might want to add additional validation for profile image URL format here
},

 
});

// Export User model
module.exports = mongoose.model("User", userSchema);
