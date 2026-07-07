import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, X, AlertCircle, Loader, Star } from 'lucide-react';
import { api, ReviewItem } from '../../services/api';

const AdminReviews: React.FC = () => {
  const [approved, setApproved] = useState<ReviewItem[]>([]);
  const [unapproved, setUnapproved] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState({ clientName: '', rating: 5, review: '', city: '', approved: true });

  const loadReviews = async () => {
    setLoading(true);
    try {
      const parseList = (res: any): ReviewItem[] =>
        Array.isArray(res) ? res
        : Array.isArray(res?.data) ? res.data
        : Array.isArray(res?.data?.reviews) ? res.data.reviews
        : Array.isArray(res?.reviews) ? res.reviews
        : [];

      // Fetch all reviews and filter on client-side
      const allReviewsRes = await api.reviews.list().catch((err) => {
        console.error('❌ Failed to fetch reviews:', err);
        throw err;
      });

      const allReviews = parseList(allReviewsRes);
      console.log('✅ Fetched total reviews:', allReviews.length);

      // Filter by approved status
      const approvedList = allReviews.filter(r => r.approved === true);
      const unapprovedList = allReviews.filter(r => r.approved === false);
      
      console.log('✅ Filtered reviews - Approved:', approvedList.length, 'Unapproved:', unapprovedList.length);
      setApproved(approvedList);
      setUnapproved(unapprovedList);
      setError(''); // Clear any previous errors
    } catch (err: any) {
      console.error('❌ loadReviews error:', err);
      setError('Failed to load reviews: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    loadReviews(); 
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (!form.clientName?.trim() || form.clientName.trim().length < 2) {
        setError('Client name must be at least 2 characters');
        setSaving(false);
        return;
      }
      if (!form.review?.trim() || form.review.trim().length < 10) {
        setError('Review must be at least 10 characters');
        setSaving(false);
        return;
      }
      if (!form.city?.trim() || form.city.trim().length < 2) {
        setError('City must be at least 2 characters');
        setSaving(false);
        return;
      }
      const payload = {
        clientName: form.clientName?.trim(),
        rating: form.rating,
        review: form.review?.trim(),
        city: form.city?.trim(),
        approved: form.approved,
      };
      console.log('📝 Creating review with payload:', JSON.stringify(payload, null, 2));
      const created: any = await api.reviews.create(payload);
      // Backend ignores approved on creation (defaults to false), so approve separately
      if (form.approved) {
        const createdId = created?.data?._id ?? created?._id;
        if (createdId) {
          console.log('📝 Approving review:', createdId);
          await api.reviews.update(createdId, { approved: true });
        }
      }
      setShowForm(false);
      setForm({ clientName: '', rating: 5, review: '', city: '', approved: true });
      loadReviews();
    } catch (err: any) {
      console.error('❌ Review creation error:', err.message);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleApprove = async (review: ReviewItem) => {
    try {
      console.log(`🔄 Toggling review ${review._id} from approved=${review.approved} to approved=${!review.approved}`);
      await api.reviews.update(review._id, { approved: !review.approved });
      console.log('✅ Review updated successfully, reloading...');
      // Wait for loadReviews to complete before finishing
      await loadReviews();
      console.log('✅ Reviews reloaded');
    } catch (err: any) {
      console.error('❌ toggleApprove error:', err);
      setError('Failed to update review: ' + (err.message || 'Unknown error'));
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await api.reviews.delete(id);
      setApproved((r) => r.filter((x) => x._id !== id));
      setUnapproved((r) => r.filter((x) => x._id !== id));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Reviews</h1>
          <p className="text-gray-400 text-sm">Manage client testimonials and reviews</p>
          <p className="text-gray-600 text-xs mt-2">Total: {approved.length + unapproved.length} reviews</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-sage-green hover:bg-olive-green text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Review
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
          <button onClick={() => setError('')} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Create Review Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800">Add Review</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name * (min 2 chars)</label>
                  <input
                    required
                    type="text"
                    value={form.clientName}
                    onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-sage-green focus:ring-1 focus:ring-sage-green"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setForm({ ...form, rating: n })}
                        className="focus:outline-none"
                      >
                        <Star className={`w-7 h-7 transition-colors ${n <= form.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Review * (min 10 chars)</label>
                  <textarea
                    required
                    value={form.review}
                    onChange={(e) => setForm({ ...form, review: e.target.value })}
                    rows={4}
                    placeholder="Client's review (at least 10 characters)..."
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-sage-green focus:ring-1 focus:ring-sage-green resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City * (min 2 chars)</label>
                  <input
                    required
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="e.g. Mumbai"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-sage-green focus:ring-1 focus:ring-sage-green"
                  />
                </div>

                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setForm(f => ({ ...f, approved: !f.approved }))}>
                  <div className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${form.approved ? 'bg-sage-green' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form.approved ? 'translate-x-5' : 'translate-x-1'}`} />
                  </div>
                  <span className="text-gray-700 text-sm">Approve immediately (auto-approved by default)</span>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl text-sm font-semibold transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="flex-1 bg-sage-green hover:bg-olive-green text-white py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                    {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    Add Review
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-sage-green border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Approved Section */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              Approved ({approved.length})
            </h2>
            {approved.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-xl text-gray-400 text-sm">No approved reviews yet</div>
            ) : (
              <div className="space-y-3">
                {approved.map((review) => (
                  <ReviewCard key={review._id} review={review} deletingId={deletingId} onToggle={toggleApprove} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </div>

          {/* Pending / Unapproved Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Loader className="w-5 h-5 text-orange-400" />
              Pending Approval ({unapproved.length})
            </h2>
            {unapproved.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-xl text-gray-400 text-sm">No pending reviews</div>
            ) : (
              <div className="space-y-3">
                {unapproved.map((review) => (
                  <ReviewCard key={review._id} review={review} deletingId={deletingId} onToggle={toggleApprove} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Extracted card component
const ReviewCard: React.FC<{
  review: ReviewItem;
  deletingId: string | null;
  onToggle: (r: ReviewItem) => void;
  onDelete: (id: string) => void;
}> = ({ review, deletingId, onToggle, onDelete }) => (
  <motion.div layout className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <p className="text-gray-800 font-semibold">{review.clientName}</p>
          <p className="text-gray-500 text-xs">from {review.city}</p>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${review.approved ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
            {review.approved ? 'Approved' : 'Pending'}
          </span>
        </div>
        <p className="text-gray-700 text-sm">{review.review}</p>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={() => onToggle(review)}
          title={review.approved ? 'Unapprove' : 'Approve'}
          className={`p-2 rounded-lg transition-all ${review.approved ? 'text-green-600 hover:text-gray-400 hover:bg-gray-100' : 'text-gray-400 hover:text-green-600 hover:bg-green-50'}`}
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(review._id)}
          disabled={deletingId === review._id}
          className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all disabled:opacity-40"
        >
          {deletingId === review._id ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  </motion.div>
);

export default AdminReviews;
