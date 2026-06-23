import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from "../data/blogData";
import { fadeInUp, staggerContainer } from "../utils/animations";

const BlogListPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-blush/20 to-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <p className="text-sage-green font-semibold text-sm tracking-widest uppercase mb-4">
            NUTRITION INSIGHTS & TIPS
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-6">
            Our Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Evidence-based nutrition advice, healthy recipes, and practical tips to help you
            on your wellness journey.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-12"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={fadeInUp}
              className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 group"
            >
              <div className="grid md:grid-cols-5 gap-8">
                {/* Image */}
                <div className="md:col-span-2 h-80 md:h-auto bg-gradient-to-br from-sage-green/20 to-blush-pink/20">
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-6xl">
                          {post.category === 'Recipes' ? '🥘' : post.category === 'Nutrition Tips' ? '📚' : '💚'}
                        </span>
                      </div>
                      <p className="text-gray-500 font-medium">Blog Image</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-3 p-8">
                  <span className="inline-block bg-sage-green/10 text-sage-green px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    {post.category}
                  </span>

                  <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4 group-hover:text-sage-green transition-colors">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sage-green font-semibold hover:gap-3 transition-all group-hover:text-olive-green"
                  >
                    Read Full Article
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-20 bg-gradient-to-r from-sage-green to-olive-green rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-serif font-bold mb-4">
            Want Personalized Nutrition Advice?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            While these articles provide general guidance, personalized nutrition plans
            tailored to your unique needs deliver the best results.
          </p>
          <Link
            to="/#contact"
            className="inline-block bg-white text-sage-green px-8 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Book a Consultation
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogListPage;
