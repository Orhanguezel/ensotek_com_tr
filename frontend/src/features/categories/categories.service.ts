import api from '@/lib/axios';
import type { Category, ApiListResponse } from '@/lib/api';

export type { Category };

export const categoriesService = {
  getAll: async (params?: { locale?: string; is_active?: number }) =>
    api.get<ApiListResponse<Category> | Category[]>('/categories', {
      params: { is_active: 1, ...params },
    }),

  getById: async (id: string, locale?: string) =>
    api.get<Category>(`/categories/${id}`, {
      params: { ...(locale ? { locale } : {}) },
    }),
};
