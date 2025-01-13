const Attendance = require("../models/Attendance");

// exports.markTimeIn = async (req, res) => {
//   const { userId } = req.body;
//   const today = new Date().toISOString().split("T")[0];

//   try {
//     const attendance = await Attendance.findOneAndUpdate(
//       { userId, date: today },
//       { timeIn: new Date().toLocaleTimeString() },
//       { upsert: true, new: true }
//     );

//     if (!attendance) {
//       return res.status(404).json({ message: "Attendance record not found" });
//     }

//     res.status(200).json({ message: "Time-in marked successfully", attendance });
//   } catch (error) {
//     res.status(500).json({ message: "Error marking time-in", error: error.message });
//   }
// };

// exports.markTimeOut = async (req, res) => {
//   const { userId } = req.body;
//   const today = new Date().toISOString().split("T")[0];

//   try {
//     const attendance = await Attendance.findOneAndUpdate(
//       { userId, date: today },
//       { timeOut: new Date().toLocaleTimeString() },
//       { new: true }
//     );

//     if (!attendance) {
//       return res.status(404).json({ message: "Attendance record not found" });
//     }

//     res.status(200).json({ message: "Time-out marked successfully", attendance });
//   } catch (error) {
//     res.status(500).json({ message: "Error marking time-out", error: error.message });
//   }
// };

exports.getAllAttendance = async (req, res) => {
  try {
    console.log("Fetching attendance data...");
    const attendance = await Attendance.find();
    console.log("Data fetched successfully");
    res.status(200).json(attendance);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Error fetching attendance data", error: error.message });
  }
};

// exports.getAttendanceByUser = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const attendance = await Attendance.find({ userId });

//     if (attendance.length === 0) {
//       return res.status(404).json({ message: "No attendance data found for this user" });
//     }

//     res.status(200).json(attendance);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching attendance data", error: error.message });
//   }
// };
