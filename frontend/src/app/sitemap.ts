import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/utils';
import { AVAILABLE_LOCALES } from '@/i18n/locales';

const STATIC_PATHS = ['', '/products', '/gallery', '/references', '/contact'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of AVAILABLE_LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
