const express = require('express');
const router = express.Router();
const supabase = require('../db');
const authenticateAdmin = require('../middleware/auth');

// @route   GET /api/products
// @desc    Get all products
router.get('/', async (req, res) => {
  const { category, search } = req.query;

  try {
    let query = supabase.from('products').select('*');

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) return res.status(404).json({ message: 'Product not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/products
// @desc    Create product (Admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([req.body])
      .select();

    if (error) {
      console.error('Supabase Insert Error:', error);
      return res.status(400).json({ message: error.message });
    }
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product (Admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(req.body)
      .eq('id', req.params.id)
      .select();

    if (error) {
      console.error('Supabase Update Error:', error);
      return res.status(400).json({ message: error.message });
    }
    res.json(data[0]);
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product (Admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
