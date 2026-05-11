const express = require('express');
const router = express.Router();
const supabase = require('../db');
const authenticateAdmin = require('../middleware/auth');

// @route   GET /api/settings
// @desc    Get site settings
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is 'no rows returned'
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/settings
// @desc    Update site settings (Admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    // Check if settings already exist
    const { data: existing } = await supabase.from('settings').select('id').single();

    let result;
    if (existing) {
      // Update
      const { data, error } = await supabase
        .from('settings')
        .update(req.body)
        .eq('id', existing.id)
        .select();
      if (error) throw error;
      result = data[0];
    } else {
      // Insert
      const { data, error } = await supabase
        .from('settings')
        .insert([req.body])
        .select();
      if (error) throw error;
      result = data[0];
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
