import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { whyChoosePoints, testimonials } from '../../data/content';
import TestimonialCard from '../ui/TestimonialCard';
import { fadeInUp, slideInLeft, slideInRight } from '../../utils/animations';

const WhyChooseTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerPage = 3;
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => 
      prev + testimonialsPerPage >= testimonials.length ? 0 : prev + 1
    );
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, testimonials.length - testimonialsPerPage) : prev - 1
    );
  };
  
  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + testimonialsPerPage
  );

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Why Choose */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-8 leading-tight">
              It's not a diet, it's a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-green to-olive-green">
                lifestyle transformation
              </span>
              .
            </h2>
            
            <div className="space-y-4">
              {whyChoosePoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-sage-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-sage-green" />
                  </div>
                  <p className="text-gray-700 text-lg">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right - Testimonials */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
          >
            <motion.p 
              className="text-sage-green font-semibold text-sm tracking-widest uppercase mb-4"
              variants={fadeInUp}
            >
              CLIENT LOVE
            </motion.p>
            
            <motion.h3 
              className="text-3xl font-serif font-bold text-gray-800 mb-8"
              variants={fadeInUp}
            >
              Real stories. Real results.
            </motion.h3>
            
            {/* Testimonial Carousel */}
            <div className="relative">
              <div className="grid gap-6 mb-6">
                {visibleTestimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    name={testimonial.name}
                    rating={testimonial.rating}
                    text={testimonial.text}
                    avatar={testimonial.avatar}
                  />
                ))}
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  onClick={prevTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-sage-green text-white flex items-center justify-center shadow-lg hover:bg-olive-green transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                
                <div className="flex gap-2">
                  {Array.from({ length: Math.ceil(testimonials.length / testimonialsPerPage) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index * testimonialsPerPage)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        Math.floor(currentIndex / testimonialsPerPage) === index
                          ? 'bg-sage-green w-8'
                          : 'bg-gray-300'
                      }`}
                      aria-label={`Go to testimonial set ${index + 1}`}
                    />
                  ))}
                </div>
                
                <motion.button
                  onClick={nextTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-sage-green text-white flex items-center justify-center shadow-lg hover:bg-olive-green transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseTestimonials;
