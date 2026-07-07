import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, BookOpen, Search } from 'lucide-react';
import { cachedFetch } from '../utils/imageCache';
import { fadeInUp, staggerContainer } from '../utils/animations';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  author?: string;
  createdAt: string;
  published: boolean;
}

const BlogListPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    cachedFetch(`${API_BASE}/blogs`)
      .then((res: any) => {
        console.log('📰 Blogs API response:', JSON.stringify(res, null, 2));
        const list: BlogPost[] = Array.isArray(res) ? res
          : Array.isArray(res?.data) ? res.data
          : Array.isArray(res?.data?.blogs) ? res.data.blogs
          : Array.isArray(res?.blogs) ? res.blogs
          : [];
        console.log('📰 Parsed blogs:', list.length, '| Sample:', list[0]);
        const published = list.filter(p => p.published !== false);
        console.log('📰 Published blogs:', published.length);
        setPosts(published);
      })
      .catch((err) => { console.error('❌ Blogs fetch error:', err); setPosts([]); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter(p =>
    !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-[#fdf8f3] to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial="hidden" animate="visible" variants={fadeInUp}
          className="text-center mb-12"
        >
          <span className="inline-block text-sage-green font-semibold text-xs tracking-widest uppercase bg-sage-green/10 px-4 py-1.5 rounded-full mb-4">
            Nutrition Insights
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
            Our Blog
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Evidence-based nutrition tips, healthy habits and practical guidance for your wellness journey.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mb-10">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-sage-green focus:ring-1 focus:ring-sage-green shadow-sm"
            />
          </div>
        </motion.div>

        {/* Posts */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-20 mb-3" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-full mb-1" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{search ? 'No articles match your search.' : 'No articles published yet.'}</p>
          </div>
        ) : (
          <motion.div
            initial="hidden" animate="visible" variants={staggerContainer}
            className="space-y-4"
          >
            {filtered.map((post) => (
              <motion.article
                key={post._id}
                variants={fadeInUp}
                className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-sage-green/20 transition-all duration-300"
              >
                <Link to={`/blog/${post.slug}`} className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      {post.category && (
                        <span className="text-xs font-semibold text-sage-green bg-sage-green/10 px-2.5 py-0.5 rounded-full">
                          {post.category}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h2 className="text-xl font-serif font-bold text-gray-900 group-hover:text-sage-green transition-colors mb-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-xs text-gray-400 font-mono bg-gray-50 inline-block px-2 py-0.5 rounded mb-2">
                      /{post.slug}
                    </p>
                    {post.excerpt && (
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mt-1">
                        {post.excerpt}
                      </p>
                    )}
                    {post.author && (
                      <p className="text-xs text-gray-400 mt-3">by {post.author}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0 w-9 h-9 rounded-full border border-gray-200 group-hover:border-sage-green group-hover:bg-sage-green flex items-center justify-center transition-all mt-1">
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        {!loading && filtered.length > 0 && (
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="mt-16 bg-gradient-to-r from-sage-green to-olive-green rounded-2xl p-10 text-center text-white"
          >
            <h2 className="text-2xl font-serif font-bold mb-3">Want Personalised Nutrition Advice?</h2>
            <p className="text-white/80 mb-6 max-w-md mx-auto text-sm">
              Articles give general guidance. A personalised plan tailored to you delivers real results.
            </p>
            <Link
              to="/#contact"
              className="inline-block bg-white text-sage-green px-7 py-3 rounded-full font-semibold text-sm hover:scale-105 transition-transform shadow-md"
            >
              Book a Consultation
            </Link>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default BlogListPage;
