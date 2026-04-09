import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { hasLocale } from '@/i18n/locales';
import { fetchActiveLocales } from '@/i18n/server';
import { notFound } from 'next/navigation';
import { API_BASE_URL, SITE_URL } from '@/lib/utils';
import type { Product, ContactInfo, HeroStats, AboutContent, GlobalReachStats, FeaturedTestimonial, FaqItem } from '@/lib/api';

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

async function fetchSetting<T>(key: string, locale: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/site_settings/${key}?locale=${locale}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return fallback;
    const dto = await res.json();
    const raw = dto?.value;
    return (typeof raw === 'string' ? JSON.parse(raw) : raw) ?? fallback;
  } catch {
    return fallback;
  }
}

const fetchContactInfo = (locale: string) => fetchSetting<ContactInfo>('contact_info', locale, {});
const fetchHeroStats = (locale: string) => fetchSetting<HeroStats>('hero_stats', locale, {});
const fetchAboutContent = (locale: string) => fetchSetting<AboutContent>('about_content', locale, {});
const fetchGlobalReachStats = (locale: string) => fetchSetting<GlobalReachStats>('global_reach_stats', locale, {});
const fetchTestimonial = (locale: string) => fetchSetting<FeaturedTestimonial>('testimonial_featured', locale, {});
const fetchFaqItems = (locale: string) => fetchSetting<FaqItem[]>('faq_items', locale, []);

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  const [products, contactInfo, heroStats, aboutContent, globalReachStats, testimonial, faqItems] = await Promise.all([
    fetchFeaturedProducts(locale),
    fetchContactInfo(locale),
    fetchHeroStats(locale),
    fetchAboutContent(locale),
    fetchGlobalReachStats(locale),
    fetchTestimonial(locale),
    fetchFaqItems(locale),
  ]);

  return (
    <>
      <HeroSection heroStats={heroStats} />
      <MarqueeBar />
      <AboutSection aboutContent={aboutContent} />
      <HowItWorksSection />
      <TowerTypesSection />
      <ProductsSection products={products} />
      <TechnicalSpecsSection />
      <IndustriesSection />
      <AdvantagesSection />
      <GlobalReachSection globalReachStats={globalReachStats} />
      <TestimonialSection testimonial={testimonial} />
      <CtaSection phone={contactInfo.phone} />
      <ContactSection contactInfo={contactInfo} />
      <FaqSection faqItems={faqItems} />
    </>
  );
}
