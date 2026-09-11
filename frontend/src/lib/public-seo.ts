import { routing } from '@/i18n/routing';
import { SITE_URL, API_BASE_URL } from './utils';
import { cache } from 'react';

export function publicUrl(locale: string, path: string): string {
  const [segment, ...rest] = path.replace(/^\//, '').split('/');
  const key = segment ? `/${segment}` : '/';
  const mapping = (routing.pathnames as Record<string, string | Record<string, string>>)[key];
  const localized = typeof mapping === 'string' ? mapping : mapping?.[locale] ?? key;
  return `${SITE_URL}/${locale}${localized === '/' ? '' : localized}${rest.length ? '/' + rest.join('/') : ''}`;
}
export type PublicRecord = { id: string; slug: string; updated_at?: string; };
export type PublicSection = 'products' | 'gallery' | 'blog';
export const publicRecords = cache(async (section: PublicSection, locale: string): Promise<PublicRecord[]> => {
  const endpoints = section === 'products' ? ['products?item_type=product&is_active=1', 'products?item_type=sparepart&is_active=1'] : section === 'gallery' ? ['galleries?is_active=true'] : ['custom-pages?module_key=blog&is_published=1'];
  const groups = await Promise.all(endpoints.map(async endpoint => {
    const rows: PublicRecord[] = [];
    for (let offset = 0; ; offset += 200) {
      const res = await fetch(`${API_BASE_URL}/${endpoint}&locale=${locale}&limit=200&offset=${offset}`, { next: { revalidate: 300 }, headers: {'Accept-Language': locale, 'x-locale': locale} });
      if (!res.ok) throw new Error(`Public inventory ${section}: ${res.status}`);
      const data = await res.json();
      const batch: PublicRecord[] = Array.isArray(data) ? data : data.items ?? [];
      rows.push(...batch.filter(item => item.slug));
      if (batch.length < 200) break;
    }
    return rows;
  }));
  return [...new Map(groups.flat().map(item => [item.id, item])).values()];
});
export async function recordLanguages(section: PublicSection, id: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    const row = (await publicRecords(section, locale)).find(item => item.id === id);
    if (row) languages[locale] = publicUrl(locale, `/${section}/${encodeURIComponent(row.slug)}`);
  }
  if (languages.tr) languages['x-default'] = languages.tr;
  return languages;
}
