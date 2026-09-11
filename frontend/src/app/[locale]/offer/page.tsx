import { publicUrl } from '@/lib/public-seo';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { fetchActiveLocales } from '@/i18n/server';
import { hasLocale } from '@/i18n/locales';
import { SITE_URL } from '@/lib/utils';
import { OfferPage } from '@/components/containers/offer/OfferPage';

export async function generateStaticParams() {
  const locales = await fetchActiveLocales();
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.offer' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: publicUrl(locale, `/offer`),
      languages: {
        tr: publicUrl('tr', `/offer`),
        en: publicUrl('en', `/offer`),
        'x-default': publicUrl('tr', `/offer`),
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  return <OfferPage locale={locale} />;
}
