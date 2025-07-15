const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  const prods = await Product.find();
  res.json(prods);
});

// UPDATE product price & weight
router.put('/:id', async (req, res) => {
  const { price, weight } = req.body;
  const updated = await Product.findByIdAndUpdate(req.params.id, { price, weight }, { new: true });
  res.json(updated);
});

module.exports = router;
