const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const supabase = require('../db');

// @route   POST /api/auth/login
// @desc    Admin login & get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !admin) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Verify password (assuming it's hashed in DB)
    const isMatch = await bcrypt.compare(password, admin.password);
    
    // Fallback for initial setup (if password is not hashed, e.g. plain text for first admin)
    // In production, ALWAYS use hashed passwords.
    const isPlainMatch = password === admin.password;

    if (!isMatch && !isPlainMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = {
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      }
    };

    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_change_me_in_production';
    
    if (!process.env.JWT_SECRET) {
      console.warn('WARNING: JWT_SECRET is not set. Using fallback secret.');
    }

    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          console.error('JWT Sign Error:', err);
          return res.status(500).json({ message: 'Error generating token' });
        }
        res.json({ 
          token, 
          admin: { name: admin.name, email: admin.email } 
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
