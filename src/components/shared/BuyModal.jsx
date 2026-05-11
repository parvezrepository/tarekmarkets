import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Send, ShieldCheck, Zap } from 'lucide-react';

const BuyModal = ({ isOpen, onClose, product }) => {
  const [currency, setCurrency] = useState(() => localStorage.getItem('currency') || 'BDT');
  const [settings, setSettings] = useState({
    whatsapp: "+8801700000000",
    telegram: "digimart_official",
    usd_rate: 120
  });

  useEffect(() => {
    if (isOpen) {
      const handleCurrencyChange = () => {
        setCurrency(localStorage.getItem('currency') || 'BDT');
      };
      window.addEventListener('currencyChange', handleCurrencyChange);

      const fetchSettings = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/settings`);
          const data = await response.json();
          if (data) {
            setSettings(prev => ({ ...prev, ...data }));
          }
        } catch (err) {
          console.error('BuyModal settings fetch error:', err);
        }
      };
      fetchSettings();
      
      return () => window.removeEventListener('currencyChange', handleCurrencyChange);
    }
  }, [isOpen]);

  if (!product) return null;

  const formatPrice = (bdtPrice) => {
    if (currency === 'USD') {
      return `$${(bdtPrice / (settings.usd_rate || 120)).toFixed(2)}`;
    }
    return `৳${bdtPrice}`;
  };

  const productUrl = typeof window !== 'undefined' ? `${window.location.origin}/product/${product.id}` : '';
  const messageText = `Hello! I want to buy ${product.name} for ${formatPrice(product.price)}.\n\nProduct Link: ${productUrl}`;
  const encodedMessage = encodeURIComponent(messageText);

  const waNumber = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : '';
  const tgUsername = settings.telegram ? settings.telegram.replace('@', '') : 'digimart_official';

  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;
  const telegramUrl = `https://t.me/${tgUsername}?text=${encodedMessage}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-md relative z-10 shadow-2xl overflow-hidden border border-slate-100"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-black transition-colors z-20"
            >
              <X size={20} />
            </button>

            {/* Product Preview Header */}
            <div className="p-8 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-black overflow-hidden border border-slate-200">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-violet-600 mb-1">Direct Purchase</div>
                  <h3 className="text-xl font-black text-black uppercase tracking-tighter leading-tight">{product.name}</h3>
                  <div className="text-lg font-black text-black mt-1 tracking-tighter">{formatPrice(product.price)}</div>
                </div>
              </div>
            </div>

            {/* Selection Area */}
            <div className="p-8 space-y-6">
              <div className="text-center space-y-2 mb-8">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-tight">Contact support to complete purchase</p>
                <div className="flex items-center justify-center space-x-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                  <ShieldCheck size={12} />
                  <span>Secure Direct Transaction</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-[#25D366] text-white p-5 hover:brightness-110 transition-all group shadow-lg shadow-emerald-100"
                >
                  <div className="flex items-center space-x-4">
                    <MessageCircle size={24} />
                    <div className="text-left">
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-80">WhatsApp</div>
                      <div className="text-sm font-black uppercase tracking-widest">Chat with Agent</div>
                    </div>
                  </div>
                  <Zap size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>

                <a 
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-[#0088cc] text-white p-5 hover:brightness-110 transition-all group shadow-lg shadow-blue-100"
                >
                  <div className="flex items-center space-x-4">
                    <Send size={24} />
                    <div className="text-left">
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Telegram</div>
                      <div className="text-sm font-black uppercase tracking-widest">Join Support Group</div>
                    </div>
                  </div>
                  <Zap size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest pt-4">
                Available 24/7 for instant delivery & licensing.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BuyModal;
