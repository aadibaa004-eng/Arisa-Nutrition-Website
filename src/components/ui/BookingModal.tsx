import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { api } from '../../services/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    goal: '',
    consultationType: 'one-time',
    message: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await api.contact.submit(formData);
      void res;
      
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setFormData({
          name: '',
          phone: '',
          email: '',
          goal: '',
          consultationType: 'one-time',
          message: '',
        });
      }, 2000);
    } catch (err: any) {
      console.error('❌ Contact form error:', err);
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-2xl w-full max-h-[92vh] overflow-y-auto relative shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-gray-800 mb-2">
                Book Your Consultation
              </h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below and we'll get back to you shortly.
              </p>
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm"
                >
                  {error}
                </motion.div>
              )}
              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-sage-green/10 border-2 border-sage-green rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-sage-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                  <p className="text-gray-600">Your consultation request has been submitted. We'll contact you soon!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 outline-none transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 outline-none transition-all"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="goal" className="block text-sm font-semibold text-gray-700 mb-2">
                      Health Goal *
                    </label>
                    <input
                      type="text"
                      id="goal"
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 outline-none transition-all"
                      placeholder="e.g., Weight loss, PCOS management, etc."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="consultationType" className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Consultation Type *
                    </label>
                    <select
                      id="consultationType"
                      name="consultationType"
                      value={formData.consultationType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 outline-none transition-all"
                    >
                      <option value="one-time">One-Time Consultation</option>
                      <option value="4-week">4-Week Nutrition Program</option>
                      <option value="8-week">8-Week Transformation Program</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Additional Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 outline-none transition-all resize-none"
                      placeholder="Tell us more about your needs..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { 
                      scale: 1.04,
                      boxShadow: '0 10px 35px rgba(217, 119, 146, 0.5)'
                    } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className="w-full bg-gradient-to-r from-rose-pink to-muted-rose text-white py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Consultation Request'}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
