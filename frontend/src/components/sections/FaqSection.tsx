import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeader } from '@/components/patterns/SectionHeader';

const FAQ_COUNT = 5;

export function FaqSection() {
  const t = useTranslations('home.faq');

  return (
    <section className="section-py" id="faq">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            label={t('label')}
            title={t('title')}
            align="center"
            className="mb-12"
          />
        </Reveal>

        <div className="space-y-0 border-t border-(--color-border)">
          {Array.from({ length: FAQ_COUNT }, (_, i) => (
            <Reveal key={i} delay={i * 80}>
              <details className="faq-item group">
                <summary>
                  <span>{t(`faq${i + 1}.question`)}</span>
                  <span className="text-(--silver) group-open:rotate-45 transition-transform duration-200 text-xl leading-none select-none">
                    +
                  </span>
                </summary>
                <div className="faq-content">
                  {t(`faq${i + 1}.answer`)}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
