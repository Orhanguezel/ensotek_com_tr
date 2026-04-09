import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { ArrowRight, ChevronDown } from 'lucide-react';
import type { HeroStats } from '@/lib/api';

interface Props {
  heroStats?: HeroStats;
}

export function HeroSection({ heroStats }: Props) {
  const t = useTranslations('home.hero');
  const locale = useLocale();

  const STATS = [
    { key: 'years',     value: heroStats?.years     ?? '39+' },
    { key: 'towers',    value: heroStats?.towers    ?? '3000+' },
    { key: 'countries', value: heroStats?.countries ?? '40+' },
  ];

  return (
    <section className="hero" id="hero">
      {/* Background */}
      <div className="hero-bg" aria-hidden="true" />
      <div className="cyber-grid-bg absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 border border-(--color-border-strong) px-4 py-2 mb-8">
            <span className="size-2 bg-(--cyan) rounded-full animate-pulse" />
            <span className="text-xs tracking-[3px] text-(--cyan) uppercase font-[family-name:var(--font-display)]">
              {t('badge')}
            </span>
          </div>

          {/* Headline */}
          <h1>
            {t('line1')}{' '}
            <em>{t('line2')}</em>{' '}
            {t('line3')}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-(--mist) mb-10 max-w-2xl leading-relaxed font-light">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link href="/products" locale={locale} className="btn-fill">
              {t('cta1')} <ArrowRight size={16} />
            </Link>
            <Link href="/contact" locale={locale} className="btn-ghost">
              {t('cta2')}
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-0 border border-(--color-border) max-w-lg">
            {STATS.map((stat, i) => (
              <div
                key={stat.key}
                className={`px-6 py-4 text-center ${i < STATS.length - 1 ? 'border-r border-(--color-border)' : ''}`}
              >
                <div className="text-3xl font-bold text-(--cyan) font-[family-name:var(--font-display)] mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-(--silver) tracking-wider uppercase">
                  {t(`stat.${stat.key}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-(--silver) hover:text-(--cyan) transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={24} />
      </a>
    </section>
  );
}
