import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSettings } from '../../hooks/useSettings';

const WhatsAppButton = () => {
  const { settings } = useSettings();

  const waNumber = settings?.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : '';
  const defaultMessage = encodeURIComponent("Hello! I need some information from TradeKit.");

  return (
    <motion.a
      href={`https://wa.me/${waNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-[#25D366]/40 transition-shadow"
    >
      <MessageCircle size={32} />
    </motion.a>
  );
};

export default WhatsAppButton;
