import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Cpu, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('admin@digimart.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.message || 'Invalid credentials. Use admin@digimart.com / admin123');
        setLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden font-body">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-50 blur-[120px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-50 blur-[120px] rounded-full -ml-64 -mb-64" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-black text-white rounded-none flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-slate-200">
            <Cpu size={36} />
          </div>
          <h1 className="text-4xl font-black font-heading text-black uppercase tracking-tighter">Admin Portal</h1>
          <p className="text-slate-500 font-medium mt-3">Sign in to manage TradeKit marketplace</p>
        </div>

        <div className="bg-white border border-slate-200 p-10 shadow-2xl shadow-slate-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 pl-14 pr-6 py-4 text-black font-bold text-sm outline-none focus:border-black transition-all"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
                <a href="#" className="text-[10px] font-black uppercase tracking-widest text-violet-600 hover:text-black transition-colors">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 pl-14 pr-6 py-4 text-black font-bold text-sm outline-none focus:border-black transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-500 text-[10px] font-black uppercase tracking-widest text-center">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full py-5 bg-black text-white font-black uppercase tracking-widest text-sm hover:bg-zinc-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Authenticate Access</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-widest mt-12">
          &copy; 2026 TradeKit Global Systems
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
