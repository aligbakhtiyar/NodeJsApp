const express = require("express");
const cors = require("cors");
const connectDB = require("./db/conn");
const userRoutes = require("./routes/userRoutes ");
const dataRouter = require("./routes/router");
const onlineRoutes = require('./routes/courseRoutes')
const blogRoutes = require('./routes/blogRoutes')
const itemRoutes = require('./routes/itemRoutes')

const mongoose = require("mongoose");
const app = express();
const port = 5001;

app.use(express.json());
app.use(cors());

// mongoose.connect('mongodb+srv://codewithbakhtiyar:Ahmad@123@cluster0.jjnoit8.mongodb.net/')
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('Failed to connect to MongoDB:', err));

// Include the router for API endpoints
app.use("/api/data", dataRouter);
app.use("/api", userRoutes);
app.use('/api/course', onlineRoutes);
app.use('/api/post', blogRoutes);
app.use('/api/items', itemRoutes);
   

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
