import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Eye, EyeOff, AlertCircle, X, Check, Loader } from 'lucide-react';
import { api, BlogItem } from '../../services/api';

const emptyBlog: Partial<BlogItem> = {
  title: '', author: 'Dt. Aadiba Azeemuddin', content: '', excerpt: '', category: '', published: false,
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
        console.log('📋 Blogs GET response:', JSON.stringify(res, null, 2));
        // Handle all possible shapes: array, { data: [] }, { blogs: [] }
        const list = Array.isArray(res) ? res
          : Array.isArray(res?.data) ? res.data
          : Array.isArray(res?.data?.blogs) ? res.data.blogs
          : Array.isArray(res?.blogs) ? res.blogs
          : Array.isArray(res?.result) ? res.result
          : Array.isArray(res?.posts) ? res.posts
          : [];
        console.log('📋 Parsed blog list:', list.length, 'items');
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
    setForm({ title: blog.title, author: blog.author || 'Dt. Aadiba Azeemuddin', content: blog.content, excerpt: blog.excerpt, category: blog.category, published: blog.published });
    setEditingId(blog._id);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Clean data: remove undefined/null values and ensure strings are not empty
      const cleanData = {
        title: form.title?.trim() || '',
        author: form.author?.trim() || 'Dt. Aadiba Azeemuddin',
        content: form.content?.trim() || '',
        excerpt: form.excerpt?.trim() || '',
        category: form.category?.trim() || '',
        published: form.published || false,
      };

      // Validate required fields
      if (!cleanData.title) {
        setError('Title is required');
        setSaving(false);
        return;
      }
      if (!cleanData.content) {
        setError('Content is required');
        setSaving(false);
        return;
      }

      if (editingId) {
        await api.blogs.update(editingId, cleanData);
      } else {
        await api.blogs.create(cleanData);
      }
      setShowForm(false);
      loadBlogs();
    } catch (err: any) {
      setError(err.message || 'Failed to save blog');
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
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Blogs</h1>
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

      {/* Blog Form — Medium-style full-screen editor */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 overflow-auto"
          >
            {/* Editor Topbar */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className="text-gray-400 text-sm font-medium">
                  {editingId ? 'Editing post' : 'New story'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => setForm({ ...form, published: !form.published })}
                    className={`relative w-9 h-5 rounded-full transition-colors ${
                      form.published ? 'bg-sage-green' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      form.published ? 'translate-x-4' : 'translate-x-0.5'
                    }`} />
                  </div>
                  <span className="text-sm text-gray-500">{form.published ? 'Published' : 'Draft'}</span>
                </label>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 bg-sage-green hover:bg-olive-green text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors disabled:opacity-60"
                >
                  {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  {editingId ? 'Update' : 'Publish'}
                </button>
              </div>
            </div>

            {/* Editor Body */}
            <form onSubmit={handleSave} className="max-w-3xl mx-auto px-6 py-12">
              {/* Author + Category row */}
              <div className="flex gap-4 mb-8">
                <input
                  type="text"
                  value={form.author || ''}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="Author name"
                  className="flex-1 border-b border-gray-200 focus:border-sage-green outline-none py-2 text-sm text-gray-600 placeholder-gray-300 transition-colors"
                />
                <input
                  type="text"
                  value={form.category || ''}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Category (e.g. Nutrition Tips)"
                  className="flex-1 border-b border-gray-200 focus:border-sage-green outline-none py-2 text-sm text-gray-600 placeholder-gray-300 transition-colors"
                />
              </div>

              {/* Title */}
              <textarea
                required
                rows={2}
                value={form.title || ''}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Title"
                className="w-full text-4xl font-bold text-gray-800 placeholder-gray-200 outline-none resize-none mb-4 leading-tight font-serif"
              />

              {/* Excerpt / Subtitle */}
              <textarea
                rows={2}
                value={form.excerpt || ''}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Write a short subtitle or excerpt..."
                className="w-full text-xl text-gray-400 placeholder-gray-200 outline-none resize-none mb-8 leading-relaxed"
              />

              <hr className="border-gray-200 mb-8" />

              {/* Content */}
              <textarea
                required
                rows={28}
                value={form.content || ''}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Tell your story..."
                className="w-full text-lg text-gray-700 placeholder-gray-300 outline-none resize-none leading-relaxed"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-sage-green border-t-transparent rounded-full animate-spin" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg mb-2">No blog posts yet</p>
          <p className="text-sm">Click "New Post" to create your first blog.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              layout
              className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-gray-800 font-medium truncate">{blog.title}</p>
                  <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                    blog.published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-gray-400 text-xs truncate">
                  {blog.category && <span className="mr-2">#{blog.category}</span>}
                  {blog.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => togglePublish(blog)}
                  title={blog.published ? 'Unpublish' : 'Publish'}
                  className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
                >
                  {blog.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => openEdit(blog)}
                  className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  disabled={deletingId === blog._id}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all disabled:opacity-40"
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
