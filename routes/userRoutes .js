const express = require("express");

const getUserModel  = require("../models/UserModel")
const router = express.Router();

// Create a new user
router.post("/user", async (req, res) => {
  const User = await getUserModel("WebAPI");
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all users
router.get("/user", async (req, res) => {
  const User = await getUserModel("WebAPI");

  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a user by ID
router.get("/user/:id", async (req, res) => {
  const User = await getUserModel("WebAPI");

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a user
router.put("/user/:id", async (req, res) => {
  const User = await getUserModel("WebAPI");

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a user
router.delete("/user/:id", async (req, res) => {
  const User = await getUserModel("WebAPI");

  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
