import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Pencil, Trash2, Eye, AlertCircle, X, Loader,
  FolderOpen, Image as ImageIcon, Upload,
} from 'lucide-react';
import { api, CategoryImage, GalleryCategory } from '../../services/api';
import {
  CategoryFormModal, ConfirmDialog, GalleryImageGrid, GalleryLightbox,
  ImageMetaModal, StatusBadge, ToggleSwitch, formatDate,
} from './GalleryShared';

const UPLOAD_BATCH_SIZE = 20;

const AdminGallery: React.FC = () => {
  const navigate = useNavigate();

  // ─── Categories ────────────────────────────────────────────────────────────
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState<GalleryCategory | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<GalleryCategory | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ─── Uncategorized images ──────────────────────────────────────────────────
  const [uncImages, setUncImages] = useState<CategoryImage[]>([]);
  const [uncLoading, setUncLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [editingImage, setEditingImage] = useState<CategoryImage | null>(null);
  const [imageToDelete, setImageToDelete] = useState<CategoryImage | null>(null);
  const [deletingImage, setDeletingImage] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const uncFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Promise.all([
      api.galleryCategories.list(),
      api.galleryUncategorized.list().catch(() => ({ data: [] })),
    ])
      .then(([catRes, uncRes]) => {
        const list = Array.isArray(catRes?.data) ? catRes.data : [];
        setCategories(list.map((c) => ({ ...c, imageCount: c.imageCount ?? 0 })));
        setUncImages(Array.isArray(uncRes?.data) ? uncRes.data : []);
      })
      .catch((err: any) => setError(err.message || 'Failed to load gallery.'))
      .finally(() => {
        setLoading(false);
        setUncLoading(false);
      });
  }, []);

  // ─── Category actions ──────────────────────────────────────────────────────

  const handleSaved = (saved: GalleryCategory) => {
    setCategories((cats) => {
      const exists = cats.some((c) => c._id === saved._id);
      return exists
        ? cats.map((c) => (c._id === saved._id ? { ...c, ...saved, imageCount: c.imageCount } : c))
        : [...cats, { imageCount: 0, ...saved }];
    });
    setShowForm(false);
    setEditCategory(null);
  };

  const toggleStatus = async (category: GalleryCategory) => {
    setTogglingId(category._id);
    setError('');
    try {
      await api.galleryCategories.setStatus(category._id, !category.isActive);
      setCategories((cats) =>
        cats.map((c) => (c._id === category._id ? { ...c, isActive: !c.isActive } : c))
      );
    } catch (err: any) {
      setError(err.message || 'Failed to update category.');
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deletingCategory) return;
    setDeleting(true);
    setError('');
    try {
      await api.galleryCategories.remove(deletingCategory._id);
      setCategories((cats) => cats.filter((c) => c._id !== deletingCategory._id));
      setDeletingCategory(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete category.');
    } finally {
      setDeleting(false);
    }
  };

  // ─── Uncategorized image actions ───────────────────────────────────────────

  const uploadUncFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    if (files.length === 0) {
      setError('Please choose image files only.');
      return;
    }

    setUploading(true);
    setError('');
    try {
      const uploaded: CategoryImage[] = [];
      for (let i = 0; i < files.length; i += UPLOAD_BATCH_SIZE) {
        const batch = files.slice(i, i + UPLOAD_BATCH_SIZE);
        const created = await api.galleryUncategorized.uploadImages(batch);
        uploaded.push(...created);
      }
      setUncImages((imgs) => [...uploaded, ...imgs]);
    } catch (err: any) {
      setError(err.message || 'Failed to upload image.');
    } finally {
      setUploading(false);
      setDragActive(false);
      if (uncFileInputRef.current) uncFileInputRef.current.value = '';
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) uploadUncFiles(e.dataTransfer.files);
  };

  const handleImageSaved = (saved: CategoryImage) => {
    setUncImages((imgs) => imgs.map((img) => (img._id === saved._id ? saved : img)));
    setEditingImage(null);
  };

  const handleDeleteImage = async () => {
    if (!imageToDelete) return;
    setDeletingImage(true);
    setError('');
    try {
      await api.galleryCategories.deleteImage(imageToDelete._id);
      setUncImages((imgs) => imgs.filter((img) => img._id !== imageToDelete._id));
      setImageToDelete(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete image.');
    } finally {
      setDeletingImage(false);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Gallery</h1>
          <p className="text-gray-400 text-sm">Organize your gallery photos into categories</p>
        </div>
        <button
          onClick={() => { setEditCategory(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-sage-green hover:bg-olive-green text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Category
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl px-4 py-3 text-sm mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
          <button onClick={() => setError('')} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-sage-green border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* ── Categories section ── */}
          {categories.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-sage-green/10 flex items-center justify-center">
                <FolderOpen className="w-7 h-7 text-sage-green" />
              </div>
              <p className="text-gray-600 font-medium mb-1">No gallery categories found.</p>
              <p className="text-gray-400 text-sm mb-6">Create your first category to get started.</p>
              <button
                onClick={() => { setEditCategory(null); setShowForm(true); }}
                className="inline-flex items-center gap-2 bg-sage-green hover:bg-olive-green text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Category
              </button>
            </div>
          ) : (
            <div className="space-y-3 mb-12">
              {categories.map((category) => (
                <motion.div
                  key={category._id}
                  layout
                  className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm hover:border-gray-300 transition-colors"
                >
                  {/* Name + slug */}
                  <button
                    onClick={() => navigate(`/admin/gallery/${category._id}`)}
                    className="flex items-center gap-4 flex-1 min-w-0 text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-sage-green/10 flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="w-5 h-5 text-sage-green" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-800 font-medium truncate group-hover:text-sage-green transition-colors">
                        {category.name}
                      </p>
                      <p className="text-gray-400 text-xs truncate">/{category.slug}</p>
                    </div>
                  </button>

                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-6 flex-shrink-0">
                    <StatusBadge active={category.isActive} />
                    <span className="text-gray-500 text-sm whitespace-nowrap">
                      {category.imageCount ?? 0} {category.imageCount === 1 ? 'Image' : 'Images'}
                    </span>
                    <span className="text-gray-400 text-xs whitespace-nowrap">
                      {formatDate(category.createdAt)}
                    </span>
                  </div>

                  {/* Mobile status */}
                  <div className="md:hidden flex-shrink-0">
                    <StatusBadge active={category.isActive} />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <ToggleSwitch
                      on={category.isActive}
                      onChange={() => toggleStatus(category)}
                      disabled={togglingId === category._id}
                    />
                    <button
                      onClick={() => navigate(`/admin/gallery/${category._id}`)}
                      title="View images"
                      className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => { setEditCategory(category); setShowForm(true); }}
                      title="Edit category"
                      className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingCategory(category)}
                      disabled={deletingCategory?._id === category._id}
                      title="Delete category"
                      className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all disabled:opacity-40"
                    >
                      {deletingCategory?._id === category._id
                        ? <Loader className="w-4 h-4 animate-spin" />
                        : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* ── Uncategorized Images section ── */}
          <input
            ref={uncFileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && uploadUncFiles(e.target.files)}
          />

          <h2 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-sage-green" />
            Uncategorized Images
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
              {uncImages.length}
            </span>
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Photos that are not part of any category.
          </p>

          {/* Compact drag-and-drop zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => uncFileInputRef.current?.click()}
            className={`mb-6 flex items-center justify-center gap-3 py-5 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
              dragActive
                ? 'border-sage-green bg-sage-green/10 scale-[1.01]'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {uploading ? (
              <>
                <Loader className="w-5 h-5 text-sage-green animate-spin" />
                <p className="text-gray-500 text-sm">Uploading…</p>
              </>
            ) : (
              <>
                <Upload className={`w-5 h-5 transition-colors ${dragActive ? 'text-sage-green' : 'text-gray-300'}`} />
                <p className={`text-sm font-medium transition-colors ${dragActive ? 'text-sage-green' : 'text-gray-500'}`}>
                  {dragActive ? 'Drop to upload' : 'Drag & drop images here, or click to browse'}
                </p>
                <span className="text-gray-300">·</span>
                <p className="text-gray-400 text-xs">uploaded without a category</p>
              </>
            )}
          </div>

          {uncLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader className="w-6 h-6 text-sage-green animate-spin" />
            </div>
          ) : uncImages.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-600 font-medium mb-1">No uncategorized images.</p>
              <p className="text-gray-400 text-sm">Images you upload above will appear here.</p>
            </div>
          ) : (
            <GalleryImageGrid
              images={uncImages}
              onView={setLightboxUrl}
              onEdit={setEditingImage}
              onDelete={setImageToDelete}
            />
          )}
        </>
      )}

      {/* Create / Edit Category Modal */}
      <AnimatePresence>
        {showForm && (
          <CategoryFormModal
            key={editCategory?._id || 'create'}
            category={editCategory}
            onClose={() => { setShowForm(false); setEditCategory(null); }}
            onSaved={handleSaved}
          />
        )}
      </AnimatePresence>

      {/* Delete Category Confirmation */}
      <AnimatePresence>
        {deletingCategory && (
          <ConfirmDialog
            title="Delete Category"
            message={`Are you sure you want to delete this category?\n\nThis action will permanently remove the category and all associated image records.`}
            confirmLabel="Delete"
            loading={deleting}
            onConfirm={handleDelete}
            onCancel={() => setDeletingCategory(null)}
          />
        )}
      </AnimatePresence>

      {/* Edit Image Details Modal */}
      <AnimatePresence>
        {editingImage && (
          <ImageMetaModal
            key={editingImage._id}
            image={editingImage}
            onClose={() => setEditingImage(null)}
            onSaved={handleImageSaved}
          />
        )}
      </AnimatePresence>

      {/* Delete Image Confirmation */}
      <AnimatePresence>
        {imageToDelete && (
          <ConfirmDialog
            title="Delete Image"
            message="Are you sure you want to delete this image?"
            confirmLabel="Delete"
            loading={deletingImage}
            onConfirm={handleDeleteImage}
            onCancel={() => setImageToDelete(null)}
          />
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxUrl && <GalleryLightbox url={lightboxUrl} onClose={() => setLightboxUrl(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default AdminGallery;
