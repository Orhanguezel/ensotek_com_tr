import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { hasLocale } from '@/i18n/locales';
import { fetchActiveLocales } from '@/i18n/server';
import { notFound } from 'next/navigation';
import { API_BASE_URL, SITE_URL } from '@/lib/utils';
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
    const res = await fetch(`${API_BASE_URL}/references?is_active=1&locale=${locale}`, { next: { revalidate: 3600 } });
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
            <p className="text-(--mist) text-center py-16">{t('empty')}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-(--color-border)">
              {references.map((ref, i) => (
                <Reveal key={ref.id} delay={i * 80}>
                  <div className="bg-(--void) hover:bg-(--panel) transition-colors p-8 border-l-2 border-transparent hover:border-(--cyan) group">
                    {ref.client_name && (
                      <div className="text-xs text-(--cyan) tracking-wider uppercase mb-2 font-[family-name:var(--font-display)]">
                        {ref.client_name}
                      </div>
                    )}
                    <h2 className="text-base font-semibold text-(--white) mb-2 font-[family-name:var(--font-display)] group-hover:text-(--cyan) transition-colors">
                      {ref.title}
                    </h2>
                    {ref.summary && <p className="text-sm text-(--mist) leading-relaxed">{ref.summary}</p>}
                    {(ref.location ?? ref.year) && (
                      <div className="mt-4 flex items-center gap-4 text-xs text-(--silver)">
                        {ref.location && <span>{ref.location}</span>}
                        {ref.year && <span>{ref.year}</span>}
                      </div>
                    )}
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
