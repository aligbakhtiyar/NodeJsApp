const express = require("express");
const {
  getAllAttendance,
  // markTimeIn,
  // markTimeOut,
  // getAttendanceByUser,
} = require("../controller/attendanceController");

const router = express.Router();

// Routes for attendance management

// Fetch all attendance data
router.get("/all", getAllAttendance);

// Future routes for attendance (commented for now)
// router.post("/time-in", markTimeIn);
// router.post("/time-out", markTimeOut);
// router.get("/:userId", getAttendanceByUser);

module.exports = router;
