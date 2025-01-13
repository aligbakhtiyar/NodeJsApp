require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const onlineRoutes = require("./routes/courseRoutes");
const blogRoutes = require("./routes/blogRoutes");
const itemRoutes = require("./routes/itemRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 5001;

// CORS Configuration
const corsOptions = {
  origin: ['https://edublends-lms.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/course", onlineRoutes);
app.use("/api/post", blogRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/auth", authRoutes);
// MongoDB connection
async function main() {
  await mongoose.connect(process.env.MONGO_URI); // Use MONGO_URI from .env
  console.log("Database Connected");
}

main().catch((err) => console.log(err));

// Start the server

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
