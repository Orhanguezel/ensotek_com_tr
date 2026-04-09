import { QueryClient } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient(): QueryClient {
  if (typeof window === 'undefined') return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export const queryKeys = {
  categories: {
    all: ['categories'] as const,
    list: (params?: Record<string, unknown>) => ['categories', 'list', params] as const,
    bySlug: (slug: string) => ['categories', 'slug', slug] as const,
  },
  products: {
    all: ['products'] as const,
    list: (params?: Record<string, unknown>) => ['products', 'list', params] as const,
    detail: (slug: string) => ['products', 'detail', slug] as const,
  },
  gallery: {
    all: ['gallery'] as const,
    list: (params?: Record<string, unknown>) => ['gallery', 'list', params] as const,
    detail: (slug: string) => ['gallery', 'detail', slug] as const,
  },
  references: {
    all: ['references'] as const,
    list: (params?: Record<string, unknown>) => ['references', 'list', params] as const,
  },
  menuItems: {
    all: ['menu-items'] as const,
    list: (locale?: string) => ['menu-items', 'list', locale] as const,
  },
  footerSections: {
    all: ['footer-sections'] as const,
    list: (locale?: string) => ['footer-sections', 'list', locale] as const,
  },
  siteSettings: {
    all: ['site-settings'] as const,
    byKey: (key: string, locale?: string) => ['site-settings', key, locale] as const,
  },
  contact: {
    all: ['contact'] as const,
  },
  newsletter: {
    all: ['newsletter'] as const,
  },
} as const;
