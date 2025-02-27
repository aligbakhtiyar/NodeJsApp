const express = require("express");
const Video = require("../models/VideoSchema");

const router = express.Router();

// Add a new video
router.post("/add", async (req, res) => {
  try {
    const { title, url, description } = req.body;
    if (!title || !url) return res.status(400).json({ message: "Title and URL are required" });

    const newVideo = new Video({ title, url, description });
    await newVideo.save();

    res.status(201).json({ message: "Video added successfully", video: newVideo });
  } catch (error) {
    res.status(500).json({ message: "Error adding video", error: error.message });
  }
});

// Fetch all videos
router.get("/list", async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching videos", error: error.message });
  }
});

module.exports = router;
