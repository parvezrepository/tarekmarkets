import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  CreditCard, 
  DownloadCloud, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout, admin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] text-slate-900 dark:text-white flex overflow-hidden font-body transition-colors duration-300">
      {/* Sidebar Backdrop for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 260 : (window.innerWidth < 1024 ? 0 : 80),
          x: isSidebarOpen ? 0 : (window.innerWidth < 1024 ? -260 : 0)
        }}
        className="fixed lg:relative z-40 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen flex flex-col transition-all duration-300 overflow-hidden"
      >
        {/* Logo */}
        <div className="p-8 flex items-center justify-between border-b border-slate-50 dark:border-slate-800 flex-shrink-0">
          <Link to="/admin/dashboard" className={`flex items-center space-x-2 transition-all ${!isSidebarOpen && 'lg:justify-center w-full'}`}>
            <img src="/logo.png" alt="Admin" className="h-5 w-auto max-h-5 shrink-0 object-contain" />
            {isSidebarOpen && (
              <span className="text-sm font-black font-heading tracking-tighter text-black dark:text-white uppercase">
                Tarek <span className="text-violet-600">Markets</span>
              </span>
            )}
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow py-8 px-4 space-y-1 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded transition-all group ${
                location.pathname === item.path
                  ? 'bg-slate-50 dark:bg-slate-800 text-black dark:text-white border-l-4 border-black dark:border-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <item.icon size={18} className={location.pathname === item.path ? 'text-black dark:text-white' : 'text-slate-400 group-hover:text-black dark:group-hover:text-white'} />
              {(isSidebarOpen || window.innerWidth < 1024) && <span className="text-xs font-bold uppercase tracking-widest">{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-50 dark:border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded text-slate-400 hover:text-red-500 transition-all group"
          >
            <LogOut size={18} />
            {(isSidebarOpen || window.innerWidth < 1024) && <span className="text-xs font-bold uppercase tracking-widest">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-30 transition-colors">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-slate-400 hover:text-black dark:hover:text-white transition-all"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hidden md:block">
              Internal Dashboard System v2.0
            </h2>
          </div>

          <div className="flex items-center space-x-6">
            <button className="p-2 text-slate-400 hover:text-black dark:hover:text-white relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-violet-600 rounded-full border border-white dark:border-slate-900"></span>
            </button>
            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800"></div>
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] font-black text-black dark:text-white leading-tight uppercase tracking-widest">{admin?.name || 'Admin User'}</div>
                <div className="text-[8px] text-slate-400 uppercase tracking-widest font-bold">Manager Role</div>
              </div>
              <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] font-black">
                {admin?.name?.slice(0, 2).toUpperCase() || 'VA'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow overflow-y-auto p-8 md:p-12 scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
