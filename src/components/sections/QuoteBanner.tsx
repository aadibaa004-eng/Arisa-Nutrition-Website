import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { fadeInUp, floatingAnimation, rotateAnimation } from '../../utils/animations';

const QuoteBanner: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-blush-pink via-blush to-blush-pink overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-10 left-10 text-sage-green/20"
      >
        <Leaf className="w-24 h-24" />
      </motion.div>
      
      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
        className="absolute bottom-10 right-10 text-sage-green/20"
      >
        <Leaf className="w-32 h-32" />
      </motion.div>
      
      <motion.div
        animate={rotateAnimation}
        className="absolute top-1/2 left-1/4 text-muted-rose/20"
      >
        <span className="text-6xl">🥗</span>
      </motion.div>
      
      <motion.div
        animate={{ ...rotateAnimation, transition: { ...rotateAnimation.transition, delay: 2 } }}
        className="absolute top-1/3 right-1/4 text-muted-rose/20"
      >
        <span className="text-6xl">🍎</span>
      </motion.div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-800 mb-8 leading-tight">
            "Good nutrition today,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-green to-olive-green">
              better tomorrow
            </span>
            ."
          </h2>
          
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-sage-green" />
              <span className="text-gray-700 font-semibold">Real Food</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-sage-green" />
              <span className="text-gray-700 font-semibold">Real Results</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-sage-green" />
              <span className="text-gray-700 font-semibold">Real You</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteBanner;
