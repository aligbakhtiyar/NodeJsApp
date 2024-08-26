const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  authorPic: {
    type: String,
    required: true
  },
  published_date: {
    type: String,
    required: true
  },
  reading_time: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  }
});

async function BlogPost(dbName) {
    const connection = await require("../db/conn")(dbName);
    return connection.model("blog", blogPostSchema);
  }


module.exports = BlogPost;
