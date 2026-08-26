import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Check, Loader, Pencil, Trash2, X, ZoomIn } from 'lucide-react';
import { api, CategoryImage, GalleryCategory } from '../../services/api';

export const IMAGE_TITLE_MAX = 150;
export const IMAGE_DESCRIPTION_MAX = 1000;
export const CATEGORY_DESCRIPTION_MAX = 500;

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(value)
  );

export const StatusBadge: React.FC<{ active: boolean }> = ({ active }) => (
  <span
    className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
      active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
    }`}
  >
    {active ? 'Enabled' : 'Disabled'}
  </span>
);

export const ToggleSwitch: React.FC<{ on: boolean; onChange: () => void; disabled?: boolean }> = ({
  on,
  onChange,
  disabled,
}) => (
  <button
    type="button"
    onClick={onChange}
    disabled={disabled}
    className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 disabled:opacity-50 cursor-pointer ${
      on ? 'bg-sage-green' : 'bg-gray-300'
    }`}
    title={on ? 'Disable category' : 'Enable category'}
  >
    <div
      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
        on ? 'translate-x-4' : 'translate-x-0.5'
      }`}
    />
  </button>
);

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  message,
  confirmLabel = 'Delete',
  loading,
  onConfirm,
  onCancel,
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    onClick={onCancel}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
    >
      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <AlertTriangle className="w-5 h-5 text-red-500" />
      </div>
      <h2 className="text-gray-800 font-bold mb-2">{title}</h2>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">{message}</p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={loading}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
        >
          {loading && <Loader className="w-4 h-4 animate-spin" />}
          {confirmLabel}
        </button>
      </div>
    </motion.div>
  </motion.div>
);

interface ImageMetaModalProps {
  image: CategoryImage;
  onClose: () => void;
  onSaved: (image: CategoryImage) => void;
}

export const ImageMetaModal: React.FC<ImageMetaModalProps> = ({ image, onClose, onSaved }) => {
  const [title, setTitle] = useState(image.title || '');
  const [description, setDescription] = useState(image.description || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      // Backend requires at least one of title/description in the PATCH body
      const res = await api.galleryCategories.updateImage(image._id, { title, description });
      onSaved(res.data);
    } catch (err: any) {
      setError(err.message || 'Failed to update image details');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-800 font-bold">Edit Image Details</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <img
          src={image.imageUrl}
          alt={title || ''}
          className="w-full h-40 object-cover rounded-xl mb-4 bg-gray-50"
        />

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Title
          </label>
          <input
            autoFocus
            type="text"
            value={title}
            maxLength={IMAGE_TITLE_MAX}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Annual Award Ceremony"
            className="w-full border border-gray-200 focus:border-sage-green outline-none rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 transition-colors mb-1"
          />
          <p className="text-right text-xs text-gray-300 mb-4">
            {title.length}/{IMAGE_TITLE_MAX}
          </p>

          <label className="block text-sm font-medium text-gray-600 mb-2">
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            maxLength={IMAGE_DESCRIPTION_MAX}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description shown with this image…"
            className="w-full border border-gray-200 focus:border-sage-green outline-none rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 resize-none transition-colors mb-1"
          />
          <p className="text-right text-xs text-gray-300 mb-4">
            {description.length}/{IMAGE_DESCRIPTION_MAX}
          </p>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl px-4 py-3 text-sm mb-4">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 bg-sage-green hover:bg-olive-green text-white py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
            >
              {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

interface CategoryFormModalProps {
  category: GalleryCategory | null; // null = create mode
  onClose: () => void;
  onSaved: (category: GalleryCategory) => void;
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  category,
  onClose,
  onSaved,
}) => {
  const isEdit = !!category;
  const [name, setName] = useState(category?.name || '');
  const [description, setDescription] = useState(category?.description || '');
  const [isActive, setIsActive] = useState(category ? category.isActive : true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Category name is required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = { name: trimmed, description: description.trim(), isActive };
      const res = isEdit
        ? await api.galleryCategories.update(category!._id, payload)
        : await api.galleryCategories.create(payload);
      onSaved(res.data);
    } catch (err: any) {
      setError(err.message || 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-800 font-bold">
            {isEdit ? 'Edit Category' : 'Create Category'}
          </h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <label className="block text-sm font-medium text-gray-600 mb-2">Category Name</label>
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError('');
          }}
          placeholder="e.g. Achievements"
          className="w-full border border-gray-200 focus:border-sage-green outline-none rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 transition-colors mb-4"
        />

        <label className="block text-sm font-medium text-gray-600 mb-2">
          Description <span className="text-gray-300 font-normal">(optional)</span>
        </label>
        <textarea
          rows={2}
          value={description}
          maxLength={CATEGORY_DESCRIPTION_MAX}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Shown under the category title on the website…"
          className="w-full border border-gray-200 focus:border-sage-green outline-none rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 resize-none transition-colors mb-1"
        />
        <p className="text-right text-xs text-gray-300 mb-4">
          {description.length}/{CATEGORY_DESCRIPTION_MAX}
        </p>

        <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Status</p>
            <p className="text-xs text-gray-400">
              {isActive ? 'Visible on the website' : 'Hidden from the website'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{isActive ? 'Enabled' : 'Disabled'}</span>
            <ToggleSwitch on={isActive} onChange={() => setIsActive(!isActive)} />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl px-4 py-3 text-sm mb-4">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 bg-sage-green hover:bg-olive-green text-white py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
          >
            {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {isEdit ? 'Save Changes' : 'Create'}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

// ─── Gallery image grid (shared by category page + uncategorized section) ──

interface GalleryImageGridProps {
  images: CategoryImage[];
  onView: (url: string) => void;
  onEdit: (image: CategoryImage) => void;
  onDelete: (image: CategoryImage) => void;
}

export const GalleryImageGrid: React.FC<GalleryImageGridProps> = ({
  images,
  onView,
  onEdit,
  onDelete,
}) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    {images.map((image) => (
      <motion.div
        key={image._id}
        layout
        className="flex flex-col rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm"
      >
        {/* Image */}
        <div className="relative group aspect-square">
          <img
            src={image.imageUrl}
            alt={image.title || ''}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => onView(image.imageUrl)}
              title="View full size"
              className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg transition-all"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(image)}
              title="Delete image"
              className="p-2 bg-red-500/20 hover:bg-red-500/40 backdrop-blur-sm text-red-300 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Details — below the image */}
        <div className="p-3 border-t border-gray-100 flex flex-col flex-1">
          {image.title ? (
            <>
              <p className="text-sm font-medium text-gray-800 truncate">{image.title}</p>
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-2 leading-relaxed min-h-[2rem]">
                {image.description || 'No description yet.'}
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-400 italic">Untitled</p>
              <p className="text-xs text-gray-300 mt-0.5 line-clamp-2 leading-relaxed min-h-[2rem]">
                No details yet.
              </p>
            </>
          )}
          <button
            onClick={() => onEdit(image)}
            className="mt-2 w-full flex items-center justify-center gap-1.5 border border-gray-200 hover:border-sage-green hover:text-sage-green text-gray-500 py-1.5 rounded-lg text-xs font-medium transition-colors"
          >
            <Pencil className="w-3 h-3" />
            Edit Details
          </button>
        </div>
      </motion.div>
    ))}
  </div>
);

// ─── Lightbox ──────────────────────────────────────────────────────────────

export const GalleryLightbox: React.FC<{ url: string; onClose: () => void }> = ({
  url,
  onClose,
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <button className="absolute top-4 right-4 text-white/70 hover:text-white" onClick={onClose}>
      <X className="w-7 h-7" />
    </button>
    <motion.img
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      src={url}
      alt=""
      onClick={(e) => e.stopPropagation()}
      className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
    />
  </motion.div>
);

