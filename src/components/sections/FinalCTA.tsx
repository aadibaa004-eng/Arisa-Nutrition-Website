import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Leaf } from 'lucide-react';
import { fadeInUp, floatingAnimation } from '../../utils/animations';

interface FinalCTAProps {
  onBookConsultation: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onBookConsultation }) => {
  return (
    <section id="contact" className="relative py-24 bg-gradient-to-br from-dark-olive via-olive-green to-dark-olive overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-10 left-10 opacity-20"
      >
        <Leaf className="w-32 h-32 text-white" />
      </motion.div>
      
      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
        className="absolute bottom-10 right-10 opacity-20"
      >
        <span className="text-8xl">🥬</span>
      </motion.div>
      
      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 0.5 } }}
        className="absolute top-1/2 right-1/4 opacity-10"
      >
        <span className="text-7xl">🥗</span>
      </motion.div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-16 h-16 text-blush-pink" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Your healthiest chapter starts today.
          </h2>
          
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            You don't need a perfect diet. You need a plan that works for your life.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              onClick={onBookConsultation}
              whileHover={{ 
                scale: 1.1, 
                boxShadow: '0 0 50px rgba(217, 119, 146, 0.8)',
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: [
                  '0 0 25px rgba(217, 119, 146, 0.5)',
                  '0 0 40px rgba(217, 119, 146, 0.7)',
                  '0 0 25px rgba(217, 119, 146, 0.5)',
                ],
                y: [0, -8, 0]
              }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity },
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="bg-gradient-to-r from-rose-pink to-muted-rose text-white px-10 py-5 rounded-full font-semibold text-lg shadow-2xl"
            >
              Book a Consultation
            </motion.button>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
