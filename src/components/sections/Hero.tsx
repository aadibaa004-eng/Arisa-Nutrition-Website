import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Instagram, ArrowRight, Sparkles } from 'lucide-react';
import { trustIndicators, siteConfig } from '../../data/content';
import { fadeInUp, slideInLeft, slideInRight, floatingAnimation } from '../../utils/animations';

interface HeroProps {
  onBookConsultation: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookConsultation }) => {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdf8f3] via-white to-[#fdf0f3]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-sage-green/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blush-pink/15 to-transparent rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[calc(100vh-7rem)]">
          
          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="py-8"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-sage-green/10 border border-sage-green/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-sage-green" />
              <span className="text-sage-green font-semibold text-xs tracking-widest uppercase">Personalized Nutrition</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-serif font-bold text-gray-900 mb-6 leading-[1.1]"
              variants={fadeInUp}
            >
              Transform your{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-green via-olive-green to-sage-green">
                  health
                </span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6C50 2 150 2 198 6" stroke="url(#underline)" strokeWidth="2.5" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="underline" x1="0" y1="0" x2="200" y2="0">
                      <stop stopColor="#9CAF88"/>
                      <stop offset="1" stopColor="#6B8F5E"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              {' '}from within
            </motion.h1>

            <motion.p
              className="text-gray-500 text-base sm:text-lg mb-8 leading-relaxed max-w-lg"
              variants={fadeInUp}
            >
              Personalized diet plans and lifestyle guidance designed to help you look better, feel stronger,
              and live healthier—without extreme diets.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10" variants={fadeInUp}>
              <motion.button
                onClick={onBookConsultation}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-pink to-muted-rose text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-rose-pink/30 hover:shadow-xl hover:shadow-rose-pink/40 transition-all"
              >
                Book a Free Consultation
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.a
                href="#about"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-sage-green hover:text-sage-green transition-all shadow-sm"
              >
                Learn More
              </motion.a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div className="grid grid-cols-2 gap-3" variants={fadeInUp}>
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-sage-green/15 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-sage-green" />
                  </div>
                  <span className="text-gray-600 text-sm font-medium">{indicator}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Decorative ring */}
              <div className="absolute -inset-4 bg-gradient-to-br from-sage-green/20 to-blush-pink/20 rounded-[2.5rem] blur-2xl" />

              {/* Main Image */}
              <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[520px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
                  alt="Healthy diet bowl with fresh vegetables and grains"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Floating Emoji Badges */}
              <motion.div animate={floatingAnimation}
                className="hidden sm:flex absolute top-8 -right-6 w-14 h-14 bg-white rounded-2xl shadow-xl items-center justify-center rotate-6">
                <span className="text-2xl">🍓</span>
              </motion.div>
              <motion.div animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 0.6 } }}
                className="hidden sm:flex absolute bottom-24 -left-6 w-12 h-12 bg-white rounded-2xl shadow-xl items-center justify-center -rotate-6">
                <span className="text-xl">🥑</span>
              </motion.div>
              <motion.div animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1.2 } }}
                className="hidden sm:flex absolute top-1/2 -right-5 w-12 h-12 bg-white rounded-2xl shadow-xl items-center justify-center rotate-3">
                <span className="text-xl">🍋</span>
              </motion.div>

              {/* Stats badge */}
              <motion.div
                animate={floatingAnimation}
                className="hidden sm:block absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sage-green/10 rounded-xl flex items-center justify-center">
                    <span className="text-xl">⭐</span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-sm">100+ Clients</p>
                    <p className="text-gray-400 text-xs">Transformed lives</p>
                  </div>
                </div>
              </motion.div>

              {/* Contact Card */}
              <motion.div
                animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 0.4 } }}
                className="hidden sm:block absolute -top-5 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
              >
                <p className="text-gray-900 font-bold text-sm">{siteConfig.dietician.name}</p>
                <p className="text-sage-green text-xs font-semibold mb-2">Certified Dietician</p>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Mail className="w-3 h-3 text-sage-green" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Instagram className="w-3 h-3 text-sage-green" />
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
