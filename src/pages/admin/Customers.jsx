import React, { useState, useEffect } from 'react';
import { Search, Mail, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAuthHeader } = useAuth();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/customers`, {
          headers: getAuthHeader()
        });
        const data = await response.json();
        setCustomers(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-violet-600" size={40} />
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-heading text-black dark:text-white uppercase tracking-tighter">Directory</h1>
          <p className="text-slate-500 font-medium mt-2">View and manage your registered user base.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-12 py-3 text-sm font-bold outline-none focus:border-black transition-all text-black dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 group hover:border-black dark:hover:border-white transition-all relative overflow-hidden shadow-xl shadow-slate-100/50 dark:shadow-none">
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-50 dark:bg-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150"></div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-none flex items-center justify-center font-black text-2xl shadow-xl shadow-slate-200 dark:shadow-none">
                  {customer.name?.charAt(0).toUpperCase()}
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 px-3 py-1 text-[8px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-900/50">
                  Verified
                </div>
              </div>

              <div>
                <h3 className="font-black text-xl text-black dark:text-white uppercase tracking-tighter">{customer.name}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                  Joined {new Date(customer.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-xs font-bold text-slate-500">
                  <Mail size={16} className="text-violet-600" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs font-bold text-slate-500">
                  <ShieldCheck size={16} className="text-violet-600" />
                  <span>Tier: Member</span>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-8">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Spent</div>
                  <div className="text-2xl font-black text-black dark:text-white tracking-tighter">৳{customer.total_spent || 0}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredCustomers.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-400 text-xs font-black uppercase tracking-widest border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            No customers found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
