import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { hasLocale } from '@/i18n/locales';
import { fetchActiveLocales } from '@/i18n/server';
import { notFound } from 'next/navigation';
import { API_BASE_URL, SITE_URL, resolvePublicAssetUrl } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { SectionHeader } from '@/components/patterns/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { ArrowRight } from 'lucide-react';
import type { Gallery } from '@/lib/api';

export async function generateStaticParams() {
  const locales = await fetchActiveLocales();
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.gallery' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/gallery`,
      languages: { tr: `${SITE_URL}/tr/gallery`, en: `${SITE_URL}/en/gallery`, 'x-default': `${SITE_URL}/tr/gallery` },
    },
  };
}

async function fetchGalleries(locale: string): Promise<Gallery[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/gallery?is_active=1&locale=${locale}`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data as { items?: Gallery[] })?.items ?? [];
  } catch {
    return [];
  }
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'gallery' });
  const galleries = await fetchGalleries(locale);

  return (
    <div className="pt-24">
      <div className="section-py">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <SectionHeader label={t('label')} title={t('title')} description={t('subtitle')} className="mb-16" />
          </Reveal>

          {galleries.length === 0 ? (
            <p className="text-(--mist) text-center py-16">{t('empty')}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-(--color-border)">
              {galleries.map((gallery, i) => (
                <Reveal key={gallery.id} delay={i * 80}>
                  <div className="product-card-et group h-full">
                    <div className="h-52 relative bg-gradient-to-br from-(--panel) to-(--steel) overflow-hidden">
                      {gallery.cover_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={resolvePublicAssetUrl(gallery.cover_url) ?? ''}
                          alt={gallery.alt ?? gallery.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h2 className="text-base font-semibold text-(--white) mb-2 font-[family-name:var(--font-display)] uppercase tracking-wide group-hover:text-(--cyan) transition-colors">
                        {gallery.title}
                      </h2>
                      <Link
                        href={`/gallery/${gallery.slug}`}
                        locale={locale}
                        className="text-xs text-(--cyan) hover:text-(--cyan-glow) inline-flex items-center gap-2 uppercase tracking-wider"
                      >
                        {t('viewGallery')} <ArrowRight size={12} />
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
