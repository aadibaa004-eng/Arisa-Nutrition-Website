import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, Check, X, AlertCircle, Loader, Star,
  Images, Upload, ZoomIn,
} from 'lucide-react';
import { api, ReviewItem, ReviewScreenshot } from '../../services/api';

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 5 * 1024 * 1024;

const AdminReviews: React.FC = () => {
  const [approved, setApproved] = useState<ReviewItem[]>([]);
  const [unapproved, setUnapproved] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState({ clientName: '', rating: 5, review: '', city: '', approved: true });

  // Screenshot manager state
  const [screenshotReview, setScreenshotReview] = useState<ReviewItem | null>(null);
  const [screenshots, setScreenshots] = useState<ReviewScreenshot[]>([]);
  const [screenshotsLoading, setScreenshotsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [deletingScreenshot, setDeletingScreenshot] = useState<string | null>(null);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const parseList = (res: any): ReviewItem[] =>
        Array.isArray(res) ? res
        : Array.isArray(res?.data) ? res.data
        : Array.isArray(res?.data?.reviews) ? res.data.reviews
        : Array.isArray(res?.reviews) ? res.reviews
        : [];

      const allReviewsRes = await api.reviews.list().catch((err) => { throw err; });
      const allReviews = parseList(allReviewsRes);

      setApproved(allReviews.filter(r => r.approved === true));
      setUnapproved(allReviews.filter(r => r.approved === false));
      setError('');
    } catch (err: any) {
      setError('Failed to load reviews: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadReviews(); }, []);

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
      const created: any = await api.reviews.create(payload);
      if (form.approved) {
        const createdId = created?.data?._id ?? created?._id;
        if (createdId) await api.reviews.update(createdId, { approved: true });
      }
      setShowForm(false);
      setForm({ clientName: '', rating: 5, review: '', city: '', approved: true });
      loadReviews();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleApprove = async (review: ReviewItem) => {
    try {
      await api.reviews.update(review._id, { approved: !review.approved });
      await loadReviews();
    } catch (err: any) {
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

  // ─── Screenshot Manager ───────────────────────────────────────────────────

  const openScreenshotManager = async (review: ReviewItem) => {
    setScreenshotReview(review);
    setScreenshots([]);
    setCaption('');
    setScreenshotsLoading(true);
    try {
      const res = await api.reviewScreenshots.listForReview(review._id);
      const list = Array.isArray(res?.data) ? res.data : [];
      setScreenshots(list);
    } catch {
      // ignore — will show empty state
    } finally {
      setScreenshotsLoading(false);
    }
  };

  const closeScreenshotManager = () => {
    setScreenshotReview(null);
    setScreenshots([]);
    setCaption('');
  };

  const processFiles = useCallback(async (files: File[]) => {
    if (!screenshotReview || files.length === 0) return;

    const valid = files.filter((f) => {
      if (!ALLOWED_MIME.includes(f.type)) {
        setError(`Skipping ${f.name}: unsupported type`);
        return false;
      }
      if (f.size > MAX_SIZE) {
        setError(`Skipping ${f.name}: exceeds 5 MB`);
        return false;
      }
      return true;
    });
    if (valid.length === 0) return;

    setUploading(true);
    try {
      const res = await api.reviewScreenshots.upload(
        screenshotReview._id,
        valid,
        caption.trim() || undefined
      );
      const created = Array.isArray(res?.data) ? res.data : [];
      setScreenshots((prev) => [...created, ...prev]);
      setCaption('');
    } catch (err: any) {
      setError(err.message || 'Failed to upload screenshots');
    } finally {
      setUploading(false);
    }
  }, [screenshotReview, caption]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleDeleteScreenshot = async (screenshotId: string) => {
    if (!screenshotReview) return;
    setDeletingScreenshot(screenshotId);
    try {
      await api.reviewScreenshots.delete(screenshotReview._id, screenshotId);
      setScreenshots((prev) => prev.filter((s) => s._id !== screenshotId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete screenshot');
    } finally {
      setDeletingScreenshot(null);
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

      {/* ─── Create Review Modal ─────────────────────────────────────────── */}
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
                      <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })} className="focus:outline-none">
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

      {/* ─── Screenshot Manager Modal ────────────────────────────────────── */}
      <AnimatePresence>
        {screenshotReview && (
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
              className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-2xl max-h-[85vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Screenshots</h2>
                  <p className="text-gray-400 text-xs mt-0.5">
                    for {screenshotReview.clientName} — {screenshotReview.city}
                  </p>
                </div>
                <button onClick={closeScreenshotManager} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Upload area */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors mb-5 ${
                  dragActive
                    ? 'border-sage-green bg-sage-green/5'
                    : 'border-gray-300 hover:border-sage-green hover:bg-gray-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileInput}
                  className="hidden"
                />
                {uploading ? (
                  <div className="flex items-center justify-center gap-2 text-sage-green">
                    <Loader className="w-5 h-5 animate-spin" />
                    <span className="text-sm font-medium">Uploading...</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm font-medium">
                      Drop screenshots here or click to browse
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      JPEG, PNG, WEBP, GIF — max 5 MB each
                    </p>
                  </>
                )}
              </div>

              {/* Caption input */}
              <div className="mb-5">
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Optional caption for next upload..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-sage-green focus:ring-1 focus:ring-sage-green"
                />
              </div>

              {/* Screenshots grid */}
              <div className="flex-1 overflow-y-auto min-h-0">
                {screenshotsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-6 h-6 border-3 border-sage-green border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : screenshots.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 text-sm">
                    No screenshots uploaded yet
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {screenshots.map((s) => (
                      <div key={s._id} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                        <img
                          src={s.imageUrl}
                          alt={s.caption || 'Review screenshot'}
                          className="w-full aspect-[4/3] object-cover cursor-pointer"
                          onClick={() => setLightboxUrl(s.imageUrl)}
                        />
                        {/* Overlay controls */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => setLightboxUrl(s.imageUrl)}
                            className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                          >
                            <ZoomIn className="w-4 h-4 text-gray-700" />
                          </button>
                          <button
                            onClick={() => setConfirmDelete({ id: s._id, name: s.caption || 'this screenshot' })}
                            disabled={deletingScreenshot === s._id}
                            className="p-2 bg-white/90 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-40"
                          >
                            {deletingScreenshot === s._id ? (
                              <Loader className="w-4 h-4 text-red-500 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4 text-red-500" />
                            )}
                          </button>
                        </div>
                        {/* Caption + approved badge */}
                        {(s.caption || !s.approved) && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                            {s.caption && (
                              <p className="text-white text-xs truncate">{s.caption}</p>
                            )}
                            {!s.approved && (
                              <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-orange-500 text-white font-medium mt-0.5">
                                Pending
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Lightbox ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setLightboxUrl(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightboxUrl}
              alt="Screenshot preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setLightboxUrl(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Confirm Delete Dialog ───────────────────────────────────────── */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Screenshot</h3>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to delete {confirmDelete.name}? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDeleteScreenshot(confirmDelete.id);
                    setConfirmDelete(null);
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Review Lists ────────────────────────────────────────────────── */}
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
                  <ReviewCard
                    key={review._id}
                    review={review}
                    deletingId={deletingId}
                    onToggle={toggleApprove}
                    onDelete={handleDelete}
                    onScreenshots={openScreenshotManager}
                  />
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
                  <ReviewCard
                    key={review._id}
                    review={review}
                    deletingId={deletingId}
                    onToggle={toggleApprove}
                    onDelete={handleDelete}
                    onScreenshots={openScreenshotManager}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// ─── Review Card ──────────────────────────────────────────────────────────────
const ReviewCard: React.FC<{
  review: ReviewItem;
  deletingId: string | null;
  onToggle: (r: ReviewItem) => void;
  onDelete: (id: string) => void;
  onScreenshots: (r: ReviewItem) => void;
}> = ({ review, deletingId, onToggle, onDelete, onScreenshots }) => (
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
          onClick={() => onScreenshots(review)}
          title="Manage screenshots"
          className="p-2 text-gray-400 hover:text-sage-green rounded-lg hover:bg-sage-green/10 transition-all"
        >
          <Images className="w-4 h-4" />
        </button>
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
