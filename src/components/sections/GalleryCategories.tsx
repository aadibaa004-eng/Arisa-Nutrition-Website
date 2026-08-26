import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cachedFetch, optimizeCloudinaryUrl } from '../../utils/imageCache';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

interface CategoryImageData {
  _id: string;
  imageUrl: string;
  title?: string;
  description?: string;
}

interface CategoryWithImages {
  _id: string;
  name: string;
  description?: string;
  images: CategoryImageData[];
}

// ─── Animation variants ──────────────────────────────────────────────────────

const badgeIn = {
  hidden: { opacity: 0, scale: 0.6, rotate: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 16 },
  },
};

const wordReveal = {
  hidden: { opacity: 0, y: 34, filter: 'blur(10px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const descriptionReveal = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 0.35, duration: 0.7, ease: 'easeOut' as const },
  },
};

const dividerGrow = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const cardFlipIn = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 90,
    rotateX: -28,
    scale: 0.82,
    // alternate the entrance direction for a playful rhythm
    x: i % 2 === 0 ? -46 : 46,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 120, damping: 15, delay: (i % 4) * 0.11 },
  }),
};

const captionReveal = {
  rest: { y: 10, opacity: 0 },
  hover: { y: 0, opacity: 1, transition: { duration: 0.3 } },
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Dynamic gallery categories — rendered directly on the homepage.
 * Each enabled category (as returned by the public API) becomes its own
 * section immediately after the About section. Renders nothing when there
 * are no active categories or on load/error.
 */
const GalleryCategories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryWithImages[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // Public endpoint only returns active categories
        const res = await cachedFetch(`${API_BASE}/gallery/categories`);
        const list: any[] = Array.isArray(res?.data) ? res.data : [];

        // Fetch each category's images in parallel (cachedFetch dedupes repeats)
        const withImages = await Promise.all(
          list.map(async (cat: any) => {
            try {
              const imgRes = await cachedFetch(
                `${API_BASE}/gallery/categories/${cat._id}/images`
              );
              return {
                ...cat,
                images: (Array.isArray(imgRes?.data) ? imgRes.data : []) as CategoryImageData[],
              };
            } catch {
              return { ...cat, images: [] as CategoryImageData[] };
            }
          })
        );

        if (!cancelled) {
          setCategories(withImages.filter((c) => c.images.length > 0));
        }
      } catch {
        // Failed to load — render nothing so the homepage stays intact
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (categories.length === 0) return null;

  return (
    <>
      {categories.map((category, index) => (
        <section
          key={category._id}
          className={`relative overflow-hidden py-24 ${index % 2 === 0 ? 'bg-cream' : 'bg-white'}`}
        >
          {/* Decorative floating blobs */}
          <motion.div
            aria-hidden
            className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-sage-green/10 blur-3xl pointer-events-none"
            animate={{ y: [-12, 14, -12], x: [0, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-28 -right-20 w-96 h-96 rounded-full bg-blush-pink/10 blur-3xl pointer-events-none"
            animate={{ y: [10, -16, 10], x: [0, -12, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* ── Section header ── */}
            <div className="text-center mb-16">
              {/* Badge with orbiting sparkle */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                variants={badgeIn}
                className="inline-flex items-center gap-2 px-5 py-2 bg-sage-green/10 text-sage-green font-medium text-sm rounded-full mb-6 relative"
              >
                <motion.span
                  animate={{ rotate: [0, 18, -14, 0], scale: [1, 1.25, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.4 }}
                  className="inline-block"
                >
                  ✨
                </motion.span>
                Gallery
                <motion.span
                  aria-hidden
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-1.5 -right-1.5 text-[10px]"
                >
                  🌿
                </motion.span>
              </motion.div>

              {/* Title — word-by-word blur-rise with animated gradient ink */}
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 leading-tight"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                aria-label={category.name}
              >
                {category.name.split(' ').map((word, wi) => (
                  <motion.span
                    key={`${category._id}-${wi}`}
                    custom={wi}
                    variants={wordReveal}
                    className="inline-block mr-[0.3em] last:mr-0 bg-gradient-to-r from-sage-green via-olive-green to-muted-rose bg-clip-text text-transparent animate-gradient-text"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>

              {/* Animated divider */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                variants={dividerGrow}
                className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-sage-green via-blush-pink to-muted-rose origin-center mb-5"
              />

              {/* Description — blur-fade rise */}
              {category.description && (
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.6 }}
                  variants={descriptionReveal}
                  className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed"
                >
                  {category.description}
                </motion.p>
              )}
            </div>

            {/* ── Responsive image grid — cards flip in from alternating sides ── */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 lg:gap-8"
              style={{ perspective: 1400 }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {category.images.map((image, i) => (
                <motion.div
                  key={image._id}
                  custom={i}
                  variants={cardFlipIn}
                  whileHover={{
                    y: -12,
                    rotate: i % 2 === 0 ? -1.2 : 1.2,
                    transition: { type: 'spring', stiffness: 300, damping: 18 },
                  }}
                  className="group cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square shadow-lg hover:shadow-2xl transition-shadow duration-500">
                    <img
                      src={optimizeCloudinaryUrl(image.imageUrl, 600)}
                      alt={image.title || category.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Bottom gradient wash — deepens on hover */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Shine sweep on hover */}
                    <div className="shine-sweep absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
                    {/* Glassy title chip slides up on hover */}
                    {image.title && (
                      <div className="absolute bottom-3 left-3 right-3">
                        <motion.p
                          initial="rest"
                          whileHover="hover"
                          variants={captionReveal}
                          animate="rest"
                          className="inline-block max-w-full bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full truncate shadow-sm"
                        >
                          {image.title}
                        </motion.p>
                      </div>
                    )}
                  </div>

                  {/* Caption below the image */}
                  {(image.title || image.description) && (
                    <div className="mt-3 text-center">
                      {image.title && (
                        <p className="text-sm font-medium text-gray-800 group-hover:text-sage-green transition-colors duration-300 truncate">
                          {image.title}
                        </p>
                      )}
                      {image.description && (
                        <p className={`text-xs text-gray-500 leading-relaxed ${image.title ? 'mt-1' : ''}`}>
                          {image.description}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      ))}
    </>
  );
};

export default GalleryCategories;
