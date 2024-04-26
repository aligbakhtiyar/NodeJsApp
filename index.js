const express = require("express");
const cors = require("cors");
const connectDB = require("./db/conn");
const mongoose = require("mongoose");
const app = express();
const port = 3001;

app.use(express.json());
app.use(
  cors()
);

// mongoose.connect('mongodb+srv://codewithbakhtiyar:Ahmad@123@cluster0.jjnoit8.mongodb.net/')
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('Failed to connect to MongoDB:', err));

// Include the router for API endpoints
const dataRouter = require("./routes/router");
app.use("/api/data", dataRouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
