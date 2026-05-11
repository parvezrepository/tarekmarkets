import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Package, 
  Users, 
  ShoppingCart,
  TrendingUp,
  Zap,
  Loader2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { getAuthHeader } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/dashboard/stats`, { headers: getAuthHeader() }),
          fetch(`${import.meta.env.VITE_API_URL}/orders?limit=5`, { headers: getAuthHeader() })
        ]);
        
        const statsData = await statsRes.json();
        const ordersData = await ordersRes.json();
        
        setStats(statsData);
        setRecentOrders(ordersData);
        setLoading(false);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-violet-600" size={40} />
    </div>
  );

  const statCards = [
    { label: 'Total Revenue', value: stats?.totalSales || '৳0', trend: '+12.5%', isUp: true, icon: DollarSign },
    { label: 'Platform Orders', value: stats?.totalOrders || '0', trend: '+5.2%', isUp: true, icon: ShoppingCart },
    { label: 'Active Assets', value: stats?.totalProducts || '0', trend: 'Stable', isUp: true, icon: Package },
    { label: 'New Customers', value: stats?.newCustomers || '0', trend: '+18.4%', isUp: true, icon: Users },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black font-heading text-black dark:text-white uppercase tracking-tighter">Marketplace Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Monitoring platform performance and real-time transactions.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-slate-200 dark:shadow-none">
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-8 hover:border-black dark:hover:border-white transition-all group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded flex items-center justify-center text-black dark:text-white group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all">
                  <Icon size={18} />
                </div>
                <div className={`flex items-center space-x-1 text-[10px] font-black ${stat.isUp ? 'text-emerald-600 dark:text-emerald-500' : 'text-rose-600 dark:text-rose-500'}`}>
                  <span>{stat.trend}</span>
                  {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-black text-black dark:text-white font-heading tracking-tighter">{stat.value}</div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] font-bold">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Sales Chart Mockup - Still using static for visual placeholder */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Revenue Performance</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-black dark:bg-white"></div>
              <span className="text-[10px] font-bold uppercase text-black dark:text-white">Weekly Growth</span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{day: 'Mon', sales: 400}, {day: 'Tue', sales: 300}, {day: 'Wed', sales: 600}, {day: 'Thu', sales: 800}, {day: 'Fri', sales: 500}]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.2} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <Tooltip cursor={{ fill: '#0f172a', opacity: 0.1 }} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0px', color: '#fff' }} />
                <Bar dataKey="sales" fill="#8b5cf6" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-8 space-y-8">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Best Performing</h3>
          <div className="space-y-6">
            {[
              { name: 'Gold Scalper EA', sales: 420, growth: '+20%', color: 'bg-black dark:bg-white' },
              { name: 'Forex Trade Bot', sales: 310, growth: '+15%', color: 'bg-violet-600' },
              { name: 'News Filter EA', sales: 250, growth: '+8%', color: 'bg-emerald-500' },
              { name: 'RSI Divergence', sales: 180, growth: '+5%', color: 'bg-rose-500' },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className={`w-1 h-8 ${item.color}`}></div>
                  <div>
                    <div className="text-xs font-black text-black dark:text-white uppercase tracking-tight">{item.name}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">{item.sales} units sold</div>
                  </div>
                </div>
                <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-500">{item.growth}</div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 border border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-all">
            Full Product Report
          </button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-100 dark:shadow-none">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Recent Transactions</h3>
          <Link to="/admin/orders" className="text-black dark:text-white text-[10px] font-black hover:text-violet-600 dark:hover:text-violet-400 uppercase tracking-widest transition-colors">Full List</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[9px] uppercase tracking-[0.2em] font-black">
                <th className="px-8 py-4">Reference</th>
                <th className="px-8 py-4">Customer</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {Array.isArray(recentOrders) && recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-8 py-5 text-[10px] font-black text-black dark:text-white">{order.id?.slice(0, 8)}...</td>
                  <td className="px-8 py-5">
                    <div className="text-[10px] font-black text-black dark:text-white uppercase">{order.customer_name}</div>
                    <div className="text-[8px] text-slate-400 font-bold">{order.email}</div>
                  </td>
                  <td className="px-8 py-5 text-[10px] font-black text-black dark:text-white">৳{order.amount}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest border ${
                      order.status === 'Delivered' ? 'border-emerald-200 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10' :
                      order.status === 'Pending' ? 'border-amber-200 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10' :
                      'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-[10px] text-slate-400 font-bold">{order.created_at ? new Date(order.created_at).toLocaleDateString() : ''}</td>
                </tr>
              ))}
              {(!Array.isArray(recentOrders) || recentOrders.length === 0) && (
                <tr>
                  <td colSpan="5" className="px-8 py-10 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
