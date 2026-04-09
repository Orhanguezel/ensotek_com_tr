import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { hasLocale } from '@/i18n/locales';
import { notFound } from 'next/navigation';
import { API_BASE_URL, SITE_URL } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import type { Product } from '@/lib/api';

async function fetchProduct(slug: string, locale: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/products/by-slug/${encodeURIComponent(slug)}?item_type=cooling_tower&locale=${locale}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await fetchProduct(slug, locale);
  if (!product) return {};
  return {
    title: product.meta_title ?? product.title,
    description: product.meta_description ?? product.summary ?? product.description ?? undefined,
    alternates: {
      canonical: `${SITE_URL}/${locale}/products/${slug}`,
      languages: {
        tr: `${SITE_URL}/tr/products/${slug}`,
        en: `${SITE_URL}/en/products/${slug}`,
        'x-default': `${SITE_URL}/tr/products/${slug}`,
      },
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  const [product, t] = await Promise.all([
    fetchProduct(slug, locale),
    getTranslations({ locale, namespace: 'products' }),
  ]);

  if (!product) notFound();

  return (
    <div className="pt-24">
      <div className="section-py">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Link
            href="/products"
            locale={locale}
            className="inline-flex items-center gap-2 text-xs text-(--silver) hover:text-(--cyan) transition-colors uppercase tracking-wider mb-10"
          >
            <ArrowLeft size={14} /> {t('backToList')}
          </Link>

          <span className="section-label-et">{t('detailLabel')}</span>
          <h1 className="section-title-et">{product.title}</h1>
          {product.summary && (
            <p className="section-subtitle-et mb-8">{product.summary}</p>
          )}
          {product.content && (
            <div
              className="prose prose-invert max-w-none text-(--mist)"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
