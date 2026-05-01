import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { hasLocale } from '@/i18n/locales';
import { notFound } from 'next/navigation';
import { API_BASE_URL, SITE_URL, resolvePublicAssetUrl } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import type { Product } from '@/lib/api';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { DatasheetRequestButton } from '@/components/products/DatasheetRequestButton';
import { ProductGallery } from '@/components/products/ProductGallery';

async function fetchByItemType(slug: string, locale: string, itemType: 'product' | 'sparepart'): Promise<Product | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/products/by-slug/${encodeURIComponent(slug)}?item_type=${itemType}&locale=${locale}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function fetchProduct(slug: string, locale: string): Promise<Product | null> {
  const product = await fetchByItemType(slug, locale, 'product');
  if (product) return product;
  return fetchByItemType(slug, locale, 'sparepart');
}

function jsonLdProduct(product: Product, locale: string, slug: string) {
  const image = product.image_url
    ? product.image_url.startsWith('http')
      ? product.image_url
      : `${SITE_URL}${product.image_url.startsWith('/') ? '' : '/'}${product.image_url}`
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.meta_description ?? product.summary ?? product.description ?? undefined,
    image,
    url: `${SITE_URL}/${locale}/products/${slug}`,
    brand: { '@type': 'Brand', name: 'Ensotek' },
    manufacturer: { '@type': 'Organization', name: 'Ensotek' },
    category: 'Endüstriyel soğutma kulesi',
  };
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
  const productSchema = jsonLdProduct(product, locale, slug);
  const hasSpecs = product.specifications && Object.keys(product.specifications).length > 0;

  const heroImage = resolvePublicAssetUrl(product.image_url);
  const galleryThumbs = (product.images ?? [])
    .map((img) => resolvePublicAssetUrl(img))
    .filter((v): v is string => Boolean(v) && v !== heroImage);
  const fallbackHero = !heroImage ? galleryThumbs[0] : undefined;
  const cover = heroImage ?? fallbackHero;
  const thumbs = heroImage ? galleryThumbs : galleryThumbs.slice(1);

  return (
    <div className="pt-24">
      <script
        id={`jsonld-product-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, '\\u003c') }}
      />
      <div className="section-py">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: locale === 'tr' ? 'Ana Sayfa' : 'Home', href: '/' },
              { label: t('backToList'), href: '/products' },
              { label: product.title, href: { pathname: '/products/[slug]', params: { slug } } },
            ]}
          />
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

          {cover && (
            <ProductGallery hero={cover} thumbs={thumbs} alt={product.alt ?? product.title} />
          )}

          <div className="mb-10 flex flex-wrap gap-3">
            <DatasheetRequestButton locale={locale} productTitle={product.title} productSlug={slug} />
          </div>
          {(product.content ?? product.description) && (
            <div
              className="prose-themed max-w-4xl"
              dangerouslySetInnerHTML={{ __html: (product.content ?? product.description ?? '') }}
            />
          )}
          {hasSpecs && (
            <div className="mt-12 border border-(--color-border)">
              {Object.entries(product.specifications!).slice(0, 12).map(([key, value], index) => (
                <div
                  key={key}
                  className={`grid gap-3 border-b border-(--color-border) px-5 py-4 last:border-b-0 md:grid-cols-[220px_1fr] ${index % 2 === 0 ? 'bg-(--panel)' : 'bg-transparent'}`}
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-(--cyan)">{key}</div>
                  <div className="text-sm text-(--mist)">{value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
