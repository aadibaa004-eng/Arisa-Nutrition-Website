const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Shared multipart uploader for category + uncategorized gallery images
async function postGalleryImages(
  path: string,
  files: File[],
  metadata?: { title?: string; description?: string }[]
): Promise<CategoryImage[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));
  if (metadata && metadata.length > 0) {
    formData.append('metadata', JSON.stringify(metadata));
  }
  console.group('📸 Gallery Images Upload Request');
  console.log('Endpoint:', `${API_BASE}${path}`);
  files.forEach((f) => console.log('File:', f.name, '| Size:', f.size, '| Type:', f.type));
  if (metadata) console.log('Metadata:', JSON.stringify(metadata));
  console.groupEnd();
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to upload images');
  const created = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.images)
    ? data.data.images
    : [];
  return created as CategoryImage[];
}

async function request<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const method = options.method || 'GET';
  const url = `${API_BASE}${path}`;
  
  // Log request details
  console.group(`🔵 API Request: ${method} ${path}`);
  console.log('URL:', url);
  console.log('Method:', method);
  if (options.body) {
    try {
      const bodyData = JSON.parse(options.body as string);
      console.log('Request Body:', JSON.stringify(bodyData, null, 2));
    } catch {
      console.log('Request Body:', options.body);
    }
  }
  console.groupEnd();

  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await res.json();
  
  // Log response details
  console.group(`${res.ok ? '✅' : '❌'} API Response: ${method} ${path}`);
  console.log('Status:', res.status);
  console.log('Response Data:', JSON.stringify(data, null, 2));
  console.groupEnd();
  
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data as T;
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    logout: () => request('/auth/logout', { method: 'POST' }),
    me: () => request('/auth/me'),
  },

  blogs: {
    list: () => request<{ data: BlogItem[] }>('/blogs'),
    get: (id: string) => request<{ data: BlogItem }>(`/blogs/${id}`),
    create: (data: Partial<BlogItem>) =>
      request('/blogs', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<BlogItem>) =>
      request(`/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request(`/blogs/${id}`, { method: 'DELETE' }),
  },

  reviews: {
    list: () => request<{ data: ReviewItem[] }>('/reviews'),
    listUnapproved: () => request<{ data: ReviewItem[] }>('/reviews?approved=false'),
    create: (data: Partial<ReviewItem>) =>
      request('/reviews', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<ReviewItem>) =>
      request(`/reviews/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request(`/reviews/${id}`, { method: 'DELETE' }),
  },

  gallery: {
    list: () => request<{ data: GalleryItem[] }>('/gallery'),
    add: (data: Partial<GalleryItem>) =>
      request('/gallery', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<GalleryItem>) =>
      request(`/gallery/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request(`/gallery/${id}`, { method: 'DELETE' }),
  },

  galleryCategories: {
    list: () =>
      request<{ success: boolean; data: GalleryCategory[] }>('/gallery/categories'),
    get: (id: string, includeImages = false) =>
      request<{ success: boolean; data: GalleryCategory & { images?: CategoryImage[] } }>(
        `/gallery/categories/${id}${includeImages ? '?include_images=true' : ''}`
      ),
    create: (data: { name: string; isActive?: boolean }) =>
      request<{ success: boolean; message: string; data: GalleryCategory }>(
        '/gallery/categories',
        { method: 'POST', body: JSON.stringify(data) }
      ),
    update: (id: string, data: { name?: string; isActive?: boolean }) =>
      request<{ success: boolean; message: string; data: GalleryCategory }>(
        `/gallery/categories/${id}`,
        { method: 'PUT', body: JSON.stringify(data) }
      ),
    // Backend status endpoint requires snake_case
    setStatus: (id: string, isActive: boolean) =>
      request<{ success: boolean; message: string; data: GalleryCategory }>(
        `/gallery/categories/${id}/status`,
        { method: 'PATCH', body: JSON.stringify({ is_active: isActive }) }
      ),
    remove: (id: string) =>
      request<{ success: boolean; message: string; data: { deletedImages: number } }>(
        `/gallery/categories/${id}`,
        { method: 'DELETE' }
      ),
    listImages: (categoryId: string) =>
      request<{ success: boolean; data: CategoryImage[] }>(
        `/gallery/categories/${categoryId}/images`
      ),
    uploadImages: (categoryId: string, files: File[], metadata?: { title?: string; description?: string }[]) =>
      postGalleryImages(`/gallery/categories/${categoryId}/images`, files, metadata),
    // Updates an image's title and/or description (metadata only)
    updateImage: (imageId: string, data: { title?: string; description?: string }) =>
      request<{ success: boolean; message: string; data: CategoryImage }>(
        `/gallery/images/${imageId}`,
        { method: 'PATCH', body: JSON.stringify(data) }
      ),
    deleteImage: (imageId: string) =>
      request(`/gallery/images/${imageId}`, { method: 'DELETE' }),
  },

  // Images with no category assignment (shown outside categories)
  galleryUncategorized: {
    list: () =>
      request<{ success: boolean; data: CategoryImage[] }>('/gallery/images'),
    uploadImages: (files: File[], metadata?: { title?: string; description?: string }[]) =>
      postGalleryImages('/gallery/images', files, metadata),
  },

  contact: {
    list: () => request<{ data: ContactItem[] }>('/contact'),
    submit: (data: any) =>
      request('/contact', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id: string, status: string) =>
      request(`/contact/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
    delete: (id: string) => request(`/contact/${id}`, { method: 'DELETE' }),
  },

  upload: async (file: File): Promise<{ url: string; publicId?: string }> => {
    const formData = new FormData();
    formData.append('image', file);
    console.group('📸 Upload Request');
    console.log('File name:', file.name, '| Size:', file.size, '| Type:', file.type);
    console.log('Endpoint:', `${API_BASE}/upload`);
    console.groupEnd();
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    const data = await res.json();
    console.group(`${res.ok ? '✅' : '❌'} Upload Response`);
    console.log('Status:', res.status);
    console.log('Full response:', JSON.stringify(data, null, 2));
    console.groupEnd();
    if (!res.ok) throw new Error(data.message || data.error || JSON.stringify(data) || 'Failed to upload image');
    // Extract imageUrl from nested response: { data: { imageUrl, publicId } }
    const imageUrl = data?.data?.imageUrl || data?.imageUrl || data?.url;
    const publicId = data?.data?.publicId || data?.publicId;
    if (!imageUrl) throw new Error('No image URL in upload response');
    return { url: imageUrl, publicId };
  },

  dashboard: () => request<DashboardStats>('/dashboard'),
};

// ─── Types ─────────────────────────────────────────────────────────────────

export interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  author: string;
  content: string;
  excerpt: string;
  category: string;
  coverImage?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewItem {
  _id: string;
  clientName: string;
  rating: number;
  review: string;
  city: string;
  approved: boolean;
  createdAt: string;
}

export interface GalleryItem {
  _id: string;
  image: string;
  url?: string; // normalized from image on the frontend
  type: 'before' | 'after' | 'general';
  caption?: string;
  createdAt: string;
}

export interface GalleryCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  imageCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryImage {
  _id: string;
  categoryId?: string | null;
  imageUrl: string;
  publicId?: string;
  title?: string;
  description?: string;
  createdAt: string;
}

export interface ContactItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

export interface DashboardStats {
  data: {
    blogs: { total: number; published: number };
    reviews: { total: number; approved: number };
    gallery: { total: number };
    contacts: { total: number; new: number };
  };
}
