const express = require('express');
const router = express.Router();
const supabase = require('../db');
const authenticateAdmin = require('../middleware/auth');

// @route   GET /api/customers
// @desc    Get all customers (Admin)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
