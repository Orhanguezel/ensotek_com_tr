import api from '@/lib/axios';
import type { Reference, ApiListResponse } from '@/lib/api';

export type { Reference };

export const referencesService = {
  getAll: async (params?: { locale?: string; limit?: number; page?: number; is_active?: number }) =>
    api.get<ApiListResponse<Reference> | Reference[]>('/references', {
      params: { is_active: 1, ...params },
    }),

  getBySlug: async (slug: string, locale?: string) =>
    api.get<Reference>(`/references/by-slug/${slug}`, {
      params: { ...(locale ? { locale } : {}) },
    }),
};
