import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, ArrowRight } from 'lucide-react';
import { getBlogBySlug, getRelatedBlogs } from "../data/blogData";
import { fadeInUp, staggerContainer } from '../utils/animations';

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogBySlug(slug) : null;
  const relatedPosts = slug ? getRelatedBlogs(slug) : [];

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-sage-green hover:text-olive-green">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-cream">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-sage-green hover:text-olive-green mb-8 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </Link>

        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-12"
        >
          <span className="inline-block bg-sage-green/10 text-sage-green px-4 py-2 rounded-full text-sm font-semibold mb-6">
            {post.category}
          </span>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <button 
              className="flex items-center gap-2 text-sage-green hover:text-olive-green transition-colors"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                  });
                }
              }}
            >
              <Share2 className="w-5 h-5" />
              <span className="font-semibold">Share</span>
            </button>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-12 h-96 bg-gradient-to-br from-sage-green/20 to-blush-pink/20 rounded-3xl overflow-hidden"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-6xl">
                  {post.category === 'Recipes' ? '🥘' : post.category === 'Nutrition Tips' ? '📚' : '💚'}
                </span>
              </div>
              <p className="text-gray-500 font-medium">Featured Image Placeholder</p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="prose prose-lg max-w-none"
        >
          {/* Introduction */}
          <motion.div variants={fadeInUp} className="mb-10">
            <p className="text-lg text-gray-700 leading-relaxed">
              {post.content.introduction}
            </p>
          </motion.div>

          {/* Sections */}
          {post.content.sections.map((section, index) => (
            <motion.section key={index} variants={fadeInUp} className="mb-12">
              <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
                {section.heading}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {section.content}
              </p>
              
              {section.list && (
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <ul className="space-y-3">
                    {section.list.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <span className="w-6 h-6 rounded-full bg-sage-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sage-green text-sm font-bold">•</span>
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.section>
          ))}

          {/* Conclusion */}
          <motion.div variants={fadeInUp} className="mb-10 bg-gradient-to-r from-blush/30 to-sage-green/10 rounded-2xl p-8">
            <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">Conclusion</h3>
            <p className="text-gray-700 leading-relaxed">
              {post.content.conclusion}
            </p>
          </motion.div>
        </motion.div>

        {/* Author */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-12 bg-white rounded-3xl p-8 shadow-soft"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sage-green to-olive-green flex items-center justify-center text-white text-2xl font-bold">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-lg">{post.author}</p>
              <p className="text-gray-600">Certified Dietician & Nutrition Expert</p>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-20"
          >
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <motion.div
                  key={relatedPost.id}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all group"
                >
                  <div className="h-48 bg-gradient-to-br from-sage-green/20 to-blush-pink/20">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl">
                        {relatedPost.category === 'Recipes' ? '🥘' : relatedPost.category === 'Nutrition Tips' ? '📚' : '💚'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-sage-green uppercase tracking-wide">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-3 group-hover:text-sage-green transition-colors">
                      {relatedPost.title}
                    </h3>
                    <Link
                      to={`/blog/${relatedPost.slug}`}
                      className="inline-flex items-center gap-2 text-sage-green font-semibold text-sm group-hover:gap-3 transition-all"
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </article>
    </div>
  );
};

export default BlogDetailPage;
