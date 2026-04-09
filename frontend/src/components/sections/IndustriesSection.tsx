import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeader } from '@/components/patterns/SectionHeader';

const INDUSTRIES = [
  { key: 'hvac', icon: '🏢' },
  { key: 'power', icon: '⚡' },
  { key: 'petrochemical', icon: '🏭' },
  { key: 'food', icon: '🌾' },
  { key: 'pharma', icon: '💊' },
  { key: 'steel', icon: '⚙️' },
  { key: 'textile', icon: '🧵' },
  { key: 'chemical', icon: '🔬' },
];

export function IndustriesSection() {
  const t = useTranslations('home.industries');

  return (
    <section className="section-py" id="industries">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            label={t('label')}
            title={t('title')}
            description={t('subtitle')}
            align="center"
            className="max-w-2xl mx-auto mb-16"
          />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-(--color-border)">
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry.key} delay={i * 60}>
              <div className="bg-(--void) hover:bg-(--panel) transition-colors p-8 text-center group">
                <div className="text-3xl mb-4" aria-hidden="true">{industry.icon}</div>
                <h3 className="text-sm font-semibold text-(--white) mb-2 font-[family-name:var(--font-display)] uppercase tracking-wide group-hover:text-(--cyan) transition-colors">
                  {t(`industry.${industry.key}.title`)}
                </h3>
                <p className="text-xs text-(--silver) leading-relaxed">
                  {t(`industry.${industry.key}.description`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
