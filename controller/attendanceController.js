// const Attendance = require("../models/Attendance");

// exports.markTimeIn = async (req, res) => {
//   const username = req.user.username || req.user.email; // Use a unique identifier

//   if (!username) {
//     return res.status(400).json({ message: "User identifier not found in request" });
//   }

//   const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
//   const dayOfWeek = new Date().toLocaleDateString("en-US", { weekday: "long" });

//   try {
//     // Check if this specific user has already marked attendance today
//     const existingAttendance = await Attendance.findOne({ username, date: today });

//     if (existingAttendance) {
//       return res.status(400).json({ message: "Attendance already marked for today" });
//     }

//     // Mark Time-In for this user
//     const attendance = await Attendance.create({
//       username,
//       date: today,
//       day: dayOfWeek,
//       timeIn: new Date().toLocaleTimeString(),
//     });

//     res.status(200).json({ message: "Time-in marked successfully", attendance });
//   } catch (error) {
//     res.status(500).json({ message: "Error marking time-in", error: error.message });
//   }
// };

// // ✅ Mark Time-Out (Only if the user has Time-In)
// exports.markTimeOut = async (req, res) => {
//   const username = req.user.username || req.user.email;

//   if (!username) {
//     return res.status(400).json({ message: "User identifier not found in request" });
//   }

//   const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

//   try {
//     // Find attendance for this specific user on today's date
//     const attendance = await Attendance.findOneAndUpdate(
//       { username, date: today },
//       { timeOut: new Date().toLocaleTimeString() },
//       { new: true }
//     );

//     if (!attendance) {
//       return res.status(404).json({ message: "No attendance record found for today. Please mark Time-In first." });
//     }

//     res.status(200).json({ message: "Time-out marked successfully", attendance });
//   } catch (error) {
//     res.status(500).json({ message: "Error marking time-out", error: error.message });
//   }
// };

// // ✅ Get Attendance for Logged-In User
// exports.getAttendanceByUser = async (req, res) => {
//   const username = req.user.username || req.user.email;

//   if (!username) {
//     return res.status(400).json({ message: "User identifier not found in request" });
//   }

//   try {
//     // Fetch only this user's attendance records, sorted by date (latest first)
//     const attendanceRecords = await Attendance.find({ username }).sort({ date: -1 });

//     res.status(200).json({ message: "Attendance records fetched successfully", attendanceRecords });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching attendance records", error: error.message });
//   }
// };




// // exports.getAttendanceByUser = async (req, res) => {
// //   const { userId } = req.params;

// //   try {
// //     const attendance = await Attendance.find({ userId });

// //     if (attendance.length === 0) {
// //       return res.status(404).json({ message: "No attendance data found for this user" });
// //     }

// //     res.status(200).json(attendance);
// //   } catch (error) {
// //     res.status(500).json({ message: "Error fetching attendance data", error: error.message });
// //   }
// // };
const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  const username = req.user.username || req.user.email; // Unique identifier

  if (!username) {
    return res.status(400).json({ message: "User identifier not found in request" });
  }

  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const dayOfWeek = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const currentTime = new Date().toLocaleTimeString();

  try {
    // Check if user has already marked attendance today
    const existingAttendance = await Attendance.findOne({ username, date: today });

    if (!existingAttendance) {
      // If no record, mark Time-In
      const attendance = await Attendance.create({
        username,
        date: today,
        day: dayOfWeek,
        timeIn: currentTime,
      });

      return res.status(200).json({ message: "Time-in marked successfully", attendance });
    }

    if (existingAttendance.timeOut) {
      return res.status(400).json({ message: "Attendance already marked for today" });
    }

    // If Time-In exists but no Time-Out, mark Time-Out
    existingAttendance.timeOut = currentTime;
    await existingAttendance.save();

    res.status(200).json({ message: "Time-out marked successfully", attendance: existingAttendance });
  } catch (error) {
    res.status(500).json({ message: "Error marking attendance", error: error.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const username = req.user.username || req.user.email; // Get user from request

    if (!username) {
      return res.status(400).json({ message: "User identifier not found in request" });
    }

    // Fetch all attendance records for the logged-in user
    const attendanceRecords = await Attendance.find({ username });

    res.status(200).json({ attendanceRecords });
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance records", error: error.message });
  }
};

