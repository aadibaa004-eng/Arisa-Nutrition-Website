import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { scaleIn } from '../../utils/animations';

interface PricingCardProps {
  title: string;
  features: string[];
  cta: string;
  popular?: boolean;
  onBook: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, features, cta, popular, onBook }) => {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -10 }}
      className={`bg-white rounded-3xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 relative ${
        popular ? 'border-2 border-muted-rose' : ''
      }`}
    >
      {popular && (
        <motion.div 
          className="absolute -top-4 left-1/2 -translate-x-1/2"
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <div className="bg-gradient-to-r from-rose-pink to-muted-rose text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            Most Popular
          </div>
        </motion.div>
      )}
      
      <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-2 text-center">
        {title}
      </h3>
      
      <p className="text-center text-gray-600 mb-6">Contact for Pricing</p>
      
      <div className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-sage-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-sage-green" />
            </div>
            <p className="text-gray-700 text-sm">{feature}</p>
          </div>
        ))}
      </div>
      
      <motion.button
        onClick={onBook}
        whileHover={{ 
          scale: 1.06,
          y: -3,
          boxShadow: popular 
            ? '0 10px 35px rgba(217, 119, 146, 0.5)'
            : '0 10px 35px rgba(122, 139, 111, 0.4)'
        }}
        whileTap={{ scale: 0.95 }}
        animate={popular ? {
          boxShadow: [
            '0 8px 25px rgba(217, 119, 146, 0.3)',
            '0 10px 30px rgba(217, 119, 146, 0.5)',
            '0 8px 25px rgba(217, 119, 146, 0.3)'
          ]
        } : {}}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }}
        className={`w-full py-4 rounded-full font-semibold transition-all duration-300 ${
          popular
            ? 'bg-gradient-to-r from-rose-pink to-muted-rose text-white shadow-lg hover:shadow-xl'
            : 'bg-sage-green text-white hover:bg-olive-green'
        }`}
      >
        {cta}
      </motion.button>
    </motion.div>
  );
};

export default PricingCard;
