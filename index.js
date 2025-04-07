require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const attendanceRoutes = require("./routes/attendanceRoutes");
const videoRoutes = require("./routes/videoRoutes");
const authRoutes = require("./routes/authRoutes");
const feeRoutes = require("./routes/feeRoutes")

const app = express();
const port = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: "https://edu-blends.vercel.app", 
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, 
};

app.use(cors(corsOptions));
//app.use(cors());
app.options("*", cors(corsOptions)); 
app.use(express.json());

// Routes
app.use("/api/attendance", attendanceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/video", videoRoutes);
app.use("/api", feeRoutes);

// MongoDB connection
async function main() {
  await mongoose.connect(process.env.MONGO_URI); 
  console.log("Database Connected");
}
main().catch((err) => console.log(err));

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});