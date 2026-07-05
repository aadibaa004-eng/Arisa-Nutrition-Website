import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Star, Image, MessageSquare, TrendingUp, AlertCircle } from 'lucide-react';
import { api, DashboardStats } from '../../services/api';

const StatCard: React.FC<{
  icon: React.ElementType;
  label: string;
  value: number;
  sub?: string;
  color: string;
}> = ({ icon: Icon, label, value, sub, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <p className="text-3xl font-bold text-gray-800 mb-1">{value}</p>
    <p className="text-gray-500 text-sm font-medium">{label}</p>
    {sub && <p className="text-gray-400 text-xs mt-1">{sub}</p>}
  </motion.div>
);

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats['data'] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.dashboard()
      .then((res: any) => {
        console.log('📊 Dashboard response:', JSON.stringify(res, null, 2));
        // Support both { data: {...} } and flat response shapes
        const d = res?.data ?? res;
        setStats({
          blogs: d?.blogs ?? { total: 0, published: 0 },
          reviews: d?.reviews ?? { total: 0, approved: 0 },
          gallery: d?.gallery ?? { total: 0 },
          contacts: d?.contacts ?? { total: 0, new: 0 },
        });
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
        <p className="text-gray-400 text-sm">Welcome back! Here's an overview of your content.</p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-sage-green border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error} — Make sure the backend is running at localhost:3000
        </div>
      )}

      {stats && (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            icon={FileText}
            label="Total Blogs"
            value={stats.blogs.total}
            sub={`${stats.blogs.published} published`}
            color="bg-blue-500/15 text-blue-400"
          />
          <StatCard
            icon={Star}
            label="Reviews"
            value={stats.reviews.total}
            sub={`${stats.reviews.approved} approved`}
            color="bg-yellow-500/15 text-yellow-400"
          />
          <StatCard
            icon={Image}
            label="Gallery Items"
            value={stats.gallery.total}
            color="bg-purple-500/15 text-purple-400"
          />
          <StatCard
            icon={MessageSquare}
            label="Contact Submissions"
            value={stats.contacts.total}
            sub={`${stats.contacts.new} new`}
            color="bg-sage-green/15 text-sage-green"
          />
        </div>
      )}

      {/* Quick links */}
      <div className="mt-8">
        <h2 className="text-gray-700 font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Write Blog Post', href: '/admin/blogs', icon: FileText },
            { label: 'Add Gallery Photo', href: '/admin/gallery', icon: Image },
            { label: 'Manage Reviews', href: '/admin/reviews', icon: Star },
            { label: 'View Messages', href: '/admin/contacts', icon: MessageSquare },
          ].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-3 bg-white border border-gray-200 hover:border-sage-green/50 rounded-xl px-4 py-3 text-gray-500 hover:text-gray-800 transition-all text-sm font-medium group shadow-sm"
            >
              <item.icon className="w-4 h-4 group-hover:text-sage-green transition-colors" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-sage-green" />
          <h2 className="text-gray-700 font-semibold text-sm">Backend Status</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-500' : 'bg-green-500'}`} />
          <p className="text-gray-500 text-sm">
            {error ? 'Cannot connect to backend' : 'Connected to backend'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
