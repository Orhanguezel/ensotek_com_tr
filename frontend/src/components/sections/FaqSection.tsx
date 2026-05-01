import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeader } from '@/components/patterns/SectionHeader';
import type { FaqItem } from '@/lib/api';

interface Props {
  faqItems?: FaqItem[];
}

const FALLBACK_COUNT = 5;

export function FaqSection({ faqItems }: Props) {
  const t = useTranslations('home.faq');

  const items: FaqItem[] = faqItems && faqItems.length > 0
    ? faqItems
    : Array.from({ length: FALLBACK_COUNT }, (_, i) => ({
        question: t(`faq${i + 1}.question`),
        answer:   t(`faq${i + 1}.answer`),
      }));

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
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <details className="faq-item group">
                <summary>
                  <span>{item.question}</span>
                  <span className="text-(--color-text-muted) group-open:rotate-45 group-open:text-(--color-accent) transition-all duration-200 text-xl leading-none select-none">
                    +
                  </span>
                </summary>
                <div className="faq-content">
                  {item.answer}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
