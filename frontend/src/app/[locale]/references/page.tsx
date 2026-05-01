import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { hasLocale } from '@/i18n/locales';
import { fetchActiveLocales } from '@/i18n/server';
import { notFound } from 'next/navigation';
import { API_BASE_URL, SITE_URL, resolvePublicAssetUrl } from '@/lib/utils';
import { SectionHeader } from '@/components/patterns/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import type { Reference } from '@/lib/api';

export async function generateStaticParams() {
  const locales = await fetchActiveLocales();
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.references' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/references`,
      languages: { tr: `${SITE_URL}/tr/references`, en: `${SITE_URL}/en/references`, 'x-default': `${SITE_URL}/tr/references` },
    },
  };
}

async function fetchReferences(locale: string): Promise<Reference[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/references?is_published=1&locale=${locale}&limit=100`,
      { cache: 'no-store' },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data as { items?: Reference[] })?.items ?? [];
  } catch {
    return [];
  }
}

export default async function ReferencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'references' });
  const references = await fetchReferences(locale);

  return (
    <div className="pt-24">
      <div className="section-py">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <SectionHeader label={t('label')} title={t('title')} description={t('subtitle')} className="mb-16" />
          </Reveal>

          {references.length === 0 ? (
            <p className="text-(--color-text-secondary) text-center py-16">{t('empty')}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-(--color-border)">
              {references.map((ref, i) => {
                const logo = resolvePublicAssetUrl(ref.featured_image ?? ref.featured_image_url ?? null);
                const Card = ref.website_url ? 'a' : 'div';
                const cardProps = ref.website_url
                  ? { href: ref.website_url, target: '_blank' as const, rel: 'noopener noreferrer' as const }
                  : {};
                return (
                  <Reveal key={ref.id} delay={Math.min(i * 50, 320)}>
                    <Card
                      {...cardProps}
                      className="group flex h-full flex-col bg-(--color-bg) p-8 border-l-2 border-transparent transition-colors hover:bg-(--color-bg-panel) hover:border-(--color-accent)"
                      aria-label={ref.title}
                    >
                      <div className="mb-6 flex h-16 w-32 items-center justify-start overflow-hidden">
                        {logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={logo}
                            alt={ref.featured_image_alt ?? `${ref.title} logo`}
                            className="max-h-full max-w-full object-contain object-left"
                            loading={i < 6 ? 'eager' : 'lazy'}
                          />
                        ) : (
                          <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-(--color-accent)">
                            {ref.client_name?.slice(0, 1) ?? ref.title.slice(0, 1)}
                          </span>
                        )}
                      </div>

                      {ref.client_name && ref.client_name !== ref.title && (
                        <div className="mb-2 font-[family-name:var(--font-display)] text-xs uppercase tracking-wider text-(--color-accent)">
                          {ref.client_name}
                        </div>
                      )}

                      <h2 className="mb-2 font-[family-name:var(--font-display)] text-base font-semibold text-(--color-text-primary) transition-colors group-hover:text-(--color-accent)">
                        {ref.title}
                      </h2>

                      {ref.summary && (
                        <p className="text-sm leading-relaxed text-(--color-text-secondary)">{ref.summary}</p>
                      )}

                      {(ref.location || ref.year) && (
                        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-(--color-text-muted)">
                          {ref.location && <span>{ref.location}</span>}
                          {ref.year && <span>{ref.year}</span>}
                        </div>
                      )}
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
