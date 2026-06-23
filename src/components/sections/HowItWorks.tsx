import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const steps = [
  {
    id: 1,
    title: 'Book Your Consultation',
    description: 'Choose a convenient time through WhatsApp or the booking form.',
  },
  {
    id: 2,
    title: 'Share Your Health Details',
    description: 'Fill out a short health and lifestyle questionnaire.',
  },
  {
    id: 3,
    title: 'Attend Your Consultation',
    description: 'Discuss your goals, routine, food preferences, and challenges.',
  },
  {
    id: 4,
    title: 'Receive Your Personalized Plan',
    description: 'Get a practical nutrition plan tailored to your lifestyle.',
  },
  {
    id: 5,
    title: 'Track Progress and Improve',
    description: 'Receive follow-ups, support, and adjustments when needed.',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Your journey to better health starts here
          </h2>
        </motion.div>
        
        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-sage-green via-olive-green to-sage-green -translate-y-1/2" />
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-5 gap-4 relative"
          >
            {steps.map((step) => (
              <motion.div
                key={step.id}
                variants={fadeInUp}
                className="relative"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-sage-green to-olive-green text-white flex items-center justify-center font-bold text-2xl mb-4 shadow-lg relative z-10"
                  >
                    {step.id}
                  </motion.div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all text-center">
                    <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Mobile Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="lg:hidden space-y-8"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={fadeInUp}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-sage-green to-olive-green text-white flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0"
                >
                  {step.id}
                </motion.div>
                {step.id < steps.length && (
                  <div className="w-1 flex-1 bg-gradient-to-b from-sage-green to-olive-green my-2" />
                )}
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-soft flex-1">
                <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
