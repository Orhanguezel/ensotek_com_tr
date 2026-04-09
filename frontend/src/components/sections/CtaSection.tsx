import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/motion/Reveal';
import { ArrowRight, Phone } from 'lucide-react';

export function CtaSection() {
  const t = useTranslations('home.cta');
  const locale = useLocale();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-(--deep) via-(--panel) to-(--deep)" aria-hidden="true" />
      <div className="cyber-grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-(--color-border-strong)" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-(--color-border-strong)" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <Reveal>
          <span className="section-label-et">{t('label')}</span>
          <h2 className="section-title-et">{t('title')}</h2>
          <p className="section-subtitle-et mx-auto mb-10">{t('description')}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" locale={locale} className="btn-fill">
              {t('cta1')} <ArrowRight size={16} />
            </Link>
            <a href="tel:+902121234567" className="btn-ghost inline-flex items-center gap-2">
              <Phone size={16} /> {t('cta2')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
