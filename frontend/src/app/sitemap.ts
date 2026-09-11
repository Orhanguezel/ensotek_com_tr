import type { MetadataRoute } from 'next';
import { AVAILABLE_LOCALES } from '@/i18n/locales';
import { publicUrl, publicRecords, type PublicSection } from '@/lib/public-seo';

// Icerik (blog/galeri/urun) admin panelden degistiginde sitemap yeniden build gerektirmesin.
export const revalidate = 300;

const STATIC_PATHS = ['', '/about', '/products', '/blog', '/gallery', '/references', '/contact', '/offer', '/hesap-makinesi'];
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  for (const path of STATIC_PATHS) {
    const languages = Object.fromEntries(AVAILABLE_LOCALES.map(locale => [locale, publicUrl(locale, path)]));
    if (languages.tr) languages['x-default'] = languages.tr;
    for (const locale of AVAILABLE_LOCALES) entries.push({url: publicUrl(locale, path), alternates: {languages}, changeFrequency: path ? 'monthly' : 'weekly', priority: path ? 0.8 : 1});
  }
  for (const section of ['products', 'gallery', 'blog'] as PublicSection[]) {
    const groups = await Promise.all(AVAILABLE_LOCALES.map(async locale => ({locale, rows: await publicRecords(section, locale)})));
    for (const {locale, rows} of groups) for (const row of rows) {
      const languages: Record<string,string> = {};
      for (const group of groups) {
        const translated = group.rows.find(item => item.id === row.id);
        if (translated) languages[group.locale] = publicUrl(group.locale, `/${section}/${encodeURIComponent(translated.slug)}`);
      }
      if (languages.tr) languages['x-default'] = languages.tr;
      const modified = row.updated_at ? new Date(row.updated_at) : undefined;
      entries.push({url: publicUrl(locale, `/${section}/${encodeURIComponent(row.slug)}`), alternates: {languages}, ...(modified && !Number.isNaN(modified.getTime()) ? {lastModified: modified} : {}), changeFrequency: 'monthly', priority: 0.7});
    }
  }
  return entries;
}
