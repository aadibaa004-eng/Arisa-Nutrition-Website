import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { services } from '../../data/content';
import ServiceCard from '../ui/ServiceCard';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-br from-cream to-blush/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <p className="text-sage-green font-semibold text-sm tracking-widest uppercase mb-4">
            WHAT I OFFER
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Nutrition plans for every goal
          </h2>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <Link to="/services">
            <motion.button
              whileHover={{ 
                scale: 1.08,
                borderColor: 'rgba(122, 139, 111, 0.6)',
                boxShadow: '0 8px 30px rgba(156, 175, 136, 0.3)',
                y: -3
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white text-sage-green px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-sage-green/20"
            >
              Explore All Services
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
