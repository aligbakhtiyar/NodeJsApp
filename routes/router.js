const express = require('express');
const router = express.Router();
const Data = require('../model/Data'); 

// Add data
router.post('/', async (req, res) => {
  console.log("Received a POST request to /data");
  try {
    const { name, phone } = req.body;
    const newData = new Data({ name, phone });
    await newData.save();
    res.send({ message: 'Data added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Edit data
router.put('/:id', async (req, res) => {
  try {
    const { name, phone } = req.body;
    const { id } = req.params;
    await Data.findByIdAndUpdate(id, { name, phone });
    res.send({ message: 'Data updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Get data
router.get('/', async (req, res) => {
  try {
    const data = await Data.find();
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Get data count
router.get('/count', async (req, res) => {
  try {
    const count = await Data.countDocuments();
    res.send({ count });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Data.findByIdAndDelete(id);
    res.send({ message: 'Data deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// DELETE route to delete all data
router.delete('/', async (req, res) => {
  try {
    await Data.deleteMany({});
    res.send({ message: 'All data deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


module.exports = router;
