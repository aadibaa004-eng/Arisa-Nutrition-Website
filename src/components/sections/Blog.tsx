import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '../../data/blogData';
import BlogCard from '../ui/BlogCard';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-blush/20 to-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Simple nutrition tips for everyday life
          </h2>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              category={post.category}
              description={post.excerpt}
              image={post.image}
              slug={post.slug}
            />
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <Link to="/blog">
            <motion.button
              whileHover={{ 
                scale: 1.08,
                borderColor: 'rgba(217, 119, 146, 0.6)',
                boxShadow: '0 8px 30px rgba(217, 119, 146, 0.3)',
                y: -3
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white text-rose-pink px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-rose-pink/20"
            >
              View All Blog Posts
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
