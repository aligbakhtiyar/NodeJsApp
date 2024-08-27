const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost'); // Adjust the path to where your BlogPost model is located

// Create a new blog post
router.post('/blog', async (req, res) => {
    const Post = await BlogPost("WebAPI");
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all blog posts
router.get('/blogs', async (req, res) => {
    try {
    const Post =await BlogPost('WebAPI')
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single blog post by ID
router.get('/blog/:id', async (req, res) => {
  try {
    const Post =await BlogPost('WebAPI')
    const post = await Post.findOne({ id: req.params.id });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a blog post by ID
router.put('/blog/:id', async (req, res) => {
  try {
    const updatedPost = await BlogPost.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a blog post by ID
router.delete('/blog/:id', async (req, res) => {
  try {
    const deletedPost = await BlogPost.findOneAndDelete({ id: req.params.id });
    if (deletedPost) {
      res.status(200).json({ message: 'Blog post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
