import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSettings } from '../../hooks/useSettings';
import ContactModal from './ContactModal';

const WhatsAppButton = () => {
  const { settings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-[#25D366]/40 transition-shadow"
      >
        <MessageCircle size={32} />
      </motion.button>
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} settings={settings} />
    </>
  );
};

export default WhatsAppButton;
