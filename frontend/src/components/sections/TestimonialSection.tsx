import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';

export function TestimonialSection() {
  const t = useTranslations('home.testimonial');

  return (
    <section className="section-py bg-(--deep)">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Reveal>
          <div className="text-center relative">
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-9xl text-(--cyan) opacity-10 font-serif leading-none select-none"
              aria-hidden="true"
            >
              "
            </div>
            <blockquote className="relative z-10">
              <p className="text-xl lg:text-2xl font-[family-name:var(--font-serif)] italic text-(--light) leading-relaxed mb-8">
                {t('quote')}
              </p>
              <footer>
                <cite className="not-italic">
                  <div className="text-sm font-semibold text-(--cyan) tracking-wider uppercase font-[family-name:var(--font-display)]">
                    {t('author')}
                  </div>
                  <div className="text-xs text-(--silver) mt-1">{t('company')}</div>
                </cite>
              </footer>
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
