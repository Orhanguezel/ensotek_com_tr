import type { MetadataRoute } from 'next';
import { API_BASE_URL, SITE_URL } from '@/lib/utils';
import { AVAILABLE_LOCALES } from '@/i18n/locales';
import type { BlogPost } from '@/lib/api';
import { FALLBACK_BLOG_POSTS } from '@/data/blog-posts';

const STATIC_PATHS = ['', '/products', '/blog', '/gallery', '/references', '/contact', '/hesap-makinesi'];

function localizedPath(locale: string, path: string): string {
  if (locale !== 'tr') return path;
  const map: Record<string, string> = {
    '/products': '/urunler',
    '/gallery': '/galeri',
    '/references': '/referanslar',
    '/contact': '/iletisim',
  };
  return map[path] ?? path;
}

function localeAlternates(path: string): Record<string, string> {
  return {
    tr: `${SITE_URL}/tr${localizedPath('tr', path)}`,
    en: `${SITE_URL}/en${localizedPath('en', path)}`,
    'x-default': `${SITE_URL}/tr${localizedPath('tr', path)}`,
  };
}

async function fetchBlogPosts(locale: string): Promise<BlogPost[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/custom-pages?module_key=blog&is_published=1&limit=250&locale=${locale}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return locale === 'tr' ? FALLBACK_BLOG_POSTS : [];
    const data = await res.json();
    const items = Array.isArray(data) ? data : (data as { items?: BlogPost[] })?.items ?? [];
    return items.length > 0 ? items : locale === 'tr' ? FALLBACK_BLOG_POSTS : [];
  } catch {
    return locale === 'tr' ? FALLBACK_BLOG_POSTS : [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of AVAILABLE_LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${SITE_URL}/${locale}${localizedPath(locale, path)}`,
        alternates: {
          languages: localeAlternates(path),
        },
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1.0 : 0.8,
      });
    }

    const blogPosts = await fetchBlogPosts(locale);
    for (const post of blogPosts) {
      const path = `/blog/${post.slug}`;
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        alternates: {
          languages: localeAlternates(path),
        },
        lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
