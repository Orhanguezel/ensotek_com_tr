import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { hasLocale } from '@/i18n/locales';
import { notFound } from 'next/navigation';
import { API_BASE_URL, SITE_URL, resolvePublicAssetUrl } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { SectionHeader } from '@/components/patterns/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/api';
import { FALLBACK_BLOG_POSTS } from '@/data/blog-posts';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.blog' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog`,
      languages: { tr: `${SITE_URL}/tr/blog`, en: `${SITE_URL}/en/blog`, 'x-default': `${SITE_URL}/tr/blog` },
    },
  };
}

async function fetchBlogPosts(locale: string): Promise<BlogPost[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/custom-pages?module_key=blog&is_published=1&limit=24&locale=${locale}`,
      { cache: 'no-store' },
    );
    if (!res.ok) return locale === 'tr' ? FALLBACK_BLOG_POSTS : [];
    const data = await res.json();
    const items = Array.isArray(data) ? data : (data as { items?: BlogPost[] })?.items ?? [];
    return items.length > 0 ? items : locale === 'tr' ? FALLBACK_BLOG_POSTS : [];
  } catch {
    return locale === 'tr' ? FALLBACK_BLOG_POSTS : [];
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  const [posts, t] = await Promise.all([
    fetchBlogPosts(locale),
    getTranslations({ locale, namespace: 'blog' }),
  ]);

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

          {posts.length === 0 ? (
            <p className="text-(--color-text-secondary) text-center py-16">{t('empty')}</p>
          ) : (
            <div className="grid gap-0.5 bg-(--color-border) md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => {
                const cover = resolvePublicAssetUrl(
                  post.image_url ?? post.featured_image ?? null,
                );
                return (
                  <Reveal key={post.id} delay={i * 80}>
                    <article className="product-card-et group h-full">
                      {cover && (
                        <div className="h-48 relative bg-linear-to-br from-(--color-bg-panel) to-(--color-bg-surface) overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={cover}
                            alt={post.featured_image_alt ?? post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading={i < 3 ? 'eager' : 'lazy'}
                          />
                        </div>
                      )}
                      <div className="p-6 flex h-full flex-col">
                        <span className="section-label-et mb-4">{t('articleLabel')}</span>
                        <h2 className="mb-3 text-lg font-semibold uppercase tracking-wide text-(--color-text-primary) font-[family-name:var(--font-display)] group-hover:text-(--color-accent) transition-colors">
                          {post.title}
                        </h2>
                        <p className="mb-6 flex-1 text-sm leading-relaxed text-(--color-text-secondary)">
                          {post.summary ?? post.meta_description ?? ''}
                        </p>
                        <Link
                          href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                          locale={locale}
                          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-(--color-accent) transition-colors hover:text-(--cyan-glow)"
                        >
                          {t('readMore')} <ArrowRight size={12} />
                        </Link>
                      </div>
                    </article>
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
