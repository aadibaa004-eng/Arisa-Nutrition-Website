import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, CheckCircle, Phone, Mail, Instagram } from 'lucide-react';
import { trustIndicators, siteConfig } from '../../data/content';
import { fadeInUp, slideInLeft, slideInRight, floatingAnimation } from '../../utils/animations';

interface HeroProps {
  onBookConsultation: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookConsultation }) => {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-gradient-to-br from-cream via-white to-blush/30">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-sage-green/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blush-pink/20 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
          >
            <motion.p 
              className="text-sage-green font-semibold text-sm tracking-widest uppercase mb-4"
              variants={fadeInUp}
            >
              PERSONALIZED NUTRITION FOR A HEALTHIER YOU
            </motion.p>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-800 mb-6 leading-tight"
              variants={fadeInUp}
            >
              Rise your health{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-green to-olive-green">
                today
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl"
              variants={fadeInUp}
            >
              Personalized diet plans and lifestyle guidance designed to help you look better, feel stronger, 
              and live healthier—without extreme diets.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 mb-10"
              variants={fadeInUp}
            >
              <motion.a
                href={siteConfig.dietician.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.08,
                  boxShadow: '0 8px 30px rgba(34, 197, 94, 0.5)',
                  y: -3
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </motion.a>
              
              <motion.button
                onClick={onBookConsultation}
                whileHover={{ 
                  scale: 1.08,
                  boxShadow: '0 8px 30px rgba(217, 119, 146, 0.6)',
                  y: -3
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-pink to-muted-rose text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all"
              >
                Book a Consultation
              </motion.button>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={fadeInUp}
            >
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-sage-green flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{indicator}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Content - Image & Contact Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="relative"
          >
            <div className="relative">
              {/* Main Image Placeholder */}
              <div className="relative w-full h-[500px] rounded-3xl bg-gradient-to-br from-sage-green/20 to-blush-pink/20 overflow-hidden shadow-soft-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-5xl">🥗</span>
                    </div>
                    <p className="text-gray-500 font-medium">Healthy Bowl Image Placeholder</p>
                  </div>
                </div>
                
                {/* Floating Decorative Elements */}
                <motion.div
                  animate={floatingAnimation}
                  className="absolute top-10 right-10 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center"
                >
                  <span className="text-3xl">🍓</span>
                </motion.div>
                
                <motion.div
                  animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 0.5 } }}
                  className="absolute bottom-20 left-10 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center"
                >
                  <span className="text-2xl">🥑</span>
                </motion.div>
                
                <motion.div
                  animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
                  className="absolute top-1/2 left-5 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
                >
                  <span className="text-2xl">🍋</span>
                </motion.div>
              </div>
              
              {/* Glassmorphism Contact Card */}
              <motion.div
                animate={floatingAnimation}
                className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-100"
              >
                <h3 className="font-serif font-semibold text-lg text-gray-800 mb-1">
                  {siteConfig.name}
                </h3>
                <p className="text-sage-green font-semibold text-sm mb-3">
                  {siteConfig.dietician.name.toUpperCase()}
                </p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-sage-green" />
                    <span>{siteConfig.dietician.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-sage-green" />
                    <span className="text-xs">{siteConfig.dietician.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-sage-green" />
                    <span>{siteConfig.dietician.instagram}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
