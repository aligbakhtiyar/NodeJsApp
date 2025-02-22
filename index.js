require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const attendanceRoutes = require("./routes/attendanceRoutes")
const authRoutes = require("./routes/authRoutes");


const app = express();
const port = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: "*", // Allow requests from any origin
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // Allow credentials like tokens/cookies
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 
app.use(express.json());

// Routes
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
