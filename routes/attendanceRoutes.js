const express = require("express");
const {
 // markTimeIn,
  //markTimeOut,
  getAllAttendance,
  //getAttendanceByUser,
} = require("../controller/attendanceController");  

const router = express.Router();

// Time-in and Time-out routes
// router.post("/time-in", markTimeIn);
// router.post("/time-out", markTimeOut);

// Fetch attendance data
router.get("/attendance", getAllAttendance);
// router.get("/:userId", getAttendanceByUser);

module.exports = router;
