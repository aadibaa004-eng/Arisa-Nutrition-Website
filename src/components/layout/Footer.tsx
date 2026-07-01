import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Instagram, Mail } from 'lucide-react';
import { footerLinks, siteConfig } from '../../data/content';
import { fadeInUp } from '../../utils/animations';

const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-blush/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-sage-green" />
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-800">
                  {siteConfig.name}
                </h3>
                <p className="text-xs text-sage-green font-semibold tracking-widest">
                  {siteConfig.tagline}
                </p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Personalized nutrition guidance for a healthier, happier, and more confident you.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-gray-600 hover:text-sage-green transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <p className="font-semibold text-gray-700">{siteConfig.dietician.name}</p>
              
              <a 
                href={`mailto:${siteConfig.dietician.email}`}
                className="flex items-center gap-2 text-gray-600 hover:text-sage-green transition-colors"
              >
                <Mail className="w-4 h-4" />
                {siteConfig.dietician.email}
              </a>
              
              <a 
                href={`https://instagram.com/${siteConfig.dietician.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-sage-green transition-colors"
              >
                <Instagram className="w-4 h-4" />
                {siteConfig.dietician.instagram}
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <motion.a
                href={`https://instagram.com/${siteConfig.dietician.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gradient-to-br from-muted-rose to-blush-pink rounded-full flex items-center justify-center text-white"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              
              <motion.a
                href={`mailto:${siteConfig.dietician.email}`}
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-sage-green rounded-full flex items-center justify-center text-white"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-300 pt-8 mb-8">
          <p className="text-xs text-gray-500 leading-relaxed max-w-4xl">
            <strong>Disclaimer:</strong> The information provided on this website is for general nutrition education and guidance only. 
            It is not intended to diagnose, treat, cure, or prevent any disease. Please consult a qualified medical professional for medical concerns.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-600 text-sm">
          <p>© 2026 {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
