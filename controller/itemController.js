const Items = require('../models/RecipeModel');
const mongoose = require("mongoose");


const getallItems =  async (req, res) => {
    try {
        const get =await Items('WebAPI')
        const gets = await get.find();
        res.status(200).json(gets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postItem =  async (req, res) => {
    try {
      const Post = await Items("WebAPI");
      const newPost = new Post(req.body);
      const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchItem = async (req, res) => {
  const Item = await Items('WebAPI');
  try {
    const searchCriteria = {};

    if (req.query.name) {
      searchCriteria.name = { $regex: req.query.name, $options: 'i' };
    }
    if (req.query.category) {
      searchCriteria.category = req.query.category;
    }
    if (req.query.tags) {
      const tagsArray = req.query.tags.split(':'); // Assuming tags are colon-separated
      searchCriteria.tags = { $in: tagsArray };
    }

    const items = await Item.find(searchCriteria);

    if (items.length === 0) {
      return res.status(200).json({ message: "No items found matching the criteria.", success: true });
    }

    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const singleItem = async (req, res) => {
  const Item = await Items("WebAPI");
  const { id } = req.params;
  console.log(id)
    try {
      const singleItem = await Item.findById(id);
            if (!singleItem) {  
          return res.status(404).json({ message: "Item not found" });
      }
           return res.status(200).json(singleItem);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};


module.exports =  { getallItems, postItem, searchItem, singleItem }