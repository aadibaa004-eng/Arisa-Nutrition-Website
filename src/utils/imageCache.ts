/**
 * Simple in-memory cache for API responses.
 * Prevents duplicate network requests when multiple components mount.
 */
const cache = new Map<string, { data: any; ts: number }>();
const TTL = 5 * 60 * 1000; // 5 minutes

export async function cachedFetch(url: string): Promise<any> {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.ts < TTL) return cached.data;

  const res = await fetch(url);
  const data = await res.json();
  cache.set(url, { data, ts: Date.now() });
  return data;
}

/**
 * Optimise a Cloudinary URL by injecting auto-format, auto-quality,
 * and an optional max-width transformation — massively reduces file size.
 */
export function optimizeCloudinaryUrl(url: string, width = 800): string {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  // Insert transformation before /upload/
  return url.replace(
    '/upload/',
    `/upload/f_auto,q_auto,w_${width},c_limit/`
  );
}
