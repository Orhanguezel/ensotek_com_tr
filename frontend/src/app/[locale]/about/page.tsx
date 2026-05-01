import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { hasLocale } from '@/i18n/locales';
import { notFound } from 'next/navigation';
import { API_BASE_URL, SITE_URL, resolvePublicAssetUrl } from '@/lib/utils';
import type { CustomPage } from '@/lib/api';
import { SectionHeader } from '@/components/patterns/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { ProductGallery } from '@/components/products/ProductGallery';
import { CertificateGrid } from '@/components/about/CertificateGrid';

const ABOUT_MODULE_KEYS = ['about', 'mission', 'vision', 'quality'] as const;
type AboutModuleKey = (typeof ABOUT_MODULE_KEYS)[number];

async function fetchCustomPage(moduleKey: AboutModuleKey, locale: string): Promise<CustomPage | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/custom-pages?module_key=${moduleKey}&locale=${locale}&limit=1`,
      { cache: 'no-store' },
    );
    if (!res.ok) return null;
    const data = await res.json();
    const list: CustomPage[] = Array.isArray(data) ? data : (data?.items ?? []);
    return list[0] ?? null;
  } catch (err) {
    console.error(`[about] fetchCustomPage(${moduleKey}) failed:`, err);
    return null;
  }
}

function parseImages(images: CustomPage['images']): string[] {
  if (!images) return [];
  if (Array.isArray(images)) return images;
  try {
    const parsed = JSON.parse(images as unknown as string);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function extractHtml(content: CustomPage['content']): string {
  if (!content) return '';
  if (typeof content === 'string') {
    try {
      const parsed = JSON.parse(content);
      return typeof parsed?.html === 'string' ? parsed.html : content;
    } catch {
      return content;
    }
  }
  return content.html ?? '';
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const about = await fetchCustomPage('about', locale);
  return {
    title: about?.meta_title ?? about?.title ?? 'Hakkımızda | Ensotek',
    description: about?.meta_description ?? about?.summary ?? undefined,
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: {
        tr: `${SITE_URL}/tr/kurumsal`,
        en: `${SITE_URL}/en/about`,
        'x-default': `${SITE_URL}/tr/kurumsal`,
      },
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'home.about' });
  const [about, mission, vision, quality] = await Promise.all(
    ABOUT_MODULE_KEYS.map((key) => fetchCustomPage(key, locale)),
  );

  if (!about && !mission && !vision && !quality) notFound();

  const aboutImage = resolvePublicAssetUrl(about?.image_url ?? about?.featured_image ?? null);
  const aboutThumbs = parseImages(about?.images)
    .map((img) => resolvePublicAssetUrl(img))
    .filter((v): v is string => Boolean(v) && v !== aboutImage);

  const qualityImage = resolvePublicAssetUrl(quality?.image_url ?? quality?.featured_image ?? null);
  const qualityCerts = parseImages(quality?.images)
    .map((img) => resolvePublicAssetUrl(img))
    .filter((v): v is string => Boolean(v) && v !== qualityImage);

  return (
    <div className="pt-24">
      <div className="section-py">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {about && (
            <>
              <Reveal>
                <SectionHeader
                  label={t('label')}
                  title={about.title}
                  description={about.summary ?? undefined}
                  className="mb-16"
                />
              </Reveal>

              {aboutImage && (
                <Reveal delay={80}>
                  <div className="mb-12 max-w-4xl">
                    <ProductGallery hero={aboutImage} thumbs={aboutThumbs} alt={about.title} />
                  </div>
                </Reveal>
              )}

              {extractHtml(about.content) && (
                <Reveal delay={120}>
                  <div
                    className="prose-themed max-w-4xl"
                    dangerouslySetInnerHTML={{ __html: extractHtml(about.content) }}
                  />
                </Reveal>
              )}
            </>
          )}

          {mission && (
            <div className="mt-24">
              <Reveal>
                <SectionHeader
                  label={locale === 'tr' ? 'Misyon' : 'Mission'}
                  title={mission.title}
                  className="mb-10"
                />
              </Reveal>
              {extractHtml(mission.content) && (
                <Reveal delay={80}>
                  <div
                    className="prose-themed max-w-4xl"
                    dangerouslySetInnerHTML={{ __html: extractHtml(mission.content) }}
                  />
                </Reveal>
              )}
            </div>
          )}

          {vision && (
            <div className="mt-24">
              <Reveal>
                <SectionHeader
                  label={locale === 'tr' ? 'Vizyon' : 'Vision'}
                  title={vision.title}
                  className="mb-10"
                />
              </Reveal>
              {extractHtml(vision.content) && (
                <Reveal delay={80}>
                  <div
                    className="prose-themed max-w-4xl"
                    dangerouslySetInnerHTML={{ __html: extractHtml(vision.content) }}
                  />
                </Reveal>
              )}
            </div>
          )}

          {quality && (
            <div className="mt-24">
              <Reveal>
                <SectionHeader
                  label={locale === 'tr' ? 'Kalite' : locale === 'de' ? 'Qualität' : 'Quality'}
                  title={quality.title}
                  description={quality.summary ?? undefined}
                  className="mb-10"
                />
              </Reveal>
              {extractHtml(quality.content) && (
                <Reveal delay={80}>
                  <div
                    className="prose-themed max-w-4xl mb-8"
                    dangerouslySetInnerHTML={{ __html: extractHtml(quality.content) }}
                  />
                </Reveal>
              )}
              {qualityCerts.length > 0 && (
                <Reveal delay={120}>
                  <CertificateGrid images={qualityCerts} alt={quality.title} />
                </Reveal>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
