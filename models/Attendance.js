const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  date: { 
    type: String, 
    required: true // Storing date in 'YYYY-MM-DD' format
  },
  timeIn: { 
    type: String, 
    default: null 
  },
  timeOut: { 
    type: String, 
    default: null 
  },
}, { timestamps: true }); // Add timestamps to track creation and update times

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
