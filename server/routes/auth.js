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

    let adminData = null;
    let isValid = false;

    if (error || !admin) {
      // Fallback: If DB fails or is empty, allow hardcoded default login for local testing
      if (email === 'admin@digimart.com' && password === 'admin123') {
        adminData = {
          id: '00000000-0000-0000-0000-000000000000',
          email: 'admin@digimart.com',
          name: 'Super Admin'
        };
        isValid = true;
      } else {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
    } else {
      // Verify password strictly with bcrypt hash
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
      adminData = admin;
      isValid = true;
    }

    const payload = {
      admin: {
        id: adminData.id,
        email: adminData.email,
        name: adminData.name
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
          admin: { name: adminData.name, email: adminData.email } 
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
