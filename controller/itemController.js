const Item = require('../models/RecipeModel');
const mongoose = require("mongoose");


const getallItems =  async (req, res) => {
    try {
    const Post =await Item('WebAPI')
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const postItem =  async (req, res) => {
    try {
        const Post = await Item("WebAPI");
    
    
       
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports =  { getallItems, postItem}