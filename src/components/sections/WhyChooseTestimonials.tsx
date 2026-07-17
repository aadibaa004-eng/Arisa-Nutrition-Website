import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { whyChoosePoints, testimonials as fallbackTestimonials } from '../../data/content';
import TestimonialCard from '../ui/TestimonialCard';
import { fadeInUp, slideInLeft } from '../../utils/animations';
import { cachedFetch } from '../../utils/imageCache';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

interface LiveReview {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  approved: boolean;
}

const WhyChooseTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liveReviews, setLiveReviews] = useState<LiveReview[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cachedFetch(`${API_BASE}/reviews`)
      .then((res: any) => {
        const list: LiveReview[] = Array.isArray(res) ? res
          : Array.isArray(res?.data) ? res.data
          : Array.isArray(res?.reviews) ? res.reviews
          : [];
        const approved = list.filter(r => r.approved !== false);
        // Normalize field names: API may use 'clientName'/'review' or 'name'/'comment'
        const normalized = approved.map(r => ({
          ...r,
          name: (r as any).clientName || r.name || 'Client',
          comment: (r as any).review || r.comment || '',
        }));
        if (normalized.length > 0) setLiveReviews(normalized);
      })
      .catch(() => {});
  }, []);

  // Use live reviews if available, else fall back to hardcoded
  const displayItems = liveReviews.length > 0
    ? liveReviews.map((r) => ({
        id: r._id,
        name: r.name,
        rating: r.rating,
        text: r.comment,
        avatar: '',
      }))
    : fallbackTestimonials.map((t) => ({ ...t }));

  const scroll = (dir: 'left' | 'right') => {
    const next = dir === 'right'
      ? (currentIndex + 1) % displayItems.length
      : (currentIndex - 1 + displayItems.length) % displayItems.length;
    setCurrentIndex(next);
    if (scrollRef.current) {
      const card = scrollRef.current.children[next] as HTMLElement;
      card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-[#fdf8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="inline-block text-sage-green font-semibold text-xs tracking-widest uppercase bg-sage-green/10 px-4 py-1.5 rounded-full mb-4">
            Client Love
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Real stories.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-green to-olive-green">Real results.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Join 100+ clients who transformed their health with personalized nutrition.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeInUp}
          className="grid grid-cols-2 gap-3 mb-12"
        >
          {[
            { value: '100+', label: 'Happy Clients' },
            { value: '4.9★', label: 'Average Rating' },
            { value: '95%', label: 'Success Rate' },
            { value: '3+', label: 'Years Experience' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Two column: Why Choose + Testimonials carousel */}
        <div className="flex flex-col gap-16">

          {/* Why Choose */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={slideInLeft}
          >
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8 leading-tight text-center">
              It's not a diet, it's a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-green to-olive-green">
                lifestyle transformation
              </span>.
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {whyChoosePoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="w-6 h-6 rounded-full bg-sage-green flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="text-gray-700">{point}</p>
                </motion.div>
              ))}
            </div>

            {/* Average rating display */}
            <div className="flex items-center gap-3 bg-amber-50 rounded-2xl p-4 border border-amber-100 max-w-xs mx-auto">
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-gray-700 text-sm font-medium">Rated 4.9/5 by 100+ clients</p>
              </div>
            </div>
          </motion.div>

          {/* Horizontal Testimonial Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Scrollable cards */}
            <div
                          ref={scrollRef}
              className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {displayItems.map((item) => (
                <div key={item.id} className="snap-center flex-shrink-0 w-[300px]">
                  <TestimonialCard
                    name={item.name}
                    rating={item.rating}
                    text={item.text}
                    avatar={item.avatar}
                  />
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {displayItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      const card = scrollRef.current?.children[index] as HTMLElement;
                      card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === index ? 'w-8 bg-sage-green' : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll('left')}
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-sage-green hover:text-sage-green transition-colors shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="w-10 h-10 rounded-full bg-sage-green text-white flex items-center justify-center hover:bg-olive-green transition-colors shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseTestimonials;
