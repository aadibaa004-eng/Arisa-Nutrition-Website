import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeInUp } from '../../utils/animations';

interface BlogCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, category, description, image, slug }) => {
  return (
    <Link to={`/blog/${slug}`}>
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -8 }}
        className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer group"
      >
        <div className="h-56 bg-gradient-to-br from-sage-green/20 to-blush-pink/20 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        
        <div className="p-6">
          <span className="text-xs font-semibold text-sage-green uppercase tracking-wide">
            {category}
          </span>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-3 group-hover:text-olive-green transition-colors">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {description}
          </p>
          
          <span className="inline-flex items-center gap-2 text-sage-green font-semibold text-sm group-hover:gap-3 transition-all">
            Read More 
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default BlogCard;
