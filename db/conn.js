const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://codewithbakhtiyar:Ahmad123@cluster0.finqq05.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Database Connceted");
}
connectDB().catch((err) => console.log(err));

module.exports = connectDB;
