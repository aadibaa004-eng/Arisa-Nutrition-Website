import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { scaleIn } from '../../utils/animations';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon }) => {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        boxShadow: '0 0 30px rgba(122, 139, 111, 0.3)'
      }}
      className="bg-white rounded-2xl p-8 text-center shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer group"
    >
      <motion.div 
        className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-sage-green to-olive-green rounded-full flex items-center justify-center"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="w-10 h-10 text-white" />
      </motion.div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-olive-green transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default ServiceCard;
