import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Zap, X } from 'lucide-react';

const CommunityModal = ({ isOpen, onClose, settings }) => {
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
          className="bg-white w-full max-w-md relative z-10 shadow-2xl border border-slate-100 overflow-hidden"
        >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-black flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="text-white" size={28} />
            </div>
            
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Join Community</h3>
            <p className="text-slate-500 font-medium mb-8 uppercase text-[10px] tracking-widest leading-relaxed">This is our community channel! Here you will get fast updates on all products, so please join and stay connected.</p>
            
            <div className="space-y-4">
                <a 
                  href={settings.whatsapp_channel || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between bg-[#25D366] text-white p-5 group hover:brightness-110 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <MessageCircle size={24} />
                    <span className="font-black uppercase tracking-widest text-xs">WhatsApp Channel</span>
                </div>
                <Zap size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              {(() => {
                let tgUrl = settings.telegram_channel || '#';
                
                // If it's just a username instead of a full link, format it properly
                if (tgUrl !== '#' && !tgUrl.startsWith('http')) {
                  let cleanName = tgUrl.trim().replace('@', '');
                  tgUrl = `https://t.me/${cleanName}`;
                }

                return (
                  <a 
                    href={tgUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between bg-[#0088cc] text-white p-5 group hover:brightness-110 transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <Send size={24} />
                      <span className="font-black uppercase tracking-widest text-xs">Telegram Channel</span>
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

export default CommunityModal;
