import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { hasLocale } from '@/i18n/locales';
import { notFound } from 'next/navigation';
import { API_BASE_URL, SITE_URL, resolvePublicAssetUrl } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import type { Gallery } from '@/lib/api';

async function fetchGallery(slug: string, locale: string): Promise<Gallery | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/gallery/by-slug/${encodeURIComponent(slug)}?locale=${locale}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const gallery = await fetchGallery(slug, locale);
  if (!gallery) return {};
  return {
    title: gallery.meta_title ?? gallery.title,
    description: gallery.meta_description ?? gallery.summary ?? undefined,
    alternates: {
      canonical: `${SITE_URL}/${locale}/gallery/${slug}`,
      languages: { tr: `${SITE_URL}/tr/gallery/${slug}`, en: `${SITE_URL}/en/gallery/${slug}`, 'x-default': `${SITE_URL}/tr/gallery/${slug}` },
    },
  };
}

export default async function GalleryDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  const [gallery, t] = await Promise.all([
    fetchGallery(slug, locale),
    getTranslations({ locale, namespace: 'gallery' }),
  ]);

  if (!gallery) notFound();

  return (
    <div className="pt-24">
      <div className="section-py">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Link href="/gallery" locale={locale} className="inline-flex items-center gap-2 text-xs text-(--silver) hover:text-(--cyan) transition-colors uppercase tracking-wider mb-10">
            <ArrowLeft size={14} /> {t('backToList')}
          </Link>
          <span className="section-label-et">{t('detailLabel')}</span>
          <h1 className="section-title-et">{gallery.title}</h1>
          {gallery.summary && <p className="section-subtitle-et mb-10">{gallery.summary}</p>}

          {gallery.images && gallery.images.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-(--color-border)">
              {gallery.images.map((img) => (
                <div key={img.id} className="aspect-video relative overflow-hidden bg-(--panel)">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolvePublicAssetUrl(img.url) ?? ''}
                    alt={img.alt ?? gallery.title}
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
