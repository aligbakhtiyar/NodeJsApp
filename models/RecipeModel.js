const mongoose = require('mongoose');
const { Schema } = mongoose;

// Tags schema is not needed if using strings directly
// const tagsSchema = new Schema({
//   tag: { 
//     type: String,
//     required: true
//   }
// });

// Ingredients schema
const ingredientsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  }
});

// Comments schema
const commentsSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

// More schema
const moreSchema = new Schema({
  prep_time: { type: String, required: true },
  cook_time: { type: String, required: true },
  servings: { type: String, required: true },
  difficulty: { type: String, required: true },
  source: { type: String, required: true },
});

// Main item schema
const itemSchema = new mongoose.Schema({
  menuId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  thumbnail_image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  tags: {
    type: [String], // Array of strings
    required: true
  },
  ingredients: {
    type: [ingredientsSchema], // Array of ingredientsSchema
    required: true
  },
  comments: {
    type: [commentsSchema], // Array of commentsSchema
    required: true
  },
  more: {
    type: moreSchema, // Single moreSchema object
    required: true
  }
});


async function RecipeModel(dbName) {
    const connection = await require("../db/conn")(dbName);
    return connection.model("Items", itemSchema);
  }
// Creating the model
// const Item = mongoose.model('Item', itemSchema);

module.exports = RecipeModel;
