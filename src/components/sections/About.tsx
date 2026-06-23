import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';
import { qualifications } from '../../data/content';
import { fadeInUp, slideInLeft, slideInRight } from '../../utils/animations';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="relative"
          >
            <div className="relative w-full h-[600px] rounded-3xl bg-gradient-to-br from-blush-pink/30 to-sage-green/20 overflow-hidden shadow-soft-lg">
              {/* Image Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-40 h-40 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-6xl">👩‍⚕️</span>
                  </div>
                  <p className="text-gray-500 font-medium">Dt. Aadiba Photo Placeholder</p>
                </div>
              </div>
              
              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute top-8 right-8 bg-gradient-to-r from-muted-rose to-blush-pink text-white px-6 py-3 rounded-full shadow-lg"
              >
                <p className="font-semibold text-sm">Certified Dietician</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="absolute bottom-8 left-8 bg-white px-6 py-3 rounded-full shadow-lg"
              >
                <p className="font-semibold text-sm text-sage-green">Personalized Care</p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right - Content */}
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
              ABOUT ME
            </motion.p>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6 leading-tight"
              variants={fadeInUp}
            >
              Helping you build a better relationship with food
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 text-lg leading-relaxed mb-8"
              variants={fadeInUp}
            >
              I'm <strong>Dt. Aadiba Azeemuddin</strong>, a nutrition professional passionate about helping individuals 
              achieve their health goals through practical, sustainable, and personalized nutrition guidance. 
              My approach is simple: no starvation, no confusing rules, and no one-size-fits-all diet charts.
            </motion.p>
            
            {/* Qualifications */}
            <motion.div 
              className="mb-8 space-y-3"
              variants={fadeInUp}
            >
              {qualifications.map((qual, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sage-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-sage-green" />
                  </div>
                  <p className="text-gray-700">{qual}</p>
                </div>
              ))}
            </motion.div>
            
            {/* CTA */}
            <motion.button
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.08,
                boxShadow: '0 8px 30px rgba(122, 139, 111, 0.5)',
                y: -3
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-sage-green to-olive-green text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Award className="w-5 h-5" />
              Know More About Me
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
