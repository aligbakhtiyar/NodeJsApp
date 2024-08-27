const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv')
const connectDB = require("./db/conn");
const userRoutes = require("./routes/userRoutes ");
const dataRouter = require("./routes/router");
const onlineRoutes = require('./routes/courseRoutes')
const blogRoutes = require('./routes/blogRoutes')
const mongoose = require("mongoose");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT ||3001


// Include the router for API endpoints
app.use("/api/data", dataRouter);
app.use("/api", userRoutes);
app.use('/api/course', onlineRoutes);
app.use('/api/post', blogRoutes);


async function connectDatabases() {
  try {
    const testDB = await connectDB("test");
    const webapiDB = await connectDB("WebAPI");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
     
    });
  } catch (err) {
    console.error("Error connecting to databases:", err);
  }
}
connectDatabases();
