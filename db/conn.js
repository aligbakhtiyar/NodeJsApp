const mongoose = require("mongoose");
const dotenv = require('dotenv')


dotenv.config();
async function connectDB(dbName) {
  if (!dbName) {
    throw new Error("Database name is required");
  }
  const mongodb_url = process.env.MongodbURL ;

  if (!mongodb_url) {
    throw new Error("MONGODB_URL is not defined in the environment variables.");
  }

  const finalUrl = mongodb_url.replace('<dbName>', dbName);
  console.log(finalUrl, 'finalUrl')
   

  
  try {
    const connection = await mongoose.createConnection(finalUrl);
    console.log(`Connected to ${dbName} database`);
    return connection;
  } catch (err) {
    console.error("Failed to connect to database:", err.message);
    throw err;
  }
}

module.exports = connectDB;
