const express = require('express');
const router = express.Router();
const supabase = require('../db');
const authenticateAdmin = require('../middleware/auth');

// @route   GET /api/dashboard/stats
// @desc    Get dashboard stats (Admin)
router.get('/stats', authenticateAdmin, async (req, res) => {
  try {
    // In a real app, these would be complex queries
    // For now, we fetch counts and sums
    const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
    const { count: ordersCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
    const { count: customersCount } = await supabase.from('customers').select('*', { count: 'exact', head: true });
    
    // Summing sales (mocking with a dummy calculation or fetching)
    const { data: salesData } = await supabase.from('orders').select('amount').eq('status', 'Delivered');
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
