import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from '@/i18n/locales';
import { fetchActiveLocales } from '@/i18n/server';
import { notFound } from 'next/navigation';
import { API_BASE_URL, SITE_URL } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { ContactSection } from '@/components/sections/ContactSection';
import type { ContactInfo } from '@/lib/api';

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
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: { tr: `${SITE_URL}/tr/contact`, en: `${SITE_URL}/en/contact`, 'x-default': `${SITE_URL}/tr/contact` },
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

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  const contactInfo = await fetchContactInfo(locale);

  return (
    <div className="pt-24">
      <ContactSection contactInfo={contactInfo} />
    </div>
  );
}
