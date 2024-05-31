// controllers/faqController.js

const FAQ = require('../models/faq');

exports.createFAQ = async (req, res) => {
  try {
    const { question, answer, category } = req.body;
    const newFAQ = await FAQ.create({ question, answer, category });
    res.status(201).json(newFAQ);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getFAQsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const faqs = await FAQ.find({ category });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
