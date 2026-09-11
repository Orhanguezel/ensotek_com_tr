import { publicUrl } from '@/lib/public-seo';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from '@/i18n/locales';
import { fetchActiveLocales } from '@/i18n/server';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/utils';
import { CapacityCalculator } from '@/components/tools/CapacityCalculator';

export async function generateStaticParams() {
  const locales = await fetchActiveLocales();
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Cooling Tower Capacity Calculator | Ensotek' : 'Soğutma Kulesi Kapasite Hesaplama | Ensotek',
    description: isEn
      ? 'Estimate cooling tower heat rejection capacity from flow rate, inlet temperature, outlet temperature and wet bulb temperature.'
      : 'Debi, giriş sıcaklığı, çıkış sıcaklığı ve yaş termometre değerleriyle soğutma kulesi kapasitesini yaklaşık olarak hesaplayın.',
    alternates: {
      canonical: publicUrl(locale, `/hesap-makinesi`),
      languages: {
        tr: publicUrl('tr', `/hesap-makinesi`),
        en: publicUrl('en', `/hesap-makinesi`),
        'x-default': publicUrl('tr', `/hesap-makinesi`),
      },
    },
  };
}

export default async function CapacityCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <div className="pt-24">
      <CapacityCalculator locale={locale} />
    </div>
  );
}
