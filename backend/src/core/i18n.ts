// src/core/i18n.ts
// Ensotek COM TR – Dynamic i18n core (LOCALES runtime from site_settings)

import { db } from '@/db/client';
import { siteSettings } from '@agro/shared-backend/modules/siteSettings/schema';
import { and, eq } from 'drizzle-orm';

export const APP_LOCALES_SETTING_KEY = 'app_locales';
export const DEFAULT_LOCALE_SETTING_KEY = 'default_locale';

export function normalizeLocale(input?: string | null): string | undefined {
  if (!input) return undefined;
  const s = String(input).trim().toLowerCase().replace('_', '-');
  if (!s) return undefined;
  const base = s.split('-')[0];
  return base || undefined;
}

const initialLocaleCodes = (process.env.APP_LOCALES || 'tr,en,de')
  .split(',')
  .map((s) => normalizeLocale(s) || '')
  .filter(Boolean);

const uniqueInitial: string[] = [];
for (const l of initialLocaleCodes) {
  if (!uniqueInitial.includes(l)) uniqueInitial.push(l);
}

export const LOCALES: string[] = uniqueInitial.length ? uniqueInitial : ['tr'];
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale =
  (normalizeLocale(process.env.DEFAULT_LOCALE) as Locale) ||
  (LOCALES[0] as Locale) ||
  ('tr' as Locale);

export function isSupported(l?: string | null): l is Locale {
  if (!l) return false;
  const n = normalizeLocale(l);
  if (!n) return false;
  return LOCALES.includes(n);
}

function parseAcceptLanguage(header?: string | null): string[] {
  if (!header) return [];
  return String(header)
    .split(',')
    .map((part) => {
      const [tag, ...rest] = part.trim().split(';');
      const qMatch = rest.find((p) => p.trim().startsWith('q='));
      const q = qMatch ? Number(qMatch.split('=')[1]) : 1;
      return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 1 };
    })
    .filter((x) => x.tag)
    .sort((a, b) => b.q - a.q)
    .map((x) => x.tag);
}

export function bestFromAcceptLanguage(header?: string | null): Locale | undefined {
  for (const cand of parseAcceptLanguage(header)) {
    const base = normalizeLocale(cand);
    if (base && isSupported(base)) return base as Locale;
  }
  return undefined;
}

export function resolveLocaleFromHeaders(headers: Record<string, unknown>): {
  locale: Locale;
  selectedBy: 'x-locale' | 'accept-language' | 'default';
} {
  const rawXL = (headers['x-locale'] ??
    (headers as any)['X-Locale'] ??
    (headers as any)['x_locale']) as string | undefined;

  const xlNorm = normalizeLocale(rawXL);
  if (xlNorm && isSupported(xlNorm)) return { locale: xlNorm as Locale, selectedBy: 'x-locale' };

  const al = bestFromAcceptLanguage(
    (headers['accept-language'] ?? (headers as any)['Accept-Language']) as string | undefined,
  );
  if (al && isSupported(al)) return { locale: al as Locale, selectedBy: 'accept-language' };

  return { locale: (getRuntimeDefaultLocale() as Locale) || DEFAULT_LOCALE, selectedBy: 'default' };
}

let __runtimeDefaultLocale: string | null = null;

export function getRuntimeDefaultLocale(): Locale {
  const n = normalizeLocale(__runtimeDefaultLocale) as Locale | undefined;
  if (n && LOCALES.includes(n)) return n;
  return (LOCALES[0] as Locale) || DEFAULT_LOCALE;
}

export function fallbackChain(primary: Locale): Locale[] {
  const seen = new Set<string>();
  const runtimeDef = getRuntimeDefaultLocale();
  const order: string[] = [primary, runtimeDef, ...LOCALES];
  const uniq: Locale[] = [];
  for (const l of order) {
    const n = normalizeLocale(l) || l;
    if (!seen.has(n)) { seen.add(n); uniq.push(n as Locale); }
  }
  return uniq;
}

export function setLocalesFromSettings(localeCodes: string[]) {
  const next: string[] = [];
  for (const code of localeCodes) {
    const n = normalizeLocale(code);
    if (!n) continue;
    if (!next.includes(n)) next.push(n);
  }
  if (!next.length) return;
  LOCALES.splice(0, LOCALES.length, ...next);
}

type AppLocaleObjLike = {
  code?: unknown; locale?: unknown; value?: unknown; lang?: unknown;
  is_active?: unknown; is_default?: unknown;
};

function extractLocaleCode(v: unknown): { code: string; isDefault: boolean } | null {
  if (v == null) return null;
  if (typeof v === 'string') {
    const n = normalizeLocale(v);
    return n ? { code: n, isDefault: false } : null;
  }
  if (typeof v === 'object') {
    const o = v as AppLocaleObjLike;
    if (o.is_active === false) return null;
    const raw = o.code ?? o.locale ?? o.value ?? o.lang ?? null;
    if (typeof raw === 'string') {
      const n = normalizeLocale(raw);
      if (!n) return null;
      return { code: n, isDefault: o.is_default === true };
    }
  }
  return null;
}

function parseJsonMaybe(s: string): unknown | null {
  const x = s.trim();
  if (!x) return null;
  if (!((x.startsWith('[') && x.endsWith(']')) || (x.startsWith('{') && x.endsWith('}'))))
    return null;
  try { return JSON.parse(x); } catch { return null; }
}

function parseAppLocalesUnknown(raw: unknown): { locales: string[]; defaultFromList?: string } {
  const out: string[] = [];
  let def: string | undefined;

  const push = (code: string, isDef: boolean) => {
    if (!out.includes(code)) out.push(code);
    if (isDef && !def) def = code;
  };

  if (raw == null) return { locales: [], defaultFromList: undefined };

  if (Array.isArray(raw)) {
    for (const item of raw) {
      const r = extractLocaleCode(item);
      if (r) push(r.code, r.isDefault);
    }
    return { locales: out, defaultFromList: def };
  }

  if (typeof raw === 'string') {
    const s = raw.trim();
    if (!s) return { locales: [], defaultFromList: undefined };
    const parsed = parseJsonMaybe(s);
    if (parsed != null) return parseAppLocalesUnknown(parsed);
    for (const part of s.split(/[;,]+/)) {
      const code = normalizeLocale(part);
      if (code && !out.includes(code)) out.push(code);
    }
    return { locales: out, defaultFromList: undefined };
  }

  return { locales: [], defaultFromList: undefined };
}

let lastLocalesLoadedAt = 0;
const LOCALES_REFRESH_MS = 60_000;

async function readSettingValue(key: string, locale: string): Promise<string | null> {
  const rows = await db
    .select({ value: siteSettings.value })
    .from(siteSettings)
    .where(and(eq(siteSettings.key, key), eq(siteSettings.locale, locale)))
    .limit(1);
  if (!rows.length) return null;
  return rows[0].value ?? null;
}

export async function loadLocalesFromSiteSettings() {
  try {
    const appRawStar = await readSettingValue(APP_LOCALES_SETTING_KEY, '*');
    const appRawAny = appRawStar
      ? appRawStar
      : await (async () => {
          const rows = await db
            .select({ value: siteSettings.value })
            .from(siteSettings)
            .where(eq(siteSettings.key, APP_LOCALES_SETTING_KEY))
            .limit(1);
          return rows.length ? rows[0].value : null;
        })();

    const { locales: parsedLocales, defaultFromList } = parseAppLocalesUnknown(appRawAny);
    if (parsedLocales.length) setLocalesFromSettings(parsedLocales);

    const defRawStar = await readSettingValue(DEFAULT_LOCALE_SETTING_KEY, '*');
    const defNorm = normalizeLocale(defRawStar || undefined);

    const candidate =
      (defNorm && LOCALES.includes(defNorm) ? defNorm : undefined) ||
      (defaultFromList && LOCALES.includes(defaultFromList) ? defaultFromList : undefined) ||
      LOCALES[0] ||
      DEFAULT_LOCALE;

    __runtimeDefaultLocale = candidate || null;

    if (candidate && LOCALES.includes(candidate)) {
      const next = [candidate, ...LOCALES.filter((x) => x !== candidate)];
      LOCALES.splice(0, LOCALES.length, ...next);
    }
  } catch (err) {
    console.error('loadLocalesFromSiteSettings failed:', err);
  } finally {
    lastLocalesLoadedAt = Date.now();
  }
}

export async function ensureLocalesLoadedFromSettings() {
  const now = Date.now();
  if (now - lastLocalesLoadedAt < LOCALES_REFRESH_MS) return;
  await loadLocalesFromSiteSettings();
}

declare module 'fastify' {
  interface FastifyRequest {
    locale: Locale;
    localeFallbacks: Locale[];
  }
}
