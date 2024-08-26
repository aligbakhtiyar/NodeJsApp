const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

async function getUserModel(dbName) {
  const connection = await require("../db/conn")(dbName);
  return connection.model("User", userSchema);
}

module.exports = getUserModel;
