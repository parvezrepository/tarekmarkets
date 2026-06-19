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
      .limit(1);

    if (error) throw error;
    res.json(data && data.length > 0 ? data[0] : {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/settings
// @desc    Update site settings (Admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    // Check if settings already exist
    const { data: existingArray } = await supabase.from('settings').select('id').limit(1);
    const existing = existingArray && existingArray.length > 0 ? existingArray[0] : null;

    let result;
    if (existing) {
      // Update
      const updateData = { ...req.body };
      delete updateData.id;
      delete updateData.updated_at;

      const { data, error } = await supabase
        .from('settings')
        .update(updateData)
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
