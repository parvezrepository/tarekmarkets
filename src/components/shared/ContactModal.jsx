import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Zap, X } from 'lucide-react';

const ContactModal = ({ isOpen, onClose, settings }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose} 
          className="absolute inset-0 bg-black/60 backdrop-blur-md" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.9, y: 20 }} 
          className="bg-[#0a0a0a] w-full max-w-md relative z-10 shadow-2xl border border-white/10 overflow-hidden"
        >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="text-cyan-500" size={28} />
            </div>
            
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 text-white">Get Support</h3>
            <p className="text-slate-400 font-medium mb-8 uppercase text-[10px] tracking-widest">Connect with our specialized agents</p>
            
            <div className="space-y-4">
              <a 
                href={`https://wa.me/${settings.whatsapp?.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-between bg-[#25D366] text-white p-5 group hover:brightness-110 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <MessageCircle size={24} />
                  <span className="font-black uppercase tracking-widest text-xs">WhatsApp Support</span>
                </div>
                <Zap size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              {(() => {
                let tgUsername = settings.telegram ? settings.telegram.trim() : '';
                if (tgUsername.includes('t.me/')) {
                  tgUsername = tgUsername.split('t.me/')[1];
                }
                tgUsername = tgUsername.replace('@', '').split('?')[0];
                const telegramUrl = tgUsername ? `https://t.me/${tgUsername}` : '#';

                return (
                  <a 
                    href={telegramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between bg-[#0088cc] text-white p-5 group hover:brightness-110 transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <Send size={24} />
                      <span className="font-black uppercase tracking-widest text-xs">Telegram Portal</span>
                    </div>
                    <Zap size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                );
              })()}
            </div>
            
            <p className="mt-8 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Available 24/7 for premium members</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ContactModal;
