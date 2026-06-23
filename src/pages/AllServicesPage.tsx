import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { servicesData } from "../data/servicesData";
import { services } from "../data/content";
import { fadeInUp, staggerContainer } from "../utils/animations";

const AllServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-cream to-blush/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <p className="text-sage-green font-semibold text-sm tracking-widest uppercase mb-4">
            COMPREHENSIVE NUTRITION SERVICES
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-6">
            Expert Guidance for Every Health Goal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From weight management to specialized nutrition therapy, we offer personalized plans
            designed to help you achieve lasting health and wellness.
          </p>
        </motion.div>

        {/* Services Grid - Detailed */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          {servicesData.map((service) => {
            const IconComponent = services.find(s => s.id === service.id)?.icon;
            
            return (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 group"
              >
                {/* Image */}
                <div className="h-64 bg-gradient-to-br from-sage-green/20 to-blush-pink/20 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                        {IconComponent && <IconComponent className="w-12 h-12 text-sage-green" />}
                      </div>
                      <p className="text-gray-500 font-medium text-sm">Service Image</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h2 className="text-2xl font-serif font-bold text-gray-800 mb-3 group-hover:text-sage-green transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed line-clamp-3">
                    {service.overview}
                  </p>

                  {/* Quick Benefits */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Key Benefits:</p>
                    <ul className="space-y-1">
                      {service.benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-sage-green mt-1">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sage-green font-semibold hover:gap-3 transition-all group-hover:text-olive-green"
                  >
                    Learn More & Book Consultation
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Services Note */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-gradient-to-r from-sage-green to-olive-green rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-serif font-bold mb-4">
            Looking for Something Else?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            We also offer specialized plans for thyroid care, gut health, pregnancy nutrition,
            sports nutrition, and more. Get in touch to discuss your specific needs.
          </p>
          <Link
            to="/#contact"
            className="inline-block bg-white text-sage-green px-8 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AllServicesPage;
