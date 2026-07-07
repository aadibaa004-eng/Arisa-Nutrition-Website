import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Share2, ArrowRight, Loader } from 'lucide-react';
import { cachedFetch } from '../utils/imageCache';
import { fadeInUp, staggerContainer } from '../utils/animations';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

interface LiveBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author?: string;
  createdAt: string;
  published: boolean;
}

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<LiveBlog | null>(null);
  const [related, setRelated] = useState<LiveBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    // Try fetching by slug directly, fallback to list + filter
    cachedFetch(`${API_BASE}/blogs/${slug}`)
      .then((res: any) => {
        const p: LiveBlog = res?.data ?? res;
        if (p?._id) {
          setPost(p);
        } else {
          throw new Error('not found');
        }
      })
      .catch(() => {
        // Fallback: get all and find by slug
        cachedFetch(`${API_BASE}/blogs`).then((res: any) => {
          const list: LiveBlog[] = Array.isArray(res) ? res
            : Array.isArray(res?.data) ? res.data
            : Array.isArray(res?.blogs) ? res.blogs
            : [];
          const found = list.find(b => b.slug === slug);
          setPost(found ?? null);
          setRelated(list.filter(b => b.slug !== slug && b.published !== false).slice(0, 2));
        }).catch(() => setPost(null));
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <Loader className="w-8 h-8 text-sage-green animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#fdf8f3]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">Article Not Found</h1>
          <p className="text-gray-500 mb-6">This article may have been removed or the link is incorrect.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sage-green font-semibold hover:text-olive-green">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-[#fdf8f3] to-white">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-sage-green hover:text-olive-green mb-8 font-semibold transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Header */}
        <motion.header initial="hidden" animate="visible" variants={fadeInUp} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            {post.category && (
              <span className="text-xs font-semibold text-sage-green bg-sage-green/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-gray-500 text-lg leading-relaxed mb-4">{post.excerpt}</p>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            {post.author && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sage-green to-olive-green flex items-center justify-center text-white text-sm font-bold">
                  {post.author.charAt(0)}
                </div>
                <span className="text-sm text-gray-600 font-medium">{post.author}</span>
              </div>
            )}
            <button
              onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
              className="flex items-center gap-1.5 text-sage-green text-sm hover:text-olive-green transition-colors font-semibold"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </motion.header>

        {/* Content */}
        {post.content ? (
          <motion.div
            initial="hidden" animate="visible" variants={fadeInUp}
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-gray-800 prose-li:text-gray-600"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
          />
        ) : (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <p className="text-gray-500 italic">No content available for this article.</p>
          </motion.div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <motion.section
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="mt-16 pt-10 border-t border-gray-200"
          >
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">More Articles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {related.map((r) => (
                <motion.div key={r._id} variants={fadeInUp}
                  className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-sage-green/20 transition-all"
                >
                  {r.category && (
                    <span className="text-xs font-semibold text-sage-green bg-sage-green/10 px-2.5 py-0.5 rounded-full mb-2 inline-block">
                      {r.category}
                    </span>
                  )}
                  <h3 className="font-serif font-bold text-gray-900 group-hover:text-sage-green transition-colors mb-3 leading-snug">
                    {r.title}
                  </h3>
                  <Link to={`/blog/${r.slug}`} className="inline-flex items-center gap-1.5 text-sage-green text-sm font-semibold hover:gap-2.5 transition-all">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>
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
