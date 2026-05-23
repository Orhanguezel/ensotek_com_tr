import { AVAILABLE_LOCALES, FALLBACK_LOCALE } from './locales';
import { API_BASE_URL as RESOLVED_API_BASE_URL } from '@/lib/utils';

export const API_BASE_URL = RESOLVED_API_BASE_URL;
export function serverApiUrl(): string { return RESOLVED_API_BASE_URL; }

type LocaleItem = {
  code?: unknown;
  label?: unknown;
  is_active?: unknown;
  is_default?: unknown;
};

type RuntimeLocaleSettings = {
  activeLocales: string[];
  defaultLocale: string;
};

function toShortLocale(value: unknown): string {
  const normalized = String(value || '').trim().toLowerCase().replace('_', '-');
  return normalized.split('-')[0]?.trim() || '';
}

function parseMaybeJson(value: unknown): unknown {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (!trimmed) return value;
  if (
    (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  ) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return value;
    }
  }
  return value;
}

function normalizeAppLocales(value: unknown): { activeLocales: string[]; defaultLocale?: string } {
  const parsed = parseMaybeJson(value);
  const rawItems = Array.isArray(parsed) ? parsed : [];
  const activeLocales: string[] = [];
  let defaultLocale = '';

  for (const item of rawItems as LocaleItem[]) {
    const code = toShortLocale(item?.code ?? item);
    if (!code || !AVAILABLE_LOCALES.includes(code)) continue;
    if (item?.is_active === false) continue;
    if (!activeLocales.includes(code)) activeLocales.push(code);
    if (!defaultLocale && item?.is_default === true) defaultLocale = code;
  }

  return { activeLocales, defaultLocale: defaultLocale || undefined };
}

async function fetchSettingValue(key: string): Promise<unknown> {
  const res = await fetch(
    `${serverApiUrl()}/site_settings/${encodeURIComponent(key)}?prefix=ensotek_com_tr__`,
    { next: { revalidate: 300 } },
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data?.value ?? null;
}

export async function getLocaleSettings(): Promise<RuntimeLocaleSettings> {
  try {
    const appLocalesValue = await fetchSettingValue('app_locales');
    const parsedLocales = normalizeAppLocales(appLocalesValue);
    const activeLocales = parsedLocales.activeLocales.length
      ? parsedLocales.activeLocales
      : AVAILABLE_LOCALES.filter((locale) => locale === FALLBACK_LOCALE);

    const normalizedDefault = activeLocales.includes(FALLBACK_LOCALE)
      ? FALLBACK_LOCALE
      : activeLocales[0] || FALLBACK_LOCALE;

    return { activeLocales, defaultLocale: normalizedDefault };
  } catch {
    return {
      activeLocales: AVAILABLE_LOCALES.filter((locale) => locale === FALLBACK_LOCALE),
      defaultLocale: FALLBACK_LOCALE,
    };
  }
}
