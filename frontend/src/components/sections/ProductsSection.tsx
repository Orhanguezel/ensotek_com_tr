import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeader } from '@/components/patterns/SectionHeader';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/features/products/products.service';
import { resolvePublicAssetUrl } from '@/lib/utils';

type Props = { products?: Product[] };

const FALLBACK_PRODUCTS = [
  { id: '1', key: 'counterflow' },
  { id: '2', key: 'crossflow' },
  { id: '3', key: 'closedCircuit' },
];

export function ProductsSection({ products }: Props) {
  const t = useTranslations('home.products');
  const locale = useLocale();

  const items = products && products.length > 0
    ? products.slice(0, 3)
    : null;

  return (
    <section className="section-py" id="products">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <SectionHeader
              label={t('label')}
              title={t('title')}
              description={t('subtitle')}
            />
            <Link href="/products" locale={locale} className="btn-ghost text-sm whitespace-nowrap">
              {t('seeAll')} <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-0.5 bg-(--color-border)">
          {items
            ? items.map((product, i) => {
                const imageUrl = resolvePublicAssetUrl(product.image_url);

                return (
                  <Reveal key={product.id} delay={i * 100}>
                    <div className="product-card-et group h-full">
                      <div className="h-48 relative bg-gradient-to-br from-(--panel) to-(--steel) overflow-hidden">
                        {imageUrl ? (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={imageUrl}
                              alt={product.alt ?? product.title}
                              className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                              loading={i === 0 ? 'eager' : 'lazy'}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-(--panel)/20 to-transparent" />
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl font-bold text-(--cyan) opacity-10 font-[family-name:var(--font-display)]">
                              {(product.title ?? '?')[0]}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-(--white) mb-2 font-[family-name:var(--font-display)] uppercase tracking-wide group-hover:text-(--cyan) transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-sm text-(--mist) leading-relaxed flex-1 mb-4 line-clamp-3">
                          {product.meta_description
                            ?? product.summary
                            ?? (product.description ? product.description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 180) : '')}
                        </p>
                        <Link
                          href={{ pathname: '/products/[slug]', params: { slug: product.slug } }}
                          locale={locale}
                          className="text-xs text-(--cyan) hover:text-(--cyan-glow) transition-colors inline-flex items-center gap-2 uppercase tracking-wider"
                        >
                          {t('details')} <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                );
              })
            : FALLBACK_PRODUCTS.map((fp, i) => (
                <Reveal key={fp.id} delay={i * 100}>
                  <div className="product-card-et h-full">
                    <div className="h-48 bg-gradient-to-br from-(--panel) to-(--steel)" />
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-(--white) mb-2 font-[family-name:var(--font-display)] uppercase tracking-wide">
                        {t(`fallback.${fp.key}.title`)}
                      </h3>
                      <p className="text-sm text-(--mist) leading-relaxed mb-4">
                        {t(`fallback.${fp.key}.description`)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}
