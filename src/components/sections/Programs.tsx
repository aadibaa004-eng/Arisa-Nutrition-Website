import React from 'react';
import { motion } from 'framer-motion';
import { programs } from '../../data/content';
import PricingCard from '../ui/PricingCard';
import { fadeInUp, staggerContainer } from '../../utils/animations';

interface ProgramsProps {
  onBookConsultation: () => void;
}

const Programs: React.FC<ProgramsProps> = ({ onBookConsultation }) => {
  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <p className="text-sage-green font-semibold text-sm tracking-widest uppercase mb-4">
            CHOOSE YOUR PLAN
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Guidance that fits your health journey
          </h2>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {programs.map((program) => (
            <PricingCard
              key={program.id}
              title={program.title}
              features={program.features}
              cta={program.cta}
              popular={program.popular}
              onBook={onBookConsultation}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Programs;
