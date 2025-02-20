const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); 

const {
  getAllAttendance,
  markAttendance,
  getAttendance,
 // markTimeIn,
  //markTimeOut,
  getAttendanceByUser,
} = require("../controller/attendanceController");



// Routes for attendance management

// Fetch all attendance data
//router.get("/attendance", getAllAttendance);

// Future routes for attendance (commented for now)
//router.post("/time-in", protect, markTimeIn);
router.post("/markAttendance", protect, markAttendance);
router.get("/data", protect, getAttendance);
//router.post("/time-out", protect, markTimeOut);
//router.get("/data", protect, getAttendanceByUser);
//router.get("/:Id", getAllAttendance);

module.exports = router;