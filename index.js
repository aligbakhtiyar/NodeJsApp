const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
//const userRoutes = require("./routes/userRoutes");
const dataRouter = require("./routes/router");
const onlineRoutes = require("./routes/courseRoutes");
const blogRoutes = require("./routes/blogRoutes");
const itemRoutes = require("./routes/itemRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();
const port = 5001;

// Middleware
app.use(express.json());
app.use(cors());



// Include the router for API endpoints
app.use("/api/data", dataRouter);
//app.use("/api", userRoutes);
app.use("/api/course", onlineRoutes);
app.use("/api/post", blogRoutes);
app.use("/api/items", itemRoutes);
app.use("/attendance", attendanceRoutes);

// MongoDB connection
async function main() {
  await mongoose.connect(
    "mongodb+srv://codewithbakhtiyar:9808559131@cluster0.cp8fsys.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("Database Connected");
}

main().catch((err) => console.log(err));

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
