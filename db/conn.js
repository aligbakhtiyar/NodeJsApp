const mongoose = require("mongoose");
const dotenv = require('dotenv')


dotenv.config();
async function connectDB(dbName) {
  if (!dbName) {
    throw new Error("Database name is required");
  }
  const mongodb_url = process.env.MongodbURL
   

  
  try {
    const connection = await mongoose.createConnection(mongodb_url);
    console.log(`Connected to ${dbName} database`);
    return connection;
  } catch (err) {
    console.error("Failed to connect to database:", err.message);
    throw err;
  }
}

module.exports = connectDB;
