import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from '@/i18n/locales';
import { fetchActiveLocales } from '@/i18n/server';
import { notFound } from 'next/navigation';
import { API_BASE_URL, SITE_URL } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { ContactSection } from '@/components/sections/ContactSection';
import type { ContactInfo } from '@/lib/api';

function localizedContactPath(locale: string): string {
  return locale === 'en' ? '/contact' : '/iletisim';
}

export async function generateStaticParams() {
  const locales = await fetchActiveLocales();
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.contact' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}${localizedContactPath(locale)}`,
      languages: {
        tr: `${SITE_URL}/tr${localizedContactPath('tr')}`,
        en: `${SITE_URL}/en${localizedContactPath('en')}`,
        'x-default': `${SITE_URL}/tr${localizedContactPath('tr')}`,
      },
    },
  };
}

async function fetchContactInfo(locale: string): Promise<ContactInfo> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/site_settings/contact_info?locale=${locale}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return {};
    const dto = await res.json();
    const raw = dto?.value;
    return (typeof raw === 'string' ? JSON.parse(raw) : raw) ?? {};
  } catch {
    return {};
  }
}

function buildCapacityMessage(searchParams: Record<string, string | string[] | undefined>, locale: string): string {
  if (searchParams.source !== 'capacity-calculator') return '';

  const getParam = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const capacity = getParam('capacity_kw');
  const flow = getParam('flow_m3h');
  const inlet = getParam('inlet_c');
  const outlet = getParam('outlet_c');
  const wetBulb = getParam('wet_bulb_c');

  if (!capacity || !flow || !inlet || !outlet || !wetBulb) return '';

  if (locale === 'en') {
    return [
      'Cooling tower capacity calculator result:',
      `Estimated capacity: ${capacity} kW`,
      `Water flow rate: ${flow} m3/h`,
      `Inlet / outlet water temperature: ${inlet} C / ${outlet} C`,
      `Wet bulb temperature: ${wetBulb} C`,
      '',
      'Please evaluate this requirement and contact me for a quote.',
    ].join('\n');
  }

  return [
    'Soğutma kulesi kapasite hesaplama sonucu:',
    `Yaklaşık kapasite: ${capacity} kW`,
    `Su debisi: ${flow} m3/h`,
    `Giriş / çıkış suyu sıcaklığı: ${inlet} C / ${outlet} C`,
    `Yaş termometre sıcaklığı: ${wetBulb} C`,
    '',
    'Bu ihtiyaç için teklif ve teknik değerlendirme rica ederim.',
  ].join('\n');
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  const [contactInfo, resolvedSearchParams] = await Promise.all([
    fetchContactInfo(locale),
    searchParams ?? Promise.resolve({}),
  ]);
  const initialMessage = buildCapacityMessage(resolvedSearchParams, locale);

  return (
    <div className="pt-24">
      <ContactSection contactInfo={contactInfo} initialMessage={initialMessage} />
    </div>
  );
}
