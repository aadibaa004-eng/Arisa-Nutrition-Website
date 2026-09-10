import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { fadeInUp } from '../../utils/animations';
import type { ReviewScreenshot } from '../../services/api';

interface TestimonialCardProps {
  name: string;
  rating: number;
  text: string;
  avatar: string;
  screenshots?: ReviewScreenshot[];
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  rating,
  text,
  avatar,
  screenshots = [],
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const hasImages = screenshots.length > 0;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + screenshots.length) % screenshots.length);
  };
  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % screenshots.length);
  };

  return (
    <>
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -4 }}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full border border-gray-100 flex flex-col min-w-[300px] overflow-hidden"
      >
        {/* ─── Screenshot as hero image ──────────────────────────────────── */}
        {hasImages && (
          <div className="relative">
            <button
              onClick={() => openLightbox(0)}
              className="block w-full"
            >
              <img
                src={screenshots[0].imageUrl}
                alt={screenshots[0].caption || `${name}'s review`}
                className="w-full h-56 object-cover"
                loading="lazy"
              />
            </button>
            {/* Multiple image indicator */}
            {screenshots.length > 1 && (
              <button
                onClick={() => openLightbox(0)}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full hover:bg-black/80 transition-colors"
              >
                1 / {screenshots.length}
              </button>
            )}
          </div>
        )}

        <div className="p-6 flex flex-col flex-1">
          {/* ─── Stars ─────────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between mb-3">
            {!hasImages && (
              <div className="w-9 h-9 bg-sage-green/10 rounded-xl flex items-center justify-center">
                <Quote className="w-4 h-4 text-sage-green fill-sage-green" />
              </div>
            )}
            <div className={`flex gap-0.5 ${hasImages ? 'ml-auto' : ''}`}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
              ))}
            </div>
          </div>

          {/* ─── Review text ───────────────────────────────────────────────── */}
          <p className="text-gray-600 leading-relaxed text-sm flex-1 mb-5">
            "{text}"
          </p>

          {/* ─── Thumbnail strip (if multiple images) ──────────────────────── */}
          {screenshots.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-4 mb-1 -mx-1 px-1">
              {screenshots.map((s, i) => (
                <button
                  key={s._id}
                  onClick={() => openLightbox(i)}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === 0 ? 'border-sage-green' : 'border-gray-200 hover:border-sage-green'
                  }`}
                >
                  <img
                    src={s.imageUrl}
                    alt={s.caption || 'Review screenshot'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}

          {/* ─── Author ────────────────────────────────────────────────────── */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-green/30 to-blush-pink/30 flex items-center justify-center overflow-hidden flex-shrink-0">
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const initial = name && name.length > 0 ? name.charAt(0) : 'C';
                  target.parentElement!.innerHTML = `<span class="text-gray-600 font-bold text-sm">${initial}</span>`;
                }}
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{name || 'Anonymous'}</p>
              <p className="text-gray-400 text-xs">Verified Client</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Lightbox ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && screenshots[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {screenshots.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={screenshots[lightboxIndex].imageUrl}
              alt={screenshots[lightboxIndex].caption || 'Review screenshot'}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {screenshots[lightboxIndex].caption && (
              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm bg-black/60 px-4 py-2 rounded-full">
                {screenshots[lightboxIndex].caption}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TestimonialCard;
