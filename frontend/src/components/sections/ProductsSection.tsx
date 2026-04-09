import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeader } from '@/components/patterns/SectionHeader';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/features/products/products.service';

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
            ? items.map((product, i) => (
                <Reveal key={product.id} delay={i * 100}>
                  <div className="product-card-et group h-full">
                    <div className="h-48 relative bg-gradient-to-br from-(--panel) to-(--steel) overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-(--cyan) opacity-10 font-[family-name:var(--font-display)]">
                          {(product.title ?? '?')[0]}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-semibold text-(--white) mb-2 font-[family-name:var(--font-display)] uppercase tracking-wide group-hover:text-(--cyan) transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-(--mist) leading-relaxed flex-1 mb-4">
                        {product.summary ?? product.description ?? ''}
                      </p>
                      <Link
                        href={`/products/${product.slug}`}
                        locale={locale}
                        className="text-xs text-(--cyan) hover:text-(--cyan-glow) transition-colors inline-flex items-center gap-2 uppercase tracking-wider"
                      >
                        {t('details')} <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))
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
