import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeader } from '@/components/patterns/SectionHeader';

const TYPES = [
  { key: 'openCircuit', code: 'OT' },
  { key: 'closedCircuit', code: 'KT' },
  { key: 'counterflow', code: 'CF' },
  { key: 'crossflow', code: 'XF' },
];

export function TowerTypesSection() {
  const t = useTranslations('home.towerTypes');

  return (
    <section className="section-py bg-(--deep)" id="types">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            label={t('label')}
            title={t('title')}
            description={t('subtitle')}
            className="mb-16"
          />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-(--color-border)">
          {TYPES.map((type, i) => (
            <Reveal key={type.key} delay={i * 80}>
              <div className="bg-(--void) hover:bg-(--panel) transition-all duration-300 p-8 group cursor-default">
                <div className="flex items-start justify-between mb-6">
                  <div className="border border-(--cyan) w-14 h-14 flex items-center justify-center">
                    <span className="text-sm font-bold text-(--cyan) font-[family-name:var(--font-display)] tracking-wider">
                      {type.code}
                    </span>
                  </div>
                  <span className="text-xs text-(--silver) border border-(--color-border) px-2 py-1 font-[family-name:var(--font-display)] tracking-wider group-hover:border-(--color-border-strong) transition-colors">
                    {t(`type.tag`)}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-(--white) mb-2 font-[family-name:var(--font-display)] uppercase tracking-wide group-hover:text-(--cyan) transition-colors">
                  {t(`type.${type.key}.title`)}
                </h3>
                <p className="text-sm text-(--mist) leading-relaxed">
                  {t(`type.${type.key}.description`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
