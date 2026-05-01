import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { hasLocale } from '@/i18n/locales';
import { notFound } from 'next/navigation';
import { API_BASE_URL, SITE_URL, resolvePublicAssetUrl } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import type { BlogPost } from '@/lib/api';
import { SectionHeader } from '@/components/patterns/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { ProductGallery } from '@/components/products/ProductGallery';
import { fallbackBlogPost } from '@/data/blog-posts';

function parseImages(images: BlogPost['images']): string[] {
  if (!images) return [];
  if (Array.isArray(images)) return images;
  try {
    const parsed = JSON.parse(images);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function fetchBlogPost(slug: string, locale: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/custom-pages/by-slug/${encodeURIComponent(slug)}?locale=${locale}`,
      { cache: 'no-store' },
    );
    if (!res.ok) return locale === 'tr' ? fallbackBlogPost(slug) : null;
    const post = (await res.json()) as BlogPost;
    return post.module_key === 'blog' ? post : locale === 'tr' ? fallbackBlogPost(slug) : null;
  } catch {
    return locale === 'tr' ? fallbackBlogPost(slug) : null;
  }
}

function htmlFromContent(content?: string | null): string {
  if (!content) return '';
  try {
    const parsed = JSON.parse(content) as { html?: unknown };
    return typeof parsed.html === 'string' ? parsed.html : content;
  } catch {
    return content;
  }
}

function articleSchema(post: BlogPost, locale: string, slug: string) {
  const published = post.created_at ?? post.updated_at;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description ?? post.summary ?? undefined,
    datePublished: published,
    dateModified: post.updated_at ?? published,
    inLanguage: locale,
    url: `${SITE_URL}/${locale}/blog/${slug}`,
    author: { '@type': 'Organization', name: 'Ensotek' },
    publisher: {
      '@type': 'Organization',
      name: 'Ensotek',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/ensotek_icon_512.png` },
    },
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await fetchBlogPost(slug, locale);
  if (!post) return {};
  return {
    title: post.meta_title ?? post.title,
    description: post.meta_description ?? post.summary ?? undefined,
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog/${slug}`,
      languages: {
        tr: `${SITE_URL}/tr/blog/${slug}`,
        en: `${SITE_URL}/en/blog/${slug}`,
        'x-default': `${SITE_URL}/tr/blog/${slug}`,
      },
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  const [post, t] = await Promise.all([
    fetchBlogPost(slug, locale),
    getTranslations({ locale, namespace: 'blog' }),
  ]);

  if (!post) notFound();
  const html = htmlFromContent(post.content);
  const schema = articleSchema(post, locale, slug);

  const heroImage = resolvePublicAssetUrl(post.image_url ?? post.featured_image ?? null);
  const galleryThumbs = parseImages(post.images)
    .map((img) => resolvePublicAssetUrl(img))
    .filter((v): v is string => Boolean(v) && v !== heroImage);

  return (
    <div className="pt-24">
      <script
        id={`jsonld-article-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <div className="section-py">
        <article className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <Link
              href="/blog"
              locale={locale}
              className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-(--color-text-muted) transition-colors hover:text-(--color-accent)"
            >
              <ArrowLeft size={14} /> {t('backToList')}
            </Link>
          </Reveal>

          <Reveal delay={60}>
            <SectionHeader
              label={t('articleLabel')}
              title={post.title}
              description={post.summary ?? undefined}
              className="mb-16"
            />
          </Reveal>

          {heroImage && (
            <Reveal delay={100}>
              <div className="mb-12 max-w-4xl">
                <ProductGallery
                  hero={heroImage}
                  thumbs={galleryThumbs}
                  alt={post.featured_image_alt ?? post.title}
                />
              </div>
            </Reveal>
          )}

          {html && (
            <Reveal delay={120}>
              <div
                className="prose-themed max-w-4xl"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </Reveal>
          )}
        </article>
      </div>
    </div>
  );
}
