import 'server-only';
import { getLocaleSettings, API_BASE_URL } from './locale-settings';

type JsonLike = string | number | boolean | null | JsonLike[] | { [key: string]: JsonLike };
type SettingRow = { value: JsonLike } | null;

export async function fetchActiveLocales(): Promise<string[]> {
  const { activeLocales } = await getLocaleSettings();
  return activeLocales;
}

export async function getDefaultLocale(): Promise<string> {
  const { defaultLocale } = await getLocaleSettings();
  return defaultLocale;
}

export async function fetchSetting(
  key: string,
  locale: string,
  options?: { revalidate?: number },
): Promise<SettingRow> {
  try {
    const url = `${API_BASE_URL}/site_settings/${encodeURIComponent(key)}?locale=${encodeURIComponent(locale)}&prefix=ensotek_com_tr__`;
    const res = await fetch(url, {
      next: { revalidate: options?.revalidate ?? 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data ?? null;
  } catch {
    return null;
  }
}

export async function fetchMenuItems(locale: string): Promise<Record<string, unknown>[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/menu_items?locale=${encodeURIComponent(locale)}&is_active=1&nested=1`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : ((data as Record<string, unknown>)?.items as Record<string, unknown>[]) ?? [];
  } catch {
    return [];
  }
}

export async function fetchFooterSections(locale: string): Promise<Record<string, unknown>[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/footer_sections?locale=${encodeURIComponent(locale)}&is_active=1`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : ((data as Record<string, unknown>)?.items as Record<string, unknown>[]) ?? [];
  } catch {
    return [];
  }
}
