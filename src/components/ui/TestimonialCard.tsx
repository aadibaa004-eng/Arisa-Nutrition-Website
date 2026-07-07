import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { fadeInUp } from '../../utils/animations';

interface TestimonialCardProps {
  name: string;
  rating: number;
  text: string;
  avatar: string;
  result?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, rating, text, avatar, result }) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 h-full border border-gray-100 flex flex-col min-w-[300px]"
    >
      {/* Quote icon + stars */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-9 h-9 bg-sage-green/10 rounded-xl flex items-center justify-center">
          <Quote className="w-4 h-4 text-sage-green fill-sage-green" />
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
          ))}
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed text-sm flex-1 mb-5">
        "{text}"
      </p>

      {/* Result badge */}
      {result && (
        <div className="inline-flex items-center gap-1.5 bg-sage-green/10 text-sage-green text-xs font-semibold px-3 py-1 rounded-full mb-4 self-start">
          <span>✓</span> {result}
        </div>
      )}

      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-green/30 to-blush-pink/30 flex items-center justify-center overflow-hidden flex-shrink-0">
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const initial = name && name.length > 0 ? name.charAt(0) : 'C';
              target.parentElement!.innerHTML = `<span class="text-gray-600 font-bold text-sm">${initial}</span>`;
            }}
          />
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">{name || 'Anonymous'}</p>
          <p className="text-gray-400 text-xs">Verified Client</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
