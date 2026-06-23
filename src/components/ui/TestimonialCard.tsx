import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { fadeInUp } from '../../utils/animations';

interface TestimonialCardProps {
  name: string;
  rating: number;
  text: string;
  avatar: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, rating, text, avatar }) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 h-full"
    >
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-muted-rose text-muted-rose" />
        ))}
      </div>
      
      <p className="text-gray-700 mb-6 leading-relaxed italic">
        "{text}"
      </p>
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blush-pink to-muted-rose flex items-center justify-center overflow-hidden">
          <img 
            src={avatar} 
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `<span class="text-white font-semibold">${name.charAt(0)}</span>`;
            }}
          />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{name}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
