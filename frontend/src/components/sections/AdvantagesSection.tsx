import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeader } from '@/components/patterns/SectionHeader';

const ADVANTAGES_COUNT = 6;

export function AdvantagesSection() {
  const t = useTranslations('home.advantages');

  return (
    <section className="section-py bg-(--deep)" id="advantages">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            label={t('label')}
            title={t('title')}
            description={t('subtitle')}
            className="mb-16"
          />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-(--color-border)">
          {Array.from({ length: ADVANTAGES_COUNT }, (_, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="bg-(--void) hover:bg-(--panel) transition-colors p-8 group">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-bold text-(--cyan) opacity-30 font-[family-name:var(--font-display)] group-hover:opacity-60 transition-opacity leading-none mt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-(--white) mb-2 font-[family-name:var(--font-display)] uppercase tracking-wide group-hover:text-(--cyan) transition-colors">
                      {t(`advantage${i + 1}.title`)}
                    </h3>
                    <p className="text-sm text-(--mist) leading-relaxed">
                      {t(`advantage${i + 1}.description`)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-px bg-(--color-border) group-hover:bg-(--cyan) transition-colors opacity-50" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
