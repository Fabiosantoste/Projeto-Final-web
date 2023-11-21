const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Product = require('../models/Product');

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('add');
});

router.post('/add', ensureAuthenticated, async (req, res) => {
  const { name, description } = req.body;

  const newProduct = new Product({ name, description });

  await newProduct.save();
  res.redirect('/dashboard');
});

router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('edit', { product });
});

router.post('/edit/:id', ensureAuthenticated, async (req, res) => {
  const { name, description } = req.body;

  await Product.findByIdAndUpdate(req.params.id, { name, description });
  res.redirect('/dashboard');
});

router.get('/delete/:id', ensureAuthenticated, async (req, res) => {
  await Product.findByIdAndRemove(req.params.id);
  res.redirect('/dashboard');
});

module.exports = router;
