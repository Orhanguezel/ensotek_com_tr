import type { Metadata } from 'next';
import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { hasLocale } from '@/i18n/locales';
import { fetchActiveLocales } from '@/i18n/server';
import { notFound } from 'next/navigation';
import { API_BASE_URL, SITE_URL } from '@/lib/utils';
import type { Product, ContactInfo, HeroStats, AboutContent, GlobalReachStats, FeaturedTestimonial, FaqItem, Review } from '@/lib/api';

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
import { HomeScrollManager } from '@/components/sections/HomeScrollManager';

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
      `${API_BASE_URL}/products?item_type=product&is_active=1&limit=3&locale=${locale}`,
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

async function fetchTestimonials(locale: string): Promise<Review[]> {
  try {
    const params = new URLSearchParams({
      locale,
      target_type: 'testimonial',
      target_id: '11111111-1111-1111-1111-111111111111',
      limit: '6',
      sort: 'display_order',
      order: 'asc',
    });
    const res = await fetch(`${API_BASE_URL}/reviews?${params.toString()}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const items: Review[] = Array.isArray(data)
      ? data
      : ((data as { items?: Review[]; data?: Review[] })?.items ?? (data as { data?: Review[] })?.data ?? []);
    return items.filter((item) => item.comment && item.name);
  } catch {
    return [];
  }
}

function buildFaqJsonLd(locale: string, faqItems: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: `${SITE_URL}/${locale}#faq`,
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  const [products, contactInfo, heroStats, aboutContent, globalReachStats, testimonial, testimonials, faqItems, tFaq] = await Promise.all([
    fetchFeaturedProducts(locale),
    fetchContactInfo(locale),
    fetchHeroStats(locale),
    fetchAboutContent(locale),
    fetchGlobalReachStats(locale),
    fetchTestimonial(locale),
    fetchTestimonials(locale),
    fetchFaqItems(locale),
    getTranslations({ locale, namespace: 'home.faq' }),
  ]);
  const displayFaqItems =
    faqItems.length > 0
      ? faqItems
      : [1, 2, 3, 4, 5].map((i) => ({
          question: tFaq(`faq${i}.question`),
          answer: tFaq(`faq${i}.answer`),
        }));
  const faqSchema = buildFaqJsonLd(locale, displayFaqItems);

  return (
    <>
      <script
        id="jsonld-faq-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />
      <Suspense fallback={null}>
        <HomeScrollManager />
      </Suspense>
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
      <TestimonialSection testimonial={testimonial} testimonials={testimonials} />
      <CtaSection phone={contactInfo.phone} />
      <ContactSection contactInfo={contactInfo} />
      <FaqSection faqItems={faqItems} />
    </>
  );
}
