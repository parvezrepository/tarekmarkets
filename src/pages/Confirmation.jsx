import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Download, ArrowRight, Mail, ExternalLink, Printer } from 'lucide-react';
import { motion } from 'framer-motion';

const Confirmation = () => {
  const location = useLocation();
  const { orderId, email } = location.state || {};

  if (!orderId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="pt-32 pb-20 min-h-screen flex items-center bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-50 border border-slate-200 p-12 md:p-20 text-center space-y-12"
        >
          <div className="w-24 h-24 bg-violet-600 text-white rounded-none flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-violet-500/20">
            <CheckCircle size={48} />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black font-heading text-black uppercase tracking-tighter">Payment Successful</h1>
            <p className="text-slate-500 font-medium text-lg">Thank you for your purchase. Your digital tools are ready.</p>
          </div>

          <div className="py-6 px-10 bg-black inline-block mx-auto">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] block mb-2">Order Tracking ID</span>
            <span className="text-2xl font-black text-white tracking-tighter">{orderId}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-2xl mx-auto py-8">
            <div className="space-y-6">
              <h3 className="font-black text-black uppercase tracking-widest text-xs flex items-center space-x-3">
                <Download size={18} className="text-violet-600" />
                <span>Instructions</span>
              </h3>
              <ul className="text-sm text-slate-500 space-y-4 font-medium">
                <li className="flex items-start space-x-3">
                  <span className="font-black text-black text-[10px]">01</span>
                  <span>Click the "Download" button below.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-black text-black text-[10px]">02</span>
                  <span>Extract ZIP using WinRAR or 7Zip.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-black text-black text-[10px]">03</span>
                  <span>Check the PDF setup guide.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="font-black text-black uppercase tracking-widest text-xs flex items-center space-x-3">
                <Mail size={18} className="text-violet-600" />
                <span>Email Receipt</span>
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                A confirmation has been sent to: <br />
                <span className="text-black font-black mt-1 block">{email}</span>
              </p>
              <button className="text-[10px] font-black uppercase tracking-widest text-violet-600 hover:text-black transition-colors flex items-center space-x-2">
                <span>Resend Email</span>
                <ExternalLink size={12} />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="w-full sm:w-auto px-12 py-5 bg-black text-white font-black uppercase tracking-widest text-sm hover:bg-zinc-800 transition-all shadow-xl shadow-slate-200">
              Download Files
            </button>
            <button className="w-full sm:w-auto px-12 py-5 border-2 border-slate-200 text-black font-black uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-all">
              Print Receipt
            </button>
          </div>

          <div className="pt-12 border-t border-slate-200">
            <Link to="/shop" className="text-slate-400 hover:text-black transition-colors flex items-center justify-center space-x-2 text-xs font-black uppercase tracking-widest">
              <span>Continue Shopping</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Confirmation;
