const express = require('express');
const router = express.Router();
const supabase = require('../db');
const authenticateAdmin = require('../middleware/auth');

// @route   GET /api/orders
// @desc    Get all orders (Admin)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/orders
// @desc    Create new order (Customer)
router.post('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([req.body])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status (Admin)
router.put('/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
