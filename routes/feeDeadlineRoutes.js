const express = require('express');
const router = express.Router();

// Temporary in-memory storage
let feeDeadline = '2025-04-30T23:59:59'; // default

// GET deadline
router.get('/', (req, res) => {
  res.json({ deadline: feeDeadline });
});

// UPDATE deadline
router.post('/update', (req, res) => {
  const { deadline } = req.body;
  if (!deadline) return res.status(400).json({ message: 'Deadline is required' });

  feeDeadline = deadline;
  res.json({ message: 'Deadline updated successfully', deadline });
});

module.exports = router;
