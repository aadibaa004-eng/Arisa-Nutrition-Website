import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, HelpCircle } from 'lucide-react';
import { getServiceBySlug } from "../data/servicesData";
import { fadeInUp, staggerContainer } from "../utils/animations";

interface ServiceDetailPageProps {
  onBookConsultation: () => void;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ onBookConsultation }) => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : null;

  if (!service) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">Service Not Found</h1>
          <Link to="/services" className="text-sage-green hover:text-olive-green">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/services" 
          className="inline-flex items-center gap-2 text-sage-green hover:text-olive-green mb-8 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to All Services
        </Link>

        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-4">
            {service.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">{service.shortDescription}</p>
          
          <div className="h-96 bg-gradient-to-br from-sage-green/20 to-blush-pink/20 rounded-3xl overflow-hidden mb-8">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-6xl">{service.id === 1 ? '⚖️' : service.id === 2 ? '💪' : service.id === 3 ? '💗' : '🩺'}</span>
                </div>
                <p className="text-gray-500 font-medium">Service Image Placeholder</p>
              </div>
            </div>
          </div>

          <motion.button
            onClick={onBookConsultation}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(217, 119, 146, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-rose-pink to-muted-rose text-white px-8 py-4 rounded-full font-semibold shadow-lg"
          >
            Book Consultation for {service.title}
          </motion.button>
        </motion.div>

        {/* Overview */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{service.overview}</p>
        </motion.section>

        {/* Who Is It For */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16 bg-white rounded-3xl p-8 shadow-soft"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">Who Is This For?</h2>
          <div className="space-y-3">
            {service.whoIsItFor.map((item, index) => (
              <motion.div key={index} variants={fadeInUp} className="flex items-start gap-3">
                <Check className="w-6 h-6 text-sage-green flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Benefits */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">Benefits</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {service.benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-soft"
              >
                <Check className="w-5 h-5 text-rose-pink flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Our Approach */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">Our Approach</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {service.approach.map((step, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="bg-gradient-to-br from-blush/30 to-sage-green/10 rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-700 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* What to Expect */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16 bg-white rounded-3xl p-8 shadow-soft"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">What to Expect</h2>
          <div className="space-y-3">
            {service.whatToExpect.map((item, index) => (
              <motion.div key={index} variants={fadeInUp} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sage-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-sage-green" />
                </div>
                <p className="text-gray-700">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQs */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {service.faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 shadow-soft"
              >
                <div className="flex items-start gap-3 mb-3">
                  <HelpCircle className="w-6 h-6 text-rose-pink flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed pl-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-gradient-to-br from-sage-green to-olive-green rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-serif font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Book your consultation today and take the first step towards better health.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              onClick={onBookConsultation}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-sage-green px-8 py-4 rounded-full font-semibold shadow-lg"
            >
              Book a Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
