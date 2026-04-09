import api from '@/lib/axios';
import type { Product, ApiListResponse } from '@/lib/api';

export type { Product };

export const productsService = {
  getAll: async (params?: {
    locale?: string;
    item_type?: string;
    category_id?: string;
    limit?: number;
    page?: number;
    is_active?: number;
  }) =>
    api.get<ApiListResponse<Product> | Product[]>('/products', {
      params: { item_type: 'cooling_tower', is_active: 1, ...params },
    }),

  getBySlug: async (slug: string, locale?: string) =>
    api.get<Product>(`/products/by-slug/${slug}`, {
      params: { item_type: 'cooling_tower', ...(locale ? { locale } : {}) },
    }),

  getById: async (id: string, locale?: string) =>
    api.get<Product>(`/products/${id}`, {
      params: { ...(locale ? { locale } : {}) },
    }),
};
