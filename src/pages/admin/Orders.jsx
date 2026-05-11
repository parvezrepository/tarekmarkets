import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle,
  Truck,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Orders = () => {
  const { getAuthHeader } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        headers: getAuthHeader()
      });
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch orders error:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = Array.isArray(orders) ? orders.filter(o => {
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchesSearch = 
      (o.customer_name?.toLowerCase().includes(searchQuery.toLowerCase())) || 
      (o.id?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (o.email?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  }) : [];

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-violet-600" size={40} />
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-heading text-black dark:text-white uppercase tracking-tighter transition-colors">Orders</h1>
          <p className="text-slate-500 font-medium mt-2">Track and manage customer purchases in real-time.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="relative w-full lg:w-96">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by ID, name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-12 py-3 text-sm font-bold outline-none focus:border-black dark:focus:border-white transition-all text-black dark:text-white"
          />
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
          {['All', 'Pending', 'Confirmed', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                statusFilter === status 
                ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' 
                : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-700 hover:border-black dark:hover:border-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[10px] uppercase tracking-widest font-black">
                <th className="px-8 py-6">Order Reference</th>
                <th className="px-8 py-6">Customer</th>
                <th className="px-8 py-6">Product Info</th>
                <th className="px-8 py-6">Amount</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="font-mono text-[10px] font-black text-violet-600 uppercase tracking-tighter">
                      #{order.id.slice(0, 8)}
                    </div>
                    <div className="text-[9px] text-slate-400 font-bold mt-1">
                      {new Date(order.created_at).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-black text-black dark:text-white uppercase tracking-tight">{order.customer_name}</div>
                    <div className="text-[10px] text-slate-400 font-bold">{order.email}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-[10px] font-black text-black dark:text-white uppercase tracking-widest bg-slate-50 dark:bg-slate-800 px-3 py-1 border border-slate-100 dark:border-slate-700 w-fit">
                      {order.product_name || 'MT4 Asset'}
                    </div>
                  </td>
                  <td className="px-8 py-6 font-black text-black dark:text-white tracking-tighter text-lg">
                    ৳{order.amount}
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1.5 border text-[8px] font-black uppercase tracking-widest ${
                      order.status === 'Delivered' ? 'border-emerald-200 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10' :
                      order.status === 'Pending' ? 'border-amber-200 text-amber-600 bg-amber-50 dark:bg-amber-900/10' :
                      order.status === 'Cancelled' ? 'border-rose-200 text-rose-600 bg-rose-50 dark:bg-rose-900/10' :
                      'border-violet-200 text-violet-600 bg-violet-50 dark:bg-violet-900/10'
                    }`}>
                      {order.status === 'Delivered' && <CheckCircle size={10} />}
                      {order.status === 'Pending' && <Clock size={10} />}
                      {order.status === 'Cancelled' && <XCircle size={10} />}
                      <span>{order.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button 
                        onClick={() => alert(`Order Details:\nID: ${order.id}\nCustomer: ${order.customer_name}\nEmail: ${order.email}\nProduct: ${order.product_name || 'MT4 Asset'}\nAmount: ৳${order.amount}\nStatus: ${order.status}`)}
                        className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-all" title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {order.status !== 'Delivered' && (
                        <button 
                          onClick={async () => {
                            if (!window.confirm('Mark this order as Delivered?')) return;
                            try {
                              const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/${order.id}/status`, {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                  ...getAuthHeader()
                                },
                                body: JSON.stringify({ status: 'Delivered' })
                              });
                              if (res.ok) {
                                fetchOrders();
                              } else {
                                alert('Failed to update status');
                              }
                            } catch (e) {
                              console.error(e);
                            }
                          }}
                          className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all" title="Mark as Delivered"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      {order.status !== 'Cancelled' && (
                        <button 
                          onClick={async () => {
                            if (!window.confirm('Cancel this order?')) return;
                            try {
                              const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/${order.id}/status`, {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                  ...getAuthHeader()
                                },
                                body: JSON.stringify({ status: 'Cancelled' })
                              });
                              if (res.ok) {
                                fetchOrders();
                              } else {
                                alert('Failed to update status');
                              }
                            } catch (e) {
                              console.error(e);
                            }
                          }}
                          className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Cancel Order"
                        >
                          <XCircle size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {(!Array.isArray(orders) || filteredOrders.length === 0) && (
                <tr>
                  <td colSpan="6" className="px-8 py-20 text-center text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
                    No order synchronization found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
