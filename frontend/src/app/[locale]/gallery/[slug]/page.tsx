import { publicUrl, recordLanguages } from '@/lib/public-seo';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale } from '@/i18n/locales';
import { notFound } from 'next/navigation';
import { API_BASE_URL, SITE_URL, resolvePublicAssetUrl } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import type { Gallery, GalleryImage } from '@/lib/api';
import { SectionHeader } from '@/components/patterns/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

async function fetchGallery(slug: string, locale: string): Promise<Gallery | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/galleries/${encodeURIComponent(slug)}?locale=${locale}`,
      { cache: 'no-store' },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug: encodedSlug } = await params;
  const slug = decodeURIComponent(encodedSlug);
  const gallery = await fetchGallery(slug, locale);
  if (!gallery) return {};
  return {
    title: gallery.meta_title ?? gallery.title,
    description: gallery.meta_description ?? gallery.description ?? gallery.summary ?? undefined,
    alternates: {
      canonical: publicUrl(locale, `/gallery/${slug}`),
      languages: await recordLanguages('gallery', gallery.id),
    },
  };
}

export default async function GalleryDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug: encodedSlug } = await params;
  const slug = decodeURIComponent(encodedSlug);
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  const [gallery, t] = await Promise.all([
    fetchGallery(slug, locale),
    getTranslations({ locale, namespace: 'gallery' }),
  ]);

  if (!gallery) notFound();

  const imageUrls = (gallery.images ?? [])
    .map((img: GalleryImage) => resolvePublicAssetUrl(img.image_url ?? img.url ?? null))
    .filter((v): v is string => Boolean(v));

  return (
    <div className="pt-24">
      <div className="section-py">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <Link
              href="/gallery"
              locale={locale}
              className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-(--color-text-muted) transition-colors hover:text-(--color-accent)"
            >
              <ArrowLeft size={14} /> {t('backToList')}
            </Link>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeader as="h1"
              label={t('label')}
              title={gallery.title}
              description={gallery.description ?? gallery.summary ?? undefined}
              className="mb-16"
            />
          </Reveal>

          {imageUrls.length > 0 && (
            <Reveal delay={120}>
              <GalleryGrid images={imageUrls} alt={gallery.title} />
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}
