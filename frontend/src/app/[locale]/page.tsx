import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { hasLocale } from '@/i18n/locales';
import { fetchActiveLocales } from '@/i18n/server';
import { notFound } from 'next/navigation';
import { API_BASE_URL, SITE_URL } from '@/lib/utils';
import type { Product, ContactInfo } from '@/lib/api';

import { HeroSection } from '@/components/sections/HeroSection';
import { MarqueeBar } from '@/components/sections/MarqueeBar';
import { AboutSection } from '@/components/sections/AboutSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { TowerTypesSection } from '@/components/sections/TowerTypesSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { TechnicalSpecsSection } from '@/components/sections/TechnicalSpecsSection';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { AdvantagesSection } from '@/components/sections/AdvantagesSection';
import { GlobalReachSection } from '@/components/sections/GlobalReachSection';
import { TestimonialSection } from '@/components/sections/TestimonialSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FaqSection } from '@/components/sections/FaqSection';

export async function generateStaticParams() {
  const locales = await fetchActiveLocales();
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.home' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        tr: `${SITE_URL}/tr`,
        en: `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/tr`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}`,
      siteName: 'Ensotek',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
    },
  };
}

async function fetchFeaturedProducts(locale: string): Promise<Product[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/products?item_type=cooling_tower&is_active=1&limit=3&locale=${locale}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    const items = Array.isArray(data) ? data : (data as { items?: Product[] })?.items ?? [];
    return items;
  } catch {
    return [];
  }
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  const [products, contactInfo] = await Promise.all([
    fetchFeaturedProducts(locale),
    fetchContactInfo(locale),
  ]);

  return (
    <>
      <HeroSection />
      <MarqueeBar />
      <AboutSection />
      <HowItWorksSection />
      <TowerTypesSection />
      <ProductsSection products={products} />
      <TechnicalSpecsSection />
      <IndustriesSection />
      <AdvantagesSection />
      <GlobalReachSection />
      <TestimonialSection />
      <CtaSection phone={contactInfo.phone} />
      <ContactSection contactInfo={contactInfo} />
      <FaqSection />
    </>
  );
}
