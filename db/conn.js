const mongoose = require("mongoose");

async function connectDB(dbName) {
  if (!dbName) {
    throw new Error("Database name is required");
  }

  const uri = `mongodb+srv://codewithbakhtiyar:Ahmad123@cluster0.finqq05.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    const connection = await mongoose.createConnection(uri);
    console.log(`Connected to ${dbName} database`);
    return connection;
  } catch (err) {
    console.error("Failed to connect to database:", err.message);
    throw err;
  }
}

module.exports = connectDB;
