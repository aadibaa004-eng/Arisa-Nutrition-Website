import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../../data/content';

const FloatingWhatsAppButton: React.FC = () => {
  return (
    <motion.a
      href={siteConfig.dietician.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-green-500 to-green-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:shadow-green-500/50 transition-all group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
      
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute inset-0 bg-green-500 rounded-full"
      />
    </motion.a>
  );
};

export default FloatingWhatsAppButton;
