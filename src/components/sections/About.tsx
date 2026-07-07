import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Mail, Instagram } from 'lucide-react';
import { qualifications, siteConfig } from '../../data/content';
import { fadeInUp, slideInLeft, slideInRight, floatingAnimation } from '../../utils/animations';
import { cachedFetch, optimizeCloudinaryUrl } from '../../utils/imageCache';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const About: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    cachedFetch(`${API_BASE}/gallery`)
      .then((res: any) => {
        const list: any[] = Array.isArray(res) ? res
          : Array.isArray(res?.data) ? res.data
          : Array.isArray(res?.images) ? res.images
          : [];
        const match = list.find((item: any) =>
          item.caption?.toLowerCase().includes('aadiba') ||
          item.caption?.toLowerCase().includes('dt.')
        );
        if (match) {
          const raw = match.image || match.url || match.imageUrl;
          setProfileImage(optimizeCloudinaryUrl(raw, 600));
        }
      })
      .catch(() => {});
  }, []);
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
            <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[600px] rounded-3xl bg-gradient-to-br from-blush-pink/30 to-sage-green/20 overflow-hidden shadow-soft-lg">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Dt. Aadiba Azeemuddin"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  decoding="async"
                />
              ) : (
                /* Placeholder until image loads */
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-40 h-40 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-6xl">👩‍⚕️</span>
                    </div>
                    <p className="text-gray-500 font-medium">Dt. Aadiba Azeemuddin</p>
                  </div>
                </div>
              )}
              
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

            {/* Floating dietician card */}
            <motion.div
              animate={floatingAnimation}
              className="hidden sm:block absolute -top-5 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 z-10"
            >
              <p className="text-gray-900 font-bold text-sm">{siteConfig.dietician.name}</p>
              <p className="text-sage-green text-xs font-semibold mb-2">Certified Dietician</p>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Mail className="w-3 h-3 text-sage-green" />
                  <span>{siteConfig.dietician.email}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Instagram className="w-3 h-3 text-sage-green" />
                  <span>{siteConfig.dietician.instagram}</span>
                </div>
              </div>
            </motion.div>
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
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6 leading-tight"
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
