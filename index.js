const express = require("express");
const cors = require("cors");
const connectDB = require("./db/conn");
const mongoose = require("mongoose");
const app = express();
const port = 3001;

app.use(express.json());
app.use(
<<<<<<< HEAD
  cors()
);
=======
  cors({
    origin: ["https://node-js-app-liard.vercel.app/"],
    methods: ["POST", "GET", "DELETE"],
    Credentials: true,
  })
);


>>>>>>> 4963597c24b04035652034a141fc812bdeba7e44

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
