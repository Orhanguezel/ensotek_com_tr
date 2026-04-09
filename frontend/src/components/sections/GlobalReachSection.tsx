import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';
import type { GlobalReachStats } from '@/lib/api';

interface Props {
  globalReachStats?: GlobalReachStats;
}

const MAP_DOTS = [
  { top: '30%', left: '15%' },
  { top: '25%', left: '48%' },
  { top: '35%', left: '55%' },
  { top: '50%', left: '30%' },
  { top: '20%', left: '70%' },
  { top: '40%', left: '75%' },
  { top: '55%', left: '65%' },
  { top: '45%', left: '82%' },
];

export function GlobalReachSection({ globalReachStats }: Props) {
  const t = useTranslations('home.globalReach');

  return (
    <section className="section-py relative overflow-hidden" id="global">
      <div className="cyber-grid-bg absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="text-center mb-12">
            <span className="section-label-et">{t('label')}</span>
            <h2 className="section-title-et">{t('title')}</h2>
          </div>
        </Reveal>

        {/* Stylized world map */}
        <Reveal delay={100}>
          <div className="relative h-64 lg:h-96 border border-(--color-border) bg-(--deep) overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[12rem] font-bold text-(--cyan) opacity-5 font-[family-name:var(--font-display)] select-none">
                WORLD
              </span>
            </div>
            {MAP_DOTS.map((dot, i) => (
              <div
                key={i}
                className="absolute size-2 bg-(--cyan) rounded-full pulse-dot"
                style={{ top: dot.top, left: dot.left, animationDelay: `${i * 0.3}s` }}
              />
            ))}
            {/* Overlay stat */}
            <div className="absolute bottom-6 right-6 border border-(--cyan) bg-(--deep) px-6 py-4 text-right">
              <div className="text-3xl font-bold text-(--cyan) font-[family-name:var(--font-display)]">{globalReachStats?.countries_count ?? '40+'}</div>
              <div className="text-xs text-(--mist) tracking-wider uppercase mt-1">{t('countriesServed')}</div>
            </div>
          </div>
        </Reveal>

        {/* Stats row */}
        <Reveal delay={200}>
          <div className="grid grid-cols-3 gap-0.5 bg-(--color-border) mt-0.5">
            {[
              { value: globalReachStats?.projects_value    ?? t('stat.projects.value'),    label: globalReachStats?.projects_label    ?? t('stat.projects.label') },
              { value: globalReachStats?.experience_value  ?? t('stat.experience.value'),  label: globalReachStats?.experience_label  ?? t('stat.experience.label') },
              { value: globalReachStats?.capacity_value    ?? t('stat.capacity.value'),    label: globalReachStats?.capacity_label    ?? t('stat.capacity.label') },
            ].map((stat, i) => (
              <div key={i} className="bg-(--void) px-6 py-6 text-center">
                <div className="text-2xl font-bold text-(--cyan) font-[family-name:var(--font-display)] mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-(--silver) tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
