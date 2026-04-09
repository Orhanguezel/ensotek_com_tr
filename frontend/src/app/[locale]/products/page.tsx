import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { hasLocale } from '@/i18n/locales';
import { fetchActiveLocales } from '@/i18n/server';
import { notFound } from 'next/navigation';
import { API_BASE_URL, SITE_URL } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { SectionHeader } from '@/components/patterns/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/api';

export async function generateStaticParams() {
  const locales = await fetchActiveLocales();
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.products' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/products`,
      languages: { tr: `${SITE_URL}/tr/products`, en: `${SITE_URL}/en/products`, 'x-default': `${SITE_URL}/tr/products` },
    },
  };
}

async function fetchProducts(locale: string): Promise<Product[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/products?item_type=cooling_tower&is_active=1&locale=${locale}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data as { items?: Product[] })?.items ?? [];
  } catch {
    return [];
  }
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'products' });
  const products = await fetchProducts(locale);

  return (
    <div className="pt-24">
      <div className="section-py">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              label={t('label')}
              title={t('title')}
              description={t('subtitle')}
              className="mb-16"
            />
          </Reveal>

          {products.length === 0 ? (
            <p className="text-(--mist) text-center py-16">{t('empty')}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-(--color-border)">
              {products.map((product, i) => (
                <Reveal key={product.id} delay={i * 80}>
                  <div className="product-card-et group h-full">
                    <div className="h-48 bg-gradient-to-br from-(--panel) to-(--steel)" />
                    <div className="p-6 flex flex-col flex-1">
                      <h2 className="text-lg font-semibold text-(--white) mb-2 font-[family-name:var(--font-display)] uppercase tracking-wide group-hover:text-(--cyan) transition-colors">
                        {product.title}
                      </h2>
                      <p className="text-sm text-(--mist) leading-relaxed flex-1 mb-4">
                        {product.summary ?? product.description ?? ''}
                      </p>
                      <Link
                        href={`/products/${product.slug}`}
                        locale={locale}
                        className="text-xs text-(--cyan) hover:text-(--cyan-glow) transition-colors inline-flex items-center gap-2 uppercase tracking-wider"
                      >
                        {t('details')} <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
