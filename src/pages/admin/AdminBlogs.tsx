import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Eye, EyeOff, AlertCircle, X, Check, Loader } from 'lucide-react';
import { api, BlogItem } from '../../services/api';

const emptyBlog: Partial<BlogItem> = {
  title: '', content: '', excerpt: '', category: '', published: false,
};

const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState<Partial<BlogItem>>(emptyBlog);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadBlogs = () => {
    setLoading(true);
    api.blogs.list()
      .then((res: any) => {
        // Handle all possible shapes: array, { data: [] }, { blogs: [] }
        const list = Array.isArray(res) ? res
          : Array.isArray(res?.data) ? res.data
          : Array.isArray(res?.blogs) ? res.blogs
          : [];
        setBlogs(list);
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadBlogs(); }, []);

  const openCreate = () => {
    setForm(emptyBlog);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (blog: BlogItem) => {
    setForm({ title: blog.title, content: blog.content, excerpt: blog.excerpt, category: blog.category, published: blog.published });
    setEditingId(blog._id);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await api.blogs.update(editingId, form);
      } else {
        await api.blogs.create(form);
      }
      setShowForm(false);
      loadBlogs();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await api.blogs.delete(id);
      setBlogs((b) => b.filter((x) => x._id !== id));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const togglePublish = async (blog: BlogItem) => {
    try {
      await api.blogs.update(blog._id, { published: !blog.published });
      setBlogs((b) => b.map((x) => x._id === blog._id ? { ...x, published: !x.published } : x));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Blogs</h1>
          <p className="text-gray-400 text-sm">Create and manage your blog posts</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-sage-green hover:bg-olive-green text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
          <button onClick={() => setError('')} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Blog Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 overflow-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-2xl mt-8 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">
                  {editingId ? 'Edit Blog Post' : 'New Blog Post'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={form.title || ''}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Enter blog title"
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sage-green focus:ring-1 focus:ring-sage-green"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <input
                      type="text"
                      value={form.category || ''}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      placeholder="e.g. Nutrition Tips"
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sage-green focus:ring-1 focus:ring-sage-green"
                    />
                  </div>
                  <div className="flex items-end pb-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div
                        onClick={() => setForm({ ...form, published: !form.published })}
                        className={`relative w-10 h-6 rounded-full transition-colors ${form.published ? 'bg-sage-green' : 'bg-gray-700'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form.published ? 'translate-x-5' : 'translate-x-1'}`} />
                      </div>
                      <span className="text-gray-300 text-sm">Publish immediately</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
                  <textarea
                    value={form.excerpt || ''}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    rows={2}
                    placeholder="Short summary of the post..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sage-green focus:ring-1 focus:ring-sage-green resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Content *</label>
                  <textarea
                    required
                    value={form.content || ''}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows={12}
                    placeholder="Write your blog content here (Markdown supported)..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sage-green focus:ring-1 focus:ring-sage-green resize-y font-mono text-sm"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-sage-green hover:bg-olive-green text-white py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    {editingId ? 'Update Post' : 'Create Post'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-sage-green border-t-transparent rounded-full animate-spin" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <p className="text-lg mb-2">No blog posts yet</p>
          <p className="text-sm">Click "New Post" to create your first blog.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              layout
              className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-white font-medium truncate">{blog.title}</p>
                  <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${blog.published ? 'bg-green-500/15 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-gray-500 text-xs truncate">
                  {blog.category && <span className="mr-2">#{blog.category}</span>}
                  {blog.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => togglePublish(blog)}
                  title={blog.published ? 'Unpublish' : 'Publish'}
                  className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-gray-800 transition-all"
                >
                  {blog.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => openEdit(blog)}
                  className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-gray-800 transition-all"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  disabled={deletingId === blog._id}
                  className="p-2 text-gray-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all disabled:opacity-40"
                >
                  {deletingId === blog._id ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
