import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Upload, Loader, Trash2, X, AlertCircle, Pencil,
  Image as ImageIcon,
} from 'lucide-react';
import { api, CategoryImage, GalleryCategory } from '../../services/api';
import {
  CategoryFormModal, ConfirmDialog, GalleryImageGrid, GalleryLightbox,
  ImageMetaModal, StatusBadge, ToggleSwitch,
} from './GalleryShared';

const UPLOAD_BATCH_SIZE = 20;

const AdminGalleryCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const [category, setCategory] = useState<GalleryCategory | null>(null);
  const [images, setImages] = useState<CategoryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false);
  const [togglingStatus, setTogglingStatus] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<CategoryImage | null>(null);
  const [editingImage, setEditingImage] = useState<CategoryImage | null>(null);
  const [deletingImage, setDeletingImage] = useState(false);

  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!categoryId) return;
    setLoading(true);
    api.galleryCategories.get(categoryId, true)
      .then((res) => {
        setCategory(res.data);
        setImages(res.data.images || []);
      })
      .catch((err: any) => setError(err.message || 'Failed to load category.'))
      .finally(() => setLoading(false));
  }, [categoryId]);

  // ─── Upload ────────────────────────────────────────────────────────────────

  const uploadFiles = async (fileList: FileList | File[]) => {
    if (!categoryId || !category) return;
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
        const created = await api.galleryCategories.uploadImages(categoryId, batch);
        uploaded.push(...created);
      }
      setImages((imgs) => [...uploaded, ...imgs]);
      setCategory((c) =>
        c ? { ...c, imageCount: (c.imageCount ?? images.length) + uploaded.length } : c
      );
    } catch (err: any) {
      setError(err.message || 'Failed to upload image.');
    } finally {
      setUploading(false);
      setDragActive(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
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
    if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
  };

  // ─── Mutations ─────────────────────────────────────────────────────────────

  const toggleStatus = async () => {
    if (!category) return;
    setTogglingStatus(true);
    setError('');
    try {
      await api.galleryCategories.setStatus(category._id, !category.isActive);
      setCategory((c) => (c ? { ...c, isActive: !c.isActive } : c));
    } catch (err: any) {
      setError(err.message || 'Failed to update category.');
    } finally {
      setTogglingStatus(false);
    }
  };

  const handleSaved = (saved: GalleryCategory) => {
    setCategory((c) => (c ? { ...c, ...saved, imageCount: c.imageCount } : saved));
    setShowEditForm(false);
  };

  const handleDeleteCategory = async () => {
    if (!category) return;
    setDeletingCategory(true);
    try {
      await api.galleryCategories.remove(category._id);
      navigate('/admin/gallery');
    } catch (err: any) {
      setError(err.message || 'Failed to delete category.');
      setDeletingCategory(false);
    }
  };

  const handleImageSaved = (saved: CategoryImage) => {
    setImages((imgs) => imgs.map((img) => (img._id === saved._id ? saved : img)));
    setEditingImage(null);
  };

  const handleDeleteImage = async () => {
    if (!imageToDelete) return;
    setDeletingImage(true);
    setError('');
    try {
      await api.galleryCategories.deleteImage(imageToDelete._id);
      setImages((imgs) => imgs.filter((img) => img._id !== imageToDelete._id));
      setCategory((c) =>
        c ? { ...c, imageCount: Math.max(0, (c.imageCount ?? 1) - 1) } : c
      );
      setImageToDelete(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete image.');
    } finally {
      setDeletingImage(false);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-sage-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!category) {
    return (
      <div>
        <button
          onClick={() => navigate('/admin/gallery')}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Gallery Categories
        </button>
        <div className="text-center py-16 bg-gray-50 rounded-xl text-gray-500">
          <p className="font-medium mb-1">Category not found.</p>
          <p className="text-sm text-gray-400">It may have been deleted.</p>
        </div>
      </div>
    );
  }

  const imageCount = Math.max(category.imageCount ?? 0, images.length);

  return (
    <div>
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/admin/gallery')}
        className="flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Gallery Categories
      </button>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge active={category.isActive} />
            <span className="text-gray-400 text-sm">
              {imageCount} {imageCount === 1 ? 'Image' : 'Images'}
            </span>
            <span className="text-gray-300 text-sm hidden sm:inline">/{category.slug}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <ToggleSwitch
            on={category.isActive}
            onChange={toggleStatus}
            disabled={togglingStatus}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-sage-green hover:bg-olive-green text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
          >
            {uploading
              ? <Loader className="w-4 h-4 animate-spin" />
              : <Upload className="w-4 h-4" />}
            {uploading ? 'Uploading…' : 'Upload Images'}
          </button>
          <button
            onClick={() => setShowEditForm(true)}
            title="Edit category"
            className="p-2.5 border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeletingCategory(true)}
            disabled={deletingCategory}
            title="Delete category"
            className="p-2.5 border border-red-200 text-red-400 hover:bg-red-50 rounded-xl transition-all disabled:opacity-40"
          >
            {deletingCategory
              ? <Loader className="w-4 h-4 animate-spin" />
              : <Trash2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl px-4 py-3 text-sm mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
          <button onClick={() => setError('')} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && uploadFiles(e.target.files)}
      />

      {/* Drag-and-drop zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`mb-6 flex flex-col items-center justify-center gap-2 py-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
          dragActive
            ? 'border-sage-green bg-sage-green/10 scale-[1.01]'
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }`}
      >
        {uploading ? (
          <>
            <Loader className="w-8 h-8 text-sage-green animate-spin" />
            <p className="text-gray-500 text-sm">Uploading…</p>
          </>
        ) : (
          <>
            <Upload className={`w-8 h-8 transition-colors ${dragActive ? 'text-sage-green' : 'text-gray-300'}`} />
            <p className={`text-sm font-medium transition-colors ${dragActive ? 'text-sage-green' : 'text-gray-500'}`}>
              {dragActive ? 'Drop to upload' : 'Drag & drop images here, or click to browse'}
            </p>
            <p className="text-gray-400 text-xs">PNG, JPG, WEBP supported · up to 5 MB each</p>
          </>
        )}
      </div>

      {/* Image grid */}
      {images.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-sage-green/10 flex items-center justify-center">
            <ImageIcon className="w-7 h-7 text-sage-green" />
          </div>
          <p className="text-gray-600 font-medium mb-1">No images uploaded yet.</p>
          <p className="text-gray-400 text-sm">Upload images to this category.</p>
        </div>
      ) : (
        <GalleryImageGrid
          images={images}
          onView={setLightboxUrl}
          onEdit={setEditingImage}
          onDelete={setImageToDelete}
        />
      )}

      {/* Edit Category Modal */}
      <AnimatePresence>
        {showEditForm && (
          <CategoryFormModal
            key={category._id}
            category={category}
            onClose={() => setShowEditForm(false)}
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
            loading={deletingCategory}
            onConfirm={handleDeleteCategory}
            onCancel={() => setDeletingCategory(false)}
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

export default AdminGalleryCategory;
