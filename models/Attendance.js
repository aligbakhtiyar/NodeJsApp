const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // Store the username
    },
    date: {
      type: String,
      required: true, // Storing date in 'YYYY-MM-DD' format
    },
    day: {
      type: String,
      required: true, // Store the day of the week
    },
    timeIn: {
      type: String,
      default: null,
    },
    timeOut: {
      type: String,
      default: null,
    },
  },
  //{ timestamps: true } // Optional: Add timestamps for created/updated fields
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;