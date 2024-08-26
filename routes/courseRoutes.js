const express = require("express");
const router = express.Router();
const getOnlineModel  = require('../models/Online')

router.post("/user", async (req, res) => {
  const User = await getOnlineModel("WebAPI");
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all users
router.get('/user', async (req, res) => {
  const { id, bannerImage, curriculum, semesters, graduates, achievers, studentsTalk } = req.query;
  
  try {
    const User = await getOnlineModel("WebAPI");
    let query = {};
    if (id) {
      query.id = id;
    }

    const data = await User.findOne(query);
    if (!data) {
      return res.status(404).send("Data not found");
    }

    const response = {};
    if (bannerImage) response.bannerImage = data.bannerImage;
    if (curriculum) response.curriculum = data.curriculum;
    if (semesters) response.semesters = data.semesters;
    if (graduates) response.graduates = data.graduates;
    if (achievers) response.achievers = data.achievers;
    if (studentsTalk) response.studentsTalk = data.studentsTalk;

    // If no specific parameter is provided, return the whole data
    if (!bannerImage && !curriculum && !semesters && !graduates && !achievers && !studentsTalk) {
      response.fullData = data;
    }

    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;