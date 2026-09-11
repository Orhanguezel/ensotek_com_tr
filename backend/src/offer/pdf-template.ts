// =============================================================
// FILE: src/modules/offer/pdfTemplate.ts
// Ensotek – Offer PDF HTML Template
//   - Teklif PDF'inde kullanılacak HTML + inline CSS
//   - Kaynak: OfferRow (offers tablosu)
//   - Dil: site_settings.app_locales + offer.locale + default_locale
//   - Firma bilgisi + logo: site_settings.company_brand
// =============================================================

import type { OfferRow } from '@ensotek/shared-backend/modules/offer/schema';
import { getAppLocales, getDefaultLocale } from '@ensotek/shared-backend/modules/siteSettings/service';
import { db } from '../db/client';
import { siteSettings } from '@ensotek/shared-backend/modules/siteSettings/schema';
import { and, inArray, eq } from 'drizzle-orm';

type PdfTemplateContext = OfferRow & {
  site_name?: string | null;
  product_name?: string | null;
  service_name?: string | null;
};

function safe(value: unknown): string {
  if (value == null) return '';
  return String(value);
}

function safeText(value: unknown): string {
  const s = safe(value);
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// ✅ Label dilleri (TR/EN/DE)
type LabelLocale = 'tr' | 'en' | 'de';

function toIntlLocale(locale: LabelLocale): string {
  if (locale === 'tr') return 'tr-TR';
  if (locale === 'de') return 'de-DE';
  return 'en-US';
}

function formatDate(d: Date | string | null | undefined, locale: LabelLocale) {
  if (!d) return '';
  const date = typeof d === 'string' ? new Date(d) : d;
  const intlLocale = toIntlLocale(locale);

  try {
    return date.toLocaleDateString(intlLocale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch {
    return date.toISOString().substring(0, 10);
  }
}

function formatMoney(
  value: string | number | null | undefined,
  currency: string | null | undefined,
  locale: LabelLocale,
) {
  if (value == null) return '';

  const raw = typeof value === 'string' ? value.trim() : value;
  if (raw === '') return '';

  const num = typeof raw === 'number' ? raw : Number(raw);
  if (Number.isNaN(num)) return typeof value === 'string' ? value : '';

  const c = currency || 'EUR';
  const intlLocale = toIntlLocale(locale);

  try {
    return new Intl.NumberFormat(intlLocale, {
      style: 'currency',
      currency: c,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  } catch {
    return `${num.toFixed(2)} ${c}`;
  }
}

function normalizeNumberish(input: string): string {
  let s = input.trim();
  s = s.replace(/%/g, '').trim();
  s = s.replace(/\s+/g, '');

  if (s.includes(',') && s.includes('.')) {
    s = s.replace(/\./g, '').replace(',', '.');
    return s;
  }
  if (s.includes(',') && !s.includes('.')) {
    s = s.replace(',', '.');
    return s;
  }
  return s;
}

function parseDecimal(v: unknown): number | null {
  if (v == null) return null;

  if (typeof v === 'number') return Number.isFinite(v) ? v : null;

  if (typeof v === 'string') {
    const s = normalizeNumberish(v);
    if (!s) return null;
    const n = Number(s);
    return Number.isNaN(n) || !Number.isFinite(n) ? null : n;
  }

  if (typeof v === 'object') {
    const s = (v as any)?.toString?.();
    if (typeof s === 'string' && s.trim()) return parseDecimal(s);
  }

  return null;
}

function parseJsonRecord(v: unknown): Record<string, unknown> | null {
  if (!v) return null;
  if (typeof v === 'object') return v as Record<string, unknown>;
  if (typeof v !== 'string') return null;
  try {
    const parsed = JSON.parse(v);
    return typeof parsed === 'object' && parsed !== null
      ? (parsed as Record<string, unknown>)
      : { raw: parsed };
  } catch {
    return null;
  }
}

function pickFirstString(...vals: unknown[]): string | null {
  for (const v of vals) {
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return null;
}

// -------------------------------------------------------------
// app_locales + default_locale → dinamik locale çözümü
// -------------------------------------------------------------

let cachedAppLocales: string[] | null = null;
let cachedDefaultLocale: string | null = null;

function normalizeLocaleShort(input?: string | null): string | null {
  const s = String(input || '')
    .trim()
    .toLowerCase()
    .replace('_', '-');
  if (!s) return null;
  return (s.split('-')[0] || '').trim() || null;
}

async function ensureAppLocales(): Promise<string[]> {
  if (cachedAppLocales && cachedAppLocales.length) return cachedAppLocales;

  try {
    const list = await getAppLocales();
    if (Array.isArray(list) && list.length) {
      const uniq: string[] = [];
      for (const x of list) {
        const n = normalizeLocaleShort(x);
        if (n && !uniq.includes(n)) uniq.push(n);
      }
      if (uniq.length) {
        cachedAppLocales = uniq;
        return uniq;
      }
    }
  } catch (err) {
    console.error('offer_pdf:getAppLocales_failed', err);
  }

  cachedAppLocales = ['de', 'en', 'tr'];
  return cachedAppLocales;
}

async function ensureDefaultLocale(): Promise<string | null> {
  if (cachedDefaultLocale) return cachedDefaultLocale;

  try {
    const v = await getDefaultLocale();
    const n = normalizeLocaleShort(v);
    if (n) {
      cachedDefaultLocale = n;
      return n;
    }
  } catch (err) {
    console.error('offer_pdf:getDefaultLocale_failed', err);
  }

  return null;
}

async function resolveRuntimeLocale(rawLocale?: string | null): Promise<string> {
  const appLocales = await ensureAppLocales();
  const dbDefault = await ensureDefaultLocale();
  const fallback = dbDefault || appLocales[0] || 'en';

  if (!rawLocale) return fallback;

  const lcFull = String(rawLocale).trim().toLowerCase().replace('_', '-');
  const lcShort = normalizeLocaleShort(lcFull);

  if (!lcShort) return fallback;

  if (appLocales.includes(lcShort)) return lcShort;

  const prefix = appLocales.find((l) => lcFull.startsWith(`${l.toLowerCase()}`));
  if (prefix) return prefix;

  return fallback;
}

function toLabelLocale(runtimeLocale: string): LabelLocale {
  const lc = String(runtimeLocale || '').toLowerCase();
  if (lc.startsWith('tr')) return 'tr';
  if (lc.startsWith('de')) return 'de';
  return 'en';
}

// -------------------------------------------------------------
// Firma bilgisi (company_brand) – site_settings’den
// -------------------------------------------------------------

type CompanyBrandSettings = {
  name: string;
  shortName: string | null;
  website: string | null;
  logoUrl: string | null;
  logoWidth: number | null;
  logoHeight: number | null;
};

const companyBrandCache = new Map<string, CompanyBrandSettings>();

async function getCompanyBrandSettings(runtimeLocale: string): Promise<CompanyBrandSettings> {
  const cached = companyBrandCache.get(runtimeLocale);
  if (cached) return cached;

  const langPart = runtimeLocale.split('-')[0].toLowerCase();
  const candidateLocales = Array.from(new Set<string>([runtimeLocale, langPart, 'en', 'de', 'tr']));

  let brand: CompanyBrandSettings = {
    name: 'Ensotek',
    shortName: null,
    website: null,
    logoUrl: null,
    logoWidth: null,
    logoHeight: null,
  };

  try {
    const rows = await db
      .select({
        locale: siteSettings.locale,
        value: siteSettings.value,
      })
      .from(siteSettings)
      .where(
        and(eq(siteSettings.key, 'company_brand'), inArray(siteSettings.locale, candidateLocales)),
      );

    let picked: { locale: string; value: string } | undefined;

    for (const loc of candidateLocales) {
      const row = rows.find((r) => r.locale === loc);
      if (row) {
        picked = row as { locale: string; value: string };
        break;
      }
    }

    if (picked) {
      try {
        const parsed = JSON.parse(picked.value);
        brand = {
          name: parsed.name || brand.name,
          shortName: typeof parsed.shortName === 'string' ? parsed.shortName : null,
          website: typeof parsed.website === 'string' ? parsed.website : null,
          logoUrl: parsed.logo && typeof parsed.logo.url === 'string' ? parsed.logo.url : null,
          logoWidth:
            parsed.logo && typeof parsed.logo.width === 'number' ? parsed.logo.width : null,
          logoHeight:
            parsed.logo && typeof parsed.logo.height === 'number' ? parsed.logo.height : null,
        };
      } catch (err) {
        console.error('offer_pdf:parse_company_brand_failed', err);
      }
    }
  } catch (err) {
    console.error('offer_pdf:load_company_brand_failed', err);
  }

  companyBrandCache.set(runtimeLocale, brand);
  return brand;
}

// -------------------------------------------------------------
// i18n – TR / EN / DE label fallback set
// -------------------------------------------------------------

const LABELS: Record<
  LabelLocale,
  {
    title: string;
    quoteNo: string;
    date: string;
    validity: string;
    status: string;

    customerInfo: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    country: string;
    formLanguage: string;
    product: string;
    service: string;

    summary: string;
    subject: string;
    noMessage: string;

    technicalDetails: string;
    towerProcess: string;
    towerCity: string;
    waterFlow: string;
    inletTemp: string;
    outletTemp: string;
    wetBulbTemp: string;
    capacity: string;

    pricing: string;
    net: string;
    vat: string;
    shipping: string;
    total: string;
    pricingEmpty: string;

    notes: string;
    notesLegal: (validUntilStr: string) => string;
    internalNotes: string;
    documentLabel: string;
    documentStatus: string;
    issuerApproval: string;
    customerApproval: string;
    nameSignature: string;

    footerLeft: (siteName: string) => string;
    footerRight: string;
  }
> = {
  tr: {
    title: 'Teklif',
    quoteNo: 'Teklif No',
    date: 'Tarih',
    validity: 'Geçerlilik',
    status: 'Durum',
    customerInfo: 'Müşteri Bilgileri',
    name: 'Ad Soyad',
    company: 'Firma',
    email: 'E-posta',
    phone: 'Telefon',
    country: 'Ülke',
    formLanguage: 'Form dili',
    product: 'Ürün',
    service: 'Hizmet',
    summary: 'Teklif Özeti',
    subject: 'Konu',
    noMessage: 'Müşteri mesajı bulunmamaktadır.',
    technicalDetails: 'Teknik Detaylar',
    towerProcess: 'Proses',
    towerCity: 'Şehir/Konum',
    waterFlow: 'Su Debisi',
    inletTemp: 'Giriş Sıcaklığı',
    outletTemp: 'Çıkış Sıcaklığı',
    wetBulbTemp: 'Yaş Termometre',
    capacity: 'Kapasite',
    pricing: 'Fiyatlandırma',
    net: 'Net Tutar',
    vat: 'KDV',
    shipping: 'Nakliye',
    total: 'Genel Toplam',
    pricingEmpty: 'Fiyatlandırma henüz eklenmemiştir; bu belge ön teklif niteliğindedir.',
    notes: 'Notlar',
    notesLegal: (validUntilStr) =>
      `Bu belge bilgilendirme amaçlıdır. Nihai fiyat ve ticari koşullar, ${
        validUntilStr ? `${validUntilStr} tarihine kadar geçerli olup ` : ''
      }Ensotek tarafından yazılı olarak onaylandığında geçerli olacaktır.`,
    internalNotes: 'İdari not (dahili kullanım)',
    documentLabel: 'Resmi Teklif Dosyası',
    documentStatus: 'Ön Teklif',
    issuerApproval: 'Ensotek Yetkilisi',
    customerApproval: 'Müşteri Onayı',
    nameSignature: 'Ad Soyad / Kaşe / İmza',
    footerLeft: (siteName) => `${siteName} – Otomatik Teklif Sistemi`,
    footerRight: 'Bu PDF sistem tarafından oluşturulmuştur, imza gerektirmez.',
  },

  en: {
    title: 'Offer',
    quoteNo: 'Offer No',
    date: 'Date',
    validity: 'Valid Until',
    status: 'Status',
    customerInfo: 'Customer Information',
    name: 'Name',
    company: 'Company',
    email: 'Email',
    phone: 'Phone',
    country: 'Country',
    formLanguage: 'Form language',
    product: 'Product',
    service: 'Service',
    summary: 'Offer Summary',
    subject: 'Subject',
    noMessage: 'No customer message has been provided.',
    technicalDetails: 'Technical Details',
    towerProcess: 'Process',
    towerCity: 'City/Location',
    waterFlow: 'Water Flow',
    inletTemp: 'Inlet Temp.',
    outletTemp: 'Outlet Temp.',
    wetBulbTemp: 'Wet Bulb',
    capacity: 'Capacity',
    pricing: 'Pricing',
    net: 'Net Amount',
    vat: 'VAT',
    shipping: 'Shipping',
    total: 'Grand Total',
    pricingEmpty:
      'Pricing has not been added yet; this document should be considered a preliminary offer.',
    notes: 'Notes',
    notesLegal: (validUntilStr) =>
      `This document is for information purposes only. Final prices and commercial terms become valid only after written confirmation by Ensotek${
        validUntilStr ? ` and are valid until ${validUntilStr}.` : '.'
      }`,
    internalNotes: 'Internal note',
    documentLabel: 'Official Offer Document',
    documentStatus: 'Preliminary Offer',
    issuerApproval: 'Ensotek Representative',
    customerApproval: 'Customer Approval',
    nameSignature: 'Name / Stamp / Signature',
    footerLeft: (siteName) => `${siteName} – Automated Offer System`,
    footerRight: 'This PDF is generated by the system and does not require a signature.',
  },

  de: {
    title: 'Angebot',
    quoteNo: 'Angebots-Nr.',
    date: 'Datum',
    validity: 'Gültig bis',
    status: 'Status',
    customerInfo: 'Kundendaten',
    name: 'Name',
    company: 'Firma',
    email: 'E-Mail',
    phone: 'Telefon',
    country: 'Land',
    formLanguage: 'Formularsprache',
    product: 'Produkt',
    service: 'Leistung',
    summary: 'Angebotsübersicht',
    subject: 'Betreff',
    noMessage: 'Es wurde keine Kundenmitteilung angegeben.',
    technicalDetails: 'Technische Details',
    towerProcess: 'Prozess',
    towerCity: 'Stadt/Standort',
    waterFlow: 'Wassermenge',
    inletTemp: 'Eintr. Temp.',
    outletTemp: 'Austr. Temp.',
    wetBulbTemp: 'Feuchtkugel',
    capacity: 'Kapazität',
    pricing: 'Preisübersicht',
    net: 'Nettobetrag',
    vat: 'MwSt.',
    shipping: 'Versand',
    total: 'Gesamtbetrag',
    pricingEmpty:
      'Preise wurden noch nicht hinterlegt; dieses Dokument ist ein unverbindlicher Vorab-Entwurf.',
    notes: 'Hinweise',
    notesLegal: (validUntilStr) =>
      `Dieses Dokument dient ausschließlich Informationszwecken. Endgültige Preise und Konditionen gelten erst nach schriftlicher Bestätigung durch Ensotek${
        validUntilStr ? ` und sind bis zum ${validUntilStr} gültig.` : '.'
      }`,
    internalNotes: 'Interne Notiz',
    documentLabel: 'Offizielles Angebotsdokument',
    documentStatus: 'Vorläufiges Angebot',
    issuerApproval: 'Ensotek Vertretung',
    customerApproval: 'Kundenfreigabe',
    nameSignature: 'Name / Stempel / Unterschrift',
    footerLeft: (siteName) => `${siteName} – Automatisiertes Angebotssystem`,
    footerRight: 'Dieses PDF wurde automatisch erstellt und benötigt keine Unterschrift.',
  },
};

// -------------------------------------------------------------
// MAIN RENDER
// -------------------------------------------------------------

export async function renderOfferPdfHtml(ctx: PdfTemplateContext): Promise<string> {
  const runtimeLocale = await resolveRuntimeLocale(ctx.locale || undefined);
  const labelLocale = toLabelLocale(runtimeLocale);
  const t = LABELS[labelLocale];

  const companyBrand = await getCompanyBrandSettings(runtimeLocale);
  const siteName = companyBrand.name || ctx.site_name || 'Ensotek';

  const offerNo = (ctx as any).offer_no || ctx.id;
  const createdAtStr = formatDate((ctx as any).created_at ?? null, labelLocale);
  const validUntilStr = formatDate((ctx as any).valid_until ?? null, labelLocale);

  const formData = parseJsonRecord((ctx as any).form_data);

  const formProductName = formData
    ? pickFirstString(
        (formData as any).product_name,
        (formData as any).productName,
        (formData as any).product_title,
        (formData as any).productTitle,
        (formData as any).product,
        (formData as any).item_name,
        (formData as any).itemName,
      )
    : null;

  const formServiceName = formData
    ? pickFirstString(
        (formData as any).service_name,
        (formData as any).serviceName,
        (formData as any).service_title,
        (formData as any).serviceTitle,
        (formData as any).service,
        (formData as any).requested_service,
        (formData as any).requestedService,
      )
    : null;

  const productDisplay = pickFirstString(ctx.product_name, formProductName) ?? null;
  const serviceDisplay = pickFirstString(ctx.service_name, formServiceName) ?? null;

  const currency = (ctx as any).currency;

  const netNum = parseDecimal((ctx as any).net_total);
  const vatNumFromRow = parseDecimal((ctx as any).vat_total);
  const grossNumFromRow = parseDecimal((ctx as any).gross_total);
  const shippingNum = parseDecimal((ctx as any).shipping_total);

  let vatNum: number | null = vatNumFromRow;
  let grossNum: number | null = grossNumFromRow;

  const vatRateRaw = (ctx as any).vat_rate as number | string | null | undefined;
  const vatRate = parseDecimal(vatRateRaw);

  if (vatNum == null && vatRate != null && netNum != null) {
    const ratio = vatRate / 100;
    if (Number.isFinite(ratio)) vatNum = netNum * ratio;
  }

  if (grossNum == null && netNum != null) {
    grossNum = netNum + (vatNum ?? 0) + (shippingNum ?? 0);
  }

  const netStr = netNum != null ? formatMoney(netNum.toFixed(2), currency, labelLocale) : '';
  const vatStr = vatNum != null ? formatMoney(vatNum.toFixed(2), currency, labelLocale) : '';
  const shippingStr =
    shippingNum != null ? formatMoney(shippingNum.toFixed(2), currency, labelLocale) : '';
  const grossStr = grossNum != null ? formatMoney(grossNum.toFixed(2), currency, labelLocale) : '';

  const vatLabel =
    vatRate != null && Number.isFinite(vatRate) ? `${t.vat} (${vatRate.toFixed(0)}%)` : `${t.vat}`;

  // PUBLIC_URL is the internal backend origin in production. PDF assets belong
  // to the public website, so keep a dedicated, externally reachable base.
  const publicBaseUrl = (
    process.env.OFFER_PDF_PUBLIC_URL || 'https://www.ensotek.com.tr'
  ).replace(/\/+$/, '');
  const configuredLogoUrl = companyBrand.logoUrl || `${publicBaseUrl}/logo-transparent.png`;
  const logoUrl = configuredLogoUrl.startsWith('/')
    ? `${publicBaseUrl}${configuredLogoUrl}`
    : configuredLogoUrl;
  const logoWidth = companyBrand.logoWidth || 176;
  const logoHeight = companyBrand.logoHeight || 68;

  const countryDisplay = (ctx as any).country_code
    ? String((ctx as any).country_code).toUpperCase()
    : '';
  const formLangDisplay = runtimeLocale || '';

  const hasTechnicalData = formData && (
    (formData as any).tower_process || 
    (formData as any).tower_city || 
    (formData as any).water_flow_m3h ||
    (formData as any).inlet_temperature_c ||
    (formData as any).outlet_temperature_c ||
    (formData as any).wet_bulb_temperature_c ||
    (formData as any).capacity_kcal_kw
  );

  return `<!DOCTYPE html>
<html lang="${safeText(runtimeLocale)}">
<head>
  <meta charset="UTF-8" />
  <title>${safeText(siteName)} – ${safeText(t.title)} ${safeText(offerNo)}</title>
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; font-family: "Segoe UI", Arial, sans-serif; font-size: 11px; color: #172638; background: #fff; }
    body { padding: 0; }
    .page { width: 100%; position: relative; }
    .top-rule { height: 7px; margin-bottom: 18px; border-radius: 1px; background: linear-gradient(90deg, #07365d 0%, #07365d 64%, #00a8c5 64%, #00a8c5 100%); }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #cfdae3; }
    .header-left { display: flex; align-items: center; min-height: 58px; }
    .header-logo { width: auto; max-height: 58px; max-width: 188px; object-fit: contain; display: block; }
    .header-left-title { font-size: 20px; font-weight: 800; color: #07365d; }
    .header-left-sub { display: none; }
    .document-heading { text-align: right; }
    .document-kicker { color: #00a0bd; font-size: 8.5px; font-weight: 800; text-transform: uppercase; letter-spacing: .18em; }
    .document-title { margin-top: 3px; color: #07365d; font-size: 25px; line-height: 1; font-weight: 800; letter-spacing: -.02em; }
    .document-status { display: inline-block; margin-top: 7px; padding: 4px 9px; border-radius: 999px; color: #07526e; background: #e8f7fa; font-size: 8px; font-weight: 800; text-transform: uppercase; letter-spacing: .09em; }
    .meta-panel { display: grid; grid-template-columns: repeat(3, 1fr); margin-bottom: 17px; overflow: hidden; border: 1px solid #cfdae3; border-radius: 7px; background: #f7fafc; }
    .meta-item { min-height: 48px; padding: 9px 12px; border-right: 1px solid #dce4ea; }
    .meta-item:last-child { border-right: 0; }
    .meta-label { display: block; margin-bottom: 4px; color: #667789; font-size: 7.5px; font-weight: 800; text-transform: uppercase; letter-spacing: .12em; }
    .meta-value { color: #07365d; font-size: 11px; font-weight: 750; }
    .section-title { display: flex; align-items: center; gap: 7px; margin: 16px 0 7px; color: #07365d; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .11em; }
    .section-title::before { content: ""; width: 4px; height: 14px; border-radius: 2px; background: #00a8c5; }
    .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 30px; padding: 12px 14px; border: 1px solid #d9e2e9; border-radius: 7px; background: #fff; font-size: 10.5px; }
    .details-grid > div > div { display: flex; min-height: 23px; padding: 4px 0; border-bottom: 1px solid #edf1f4; line-height: 1.35; }
    .details-grid > div > div:last-child { border-bottom: 0; }
    .label { flex: 0 0 105px; color: #5f7182; font-weight: 700; }
    .muted { color: #6f7e8b; }
    .box { border: 1px solid #d9e2e9; border-radius: 7px; padding: 12px 14px; margin-top: 4px; background: #fbfcfd; }
    .amounts { margin-top: 4px; width: 330px; margin-left: auto; overflow: hidden; border: 1px solid #ccd8e1; border-radius: 7px; padding: 7px 13px; background: #f7fafc; font-size: 10.5px; }
    .amounts table { width: 100%; border-collapse: collapse; }
    .amounts td { padding: 6px 0; vertical-align: top; }
    .amounts td.label { text-align: left; }
    .amounts td.value { text-align: right; color: #07365d; font-weight: 750; white-space: nowrap; }
    .amounts tr.total-row td { border-top: 1px solid #9db2c2; padding-top: 9px; color: #07365d; font-size: 13px; font-weight: 800; }
    .pricing-empty { width: 100%; margin-top: 4px; padding: 12px 14px; border: 1px solid #b9e0e7; border-radius: 7px; color: #135b6a; background: #eef9fb; font-size: 10px; }
    .text-block { font-size: 10.5px; line-height: 1.55; margin-top: 8px; white-space: pre-wrap; }
    .approval-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 18px; page-break-inside: avoid; }
    .approval-box { min-height: 75px; padding: 11px 13px; border: 1px solid #ccd8e1; border-radius: 7px; background: #fff; }
    .approval-title { color: #07365d; font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; }
    .signature-line { margin-top: 31px; padding-top: 5px; border-top: 1px solid #9aabb8; color: #7a8996; font-size: 8px; }
    .footer { margin-top: 18px; padding-top: 8px; border-top: 1px solid #cfdae3; display: flex; justify-content: space-between; color: #758594; font-size: 8px; }
    .footer strong { color: #07365d; }
  </style>
</head>
<body>
  <div class="page">
    <div class="top-rule"></div>
    <div class="header">
      <div class="header-left">
        ${
          logoUrl
            ? `<img src="${safeText(logoUrl)}" alt="${safeText(
                siteName,
              )}" class="header-logo" width="${Number(logoWidth)}" height="${Number(
                logoHeight,
              )}" />`
            : ''
        }
        ${
          logoUrl
            ? ''
            : `<div><div class="header-left-title">${safeText(
                siteName,
              )}</div><div class="header-left-sub">${safeText(t.title)}</div></div>`
        }
      </div>
      <div class="document-heading">
        <div class="document-kicker">${safeText(t.documentLabel)}</div>
        <div class="document-title">${safeText(t.title)}</div>
        <div class="document-status">${safeText(t.documentStatus)}</div>
      </div>
    </div>

    <div class="meta-panel">
      <div class="meta-item"><span class="meta-label">${safeText(t.quoteNo)}</span><span class="meta-value">${safeText(offerNo)}</span></div>
      <div class="meta-item"><span class="meta-label">${safeText(t.date)}</span><span class="meta-value">${safeText(createdAtStr)}</span></div>
      <div class="meta-item"><span class="meta-label">${safeText(t.validity)}</span><span class="meta-value">${safeText(validUntilStr || '—')}</span></div>
    </div>

    <div class="section-title">${safeText(t.customerInfo)}</div>
    <div class="details-grid">
      <div>
        <div><span class="label">${safeText(t.name)}:</span> ${safeText(
          (ctx as any).customer_name,
        )}</div>
        ${
          (ctx as any).company_name
            ? `<div><span class="label">${safeText(t.company)}:</span> ${safeText(
                (ctx as any).company_name,
              )}</div>`
            : ''
        }
        <div><span class="label">${safeText(t.email)}:</span> ${safeText((ctx as any).email)}</div>
        ${
          (ctx as any).phone
            ? `<div><span class="label">${safeText(t.phone)}:</span> ${safeText(
                (ctx as any).phone,
              )}</div>`
            : ''
        }
        ${
          countryDisplay
            ? `<div><span class="label">${safeText(t.country)}:</span> ${safeText(
                countryDisplay,
              )}</div>`
            : ''
        }
      </div>

      <div>
        ${
          productDisplay
            ? `<div><span class="label">${safeText(t.product)}:</span> ${safeText(
                productDisplay,
              )}</div>`
            : ''
        }
        ${
          serviceDisplay
            ? `<div><span class="label">${safeText(t.service)}:</span> ${safeText(
                serviceDisplay,
              )}</div>`
            : ''
        }
        ${
          formLangDisplay
            ? `<div><span class="label">${safeText(t.formLanguage)}:</span> ${safeText(
                formLangDisplay,
              )}</div>`
            : ''
        }
      </div>
    </div>

    ${hasTechnicalData ? `
    <div class="section-title">${safeText(t.technicalDetails)}</div>
    <div class="details-grid">
      ${(formData as any).tower_process ? `<div><span class="label">${safeText(t.towerProcess)}:</span> ${safeText((formData as any).tower_process)}</div>` : ''}
      ${(formData as any).tower_city ? `<div><span class="label">${safeText(t.towerCity)}:</span> ${safeText((formData as any).tower_city)}</div>` : ''}
      ${(formData as any).water_flow_m3h ? `<div><span class="label">${safeText(t.waterFlow)}:</span> ${safeText((formData as any).water_flow_m3h)} m³/h</div>` : ''}
      ${(formData as any).inlet_temperature_c ? `<div><span class="label">${safeText(t.inletTemp)}:</span> ${safeText((formData as any).inlet_temperature_c)} °C</div>` : ''}
      ${(formData as any).outlet_temperature_c ? `<div><span class="label">${safeText(t.outletTemp)}:</span> ${safeText((formData as any).outlet_temperature_c)} °C</div>` : ''}
      ${(formData as any).wet_bulb_temperature_c ? `<div><span class="label">${safeText(t.wetBulbTemp)}:</span> ${safeText((formData as any).wet_bulb_temperature_c)} °C</div>` : ''}
      ${(formData as any).capacity_kcal_kw ? `<div><span class="label">${safeText(t.capacity)}:</span> ${safeText((formData as any).capacity_kcal_kw)}</div>` : ''}
    </div>
    ` : ''}

    <div class="section-title">${safeText(t.summary)}</div>
    <div class="box">
      ${
        (ctx as any).subject
          ? `<div><span class="label">${safeText(t.subject)}:</span> ${safeText(
              (ctx as any).subject,
            )}</div>`
          : ''
      }
      ${
        (ctx as any).message
          ? `<div class="text-block">${safeText((ctx as any).message)}</div>`
          : `<div class="muted">${safeText(t.noMessage)}</div>`
      }
    </div>

    <div class="section-title">${safeText(t.pricing)}</div>
    ${
      netStr || vatStr || shippingStr || grossStr
        ? `<div class="amounts">
          <table><tbody>
          ${
            netStr
              ? `<tr><td class="label">${safeText(t.net)}:</td><td class="value">${safeText(
                  netStr,
                )}</td></tr>`
              : ''
          }
          ${
            vatStr
              ? `<tr><td class="label">${safeText(vatLabel)}:</td><td class="value">${safeText(
                  vatStr,
                )}</td></tr>`
              : ''
          }
          ${
            shippingStr
              ? `<tr><td class="label">${safeText(t.shipping)}:</td><td class="value">${safeText(
                  shippingStr,
                )}</td></tr>`
              : ''
          }
          ${
            grossStr
              ? `<tr class="total-row"><td class="label">${safeText(
                  t.total,
                )}:</td><td class="value">${safeText(grossStr)}</td></tr>`
              : ''
          }
          </tbody></table>
        </div>`
        : `<div class="pricing-empty">${safeText(t.pricingEmpty)}</div>`
    }

    <div class="section-title">${safeText(t.notes)}</div>
    <div class="box">
      <div class="muted" style="font-size: 10px; line-height: 1.4;">
        ${safeText(t.notesLegal(validUntilStr))}
      </div>
      ${
        (ctx as any).admin_notes
          ? `<div class="text-block" style="margin-top: 8px; border-top: 1px dashed #d0d0d0; padding-top: 6px; font-size: 10px;">
              ${safeText((ctx as any).admin_notes)}
            </div>`
          : ''
      }
    </div>

    <div class="approval-grid">
      <div class="approval-box">
        <div class="approval-title">${safeText(t.issuerApproval)}</div>
        <div class="signature-line">${safeText(t.nameSignature)}</div>
      </div>
      <div class="approval-box">
        <div class="approval-title">${safeText(t.customerApproval)}</div>
        <div class="signature-line">${safeText(t.nameSignature)}</div>
      </div>
    </div>

    <div class="footer">
      <div><strong>${safeText(siteName)}</strong> · ${safeText(companyBrand.website || 'www.ensotek.com.tr')}</div>
      <div>${safeText(t.footerRight)}</div>
    </div>
  </div>
</body>
</html>`;
}
