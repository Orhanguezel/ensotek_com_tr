import api from '@/lib/axios';
import type { Gallery, ApiListResponse } from '@/lib/api';

export type { Gallery };

export const galleryService = {
  getAll: async (params?: { locale?: string; limit?: number; page?: number; is_active?: number }) =>
    api.get<ApiListResponse<Gallery> | Gallery[]>('/gallery', {
      params: { is_active: 1, ...params },
    }),

  getBySlug: async (slug: string, locale?: string) =>
    api.get<Gallery>(`/gallery/by-slug/${slug}`, {
      params: { ...(locale ? { locale } : {}) },
    }),
};
