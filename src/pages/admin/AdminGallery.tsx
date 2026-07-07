import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X, AlertCircle, Loader, Upload, Pencil, Check, ZoomIn } from 'lucide-react';
import { api, GalleryItem } from '../../services/api';

const AdminGallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);
  const [editCaption, setEditCaption] = useState('');
  const [saving, setSaving] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const loadItems = () => {
    setLoading(true);
    api.gallery.list()
      .then((res: any) => {
        console.log('🖼️ Gallery list response:', JSON.stringify(res, null, 2));
        const list = Array.isArray(res) ? res
          : Array.isArray(res?.data) ? res.data
          : Array.isArray(res?.data?.images) ? res.data.images
          : Array.isArray(res?.images) ? res.images
          : Array.isArray(res?.items) ? res.items
          : [];
        // Normalize: use image field from backend schema
        const normalized = list.map((item: any) => ({
          ...item,
          url: item.url || item.image || item.imageUrl,
        }));
        console.log('🖼️ Parsed gallery items:', normalized.length);
        setItems(normalized);
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadItems(); }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      console.log('📸 Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
      const uploadRes = await api.upload(file);
      console.log('✅ Upload response:', JSON.stringify(uploadRes, null, 2));

      const imageUrl = uploadRes?.url;
      const publicId = uploadRes?.publicId;
      if (!imageUrl) throw new Error('No URL returned from upload');

      console.log('📸 Adding to gallery — image:', imageUrl, 'publicId:', publicId);
      await api.gallery.add({ image: imageUrl, type: 'general' } as any);

      await loadItems();
      setError('');
    } catch (err: any) {
      console.error('❌ Upload error:', err);
      setError('Upload failed: ' + (err.message || 'Unknown error'));
    } finally {
      setUploading(false);
      setDragActive(false);
    }
  };

  // Drag handlers
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
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      uploadFile(file);
    } else {
      setError('Please drop an image file');
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await api.gallery.delete(id);
      setItems((i) => i.filter((x) => x._id !== id));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveCaption = async () => {
    if (!editItem) return;
    setSaving(true);
    try {
      await api.gallery.update(editItem._id, { caption: editCaption });
      setItems((i) => i.map((x) => x._id === editItem._id ? { ...x, caption: editCaption } : x));
      setEditItem(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Gallery</h1>
          <p className="text-gray-400 text-sm">Upload and manage your photo gallery</p>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 bg-sage-green hover:bg-olive-green text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
        >
          {uploading ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? 'Uploading…' : 'Upload Photo'}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
          <button onClick={() => setError('')} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Edit Caption Modal */}
      <AnimatePresence>
        {editItem && (
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
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-bold">Edit Caption</h2>
                <button onClick={() => setEditItem(null)} className="text-gray-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <img src={editItem.url} alt="" className="w-full h-40 object-cover rounded-xl mb-4" />
              <input
                type="text"
                value={editCaption}
                onChange={(e) => setEditCaption(e.target.value)}
                placeholder="Add a caption..."
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sage-green mb-4"
              />
              <div className="flex gap-3">
                <button onClick={() => setEditItem(null)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl text-sm font-semibold transition-colors">
                  Cancel
                </button>
                <button onClick={handleSaveCaption} disabled={saving} className="flex-1 bg-sage-green hover:bg-olive-green text-white py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                  {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Central drag-and-drop zone */}
      <div
        ref={dropZoneRef}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`mb-6 flex flex-col items-center justify-center gap-2 py-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
          dragActive
            ? 'border-sage-green bg-sage-green/10 scale-[1.01]'
            : 'border-gray-700 hover:border-gray-500 hover:bg-gray-800/30'
        }`}
      >
        {uploading ? (
          <>
            <Loader className="w-8 h-8 text-sage-green animate-spin" />
            <p className="text-gray-400 text-sm">Uploading…</p>
          </>
        ) : (
          <>
            <Upload className={`w-8 h-8 transition-colors ${dragActive ? 'text-sage-green' : 'text-gray-500'}`} />
            <p className={`text-sm font-medium transition-colors ${dragActive ? 'text-sage-green' : 'text-gray-400'}`}>
              {dragActive ? 'Drop to upload' : 'Drag & drop an image here, or click to browse'}
            </p>
            <p className="text-gray-600 text-xs">PNG, JPG, WEBP supported</p>
          </>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-sage-green border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-sm">No photos yet. Upload your first image above.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <motion.div key={item._id} layout className="relative group rounded-xl overflow-hidden bg-gray-900 border border-gray-800 aspect-square">
              <img src={item.url ?? item.image} alt={item.caption || ''} className="w-full h-full object-cover" loading="lazy" decoding="async" />
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                  <p className="text-white text-xs truncate">{item.caption}</p>
                </div>
              )}
              {/* Hover actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => setLightboxUrl(item.url ?? item.image)}
                  className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg transition-all"
                  title="View full size"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setEditItem(item); setEditCaption(item.caption || ''); }}
                  className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg transition-all"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={deletingId === item._id}
                  className="p-2 bg-red-500/20 hover:bg-red-500/40 backdrop-blur-sm text-red-400 rounded-lg transition-all disabled:opacity-40"
                >
                  {deletingId === item._id ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxUrl && <Lightbox url={lightboxUrl!} onClose={() => setLightboxUrl(null)} />}
      </AnimatePresence>
    </>
  );
};

// Lightbox component
const Lightbox: React.FC<{ url: string; onClose: () => void }> = ({ url, onClose }) => (
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

export default AdminGallery;
