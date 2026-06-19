const express = require('express');
const router = express.Router();
const supabase = require('../db');
const authenticateAdmin = require('../middleware/auth');

// @route   GET /api/dashboard/stats
// @desc    Get dashboard stats (Admin)
router.get('/stats', authenticateAdmin, async (req, res) => {
  try {
    // Execute all queries in parallel for maximum speed
    const [
      productsResult,
      ordersResult,
      customersResult,
      salesResult
    ] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('customers').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('amount').eq('status', 'Delivered')
    ]);

    const productsCount = productsResult.count;
    const ordersCount = ordersResult.count;
    const customersCount = customersResult.count;
    const salesData = salesResult.data;

    const totalSales = salesData?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

    res.json({
      totalSales: `৳${totalSales.toLocaleString()}`,
      totalOrders: ordersCount || 0,
      totalProducts: productsCount || 0,
      newCustomers: customersCount || 0,
      trend: '+12.5%' // Hardcoded trend for UI
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
