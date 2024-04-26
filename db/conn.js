const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(
    //   "mongodb+srv://codewithbakhtiyar:Ahmad@123@cluster0.jjnoit8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
     "mongodb+srv://codewithbakhtiyar:Ahmad123@cluster0.finqq05.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    // "mongodb+srv://codewithbakhtiyar:<password>@cluster0.cp8fsys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
);
  console.log("Database Connceted");
}
connectDB().catch((err) => console.log(err));

module.exports = connectDB;