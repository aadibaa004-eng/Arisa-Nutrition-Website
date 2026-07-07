import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { blogPosts as fallbackPosts } from '../../data/blogData';
import { cachedFetch } from '../../utils/imageCache';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

interface LiveBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  createdAt: string;
  published: boolean;
}

const Blog: React.FC = () => {
  const [livePosts, setLivePosts] = useState<LiveBlog[]>([]);

  useEffect(() => {
    cachedFetch(`${API_BASE}/blogs`)
      .then((res: any) => {
        const list: LiveBlog[] = Array.isArray(res) ? res
          : Array.isArray(res?.data) ? res.data
          : Array.isArray(res?.blogs) ? res.blogs
          : [];
        const published = list.filter(p => p.published !== false);
        if (published.length > 0) setLivePosts(published.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  // Use live posts if available, else fall back to hardcoded (max 3)
  // Normalize fallback posts to match LiveBlog shape
  const normalizedFallback: LiveBlog[] = fallbackPosts.slice(0, 3).map(p => ({
    _id: String(p.id),
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    category: p.category,
    createdAt: p.date,
    published: true,
  }));
  const displayPosts: LiveBlog[] = livePosts.length > 0 ? livePosts : normalizedFallback;

  return (
    <section id="blog" className="py-24 bg-gradient-to-b from-[#fdf8f3] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <span className="inline-block text-sage-green font-semibold text-xs tracking-widest uppercase bg-sage-green/10 px-4 py-1.5 rounded-full mb-4">
            From the Blog
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Simple nutrition tips for everyday life
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Practical, evidence-based advice to help you eat better and feel your best.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 mb-10"
        >
          {displayPosts.map((post) => (
            <motion.article
              key={post._id}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Color banner */}
              <div className="h-36 bg-gradient-to-br from-sage-green/20 to-blush-pink/20 flex items-center justify-center">
                <span className="text-5xl">
                  {post.category === 'Recipes' ? '🥘' : post.category === 'Nutrition Tips' ? '📚' : '🌿'}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  {post.category && (
                    <span className="text-xs font-semibold text-sage-green bg-sage-green/10 px-2.5 py-0.5 rounded-full">
                      {post.category}
                    </span>
                  )}
                  <span className="text-xs text-gray-400 ml-auto">
                    {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-gray-900 group-hover:text-sage-green transition-colors mb-2 leading-snug line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                )}
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sage-green text-sm font-semibold hover:gap-2.5 transition-all"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <Link to="/blog">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-white text-sage-green px-8 py-4 rounded-full font-semibold shadow-md border-2 border-sage-green/20 hover:border-sage-green transition-all"
            >
              View All Articles
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Blog;
