const express = require("express");
const {
  markTimeIn,
  markTimeOut,
  getAllAttendance,
  getAttendanceByUser,
} = require("../controller/attendanceController");  // Corrected path

const router = express.Router();

// Time-in and Time-out routes
router.post("/time-in", markTimeIn);
router.post("/time-out", markTimeOut);

// Fetch attendance data
router.get("/", getAllAttendance);
router.get("/:userId", getAttendanceByUser);

module.exports = router;
