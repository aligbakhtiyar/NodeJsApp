const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [false, 'Please add a First Name'],
    },
    lastName: {
      type: String,
      required: [false, 'Please add a Last Name'],
    },
    phoneNo: {
      type: String,
      required: [true, 'Please add a Phone Number'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    // token: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
