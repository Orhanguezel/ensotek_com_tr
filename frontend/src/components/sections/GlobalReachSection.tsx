import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';
import type { GlobalReachStats } from '@/lib/api';

interface Props {
  globalReachStats?: GlobalReachStats;
}

// bg-cover: harita tüm container'ı kaplar, pozisyonlar gerçek kıta konumlarına göre
const MAP_DOTS = [
  // Amerika
  { top: '38.0%', left: '15.0%' }, // USA West
  { top: '35.0%', left: '25.0%' }, // USA East
  { top: '68.0%', left: '33.0%' }, // Brazil
  // Avrupa / Türkiye / Afrika
  { top: '28.0%', left: '51.0%' }, // Europe Center
  { top: '35.0%', left: '57.0%' }, // Turkey
  { top: '75.0%', left: '55.0%' }, // South Africa
  // Asya / Pasifik
  { top: '22.0%', left: '65.0%' }, // Russia/Northern Asia
  { top: '48.0%', left: '72.0%' }, // India
  { top: '55.0%', left: '82.0%' }, // SE Asia
  { top: '75.0%', left: '88.0%' }, // Australia
];

export function GlobalReachSection({ globalReachStats }: Props) {
  const t = useTranslations('home.globalReach');

  return (
    <section className="section-py relative overflow-hidden" id="global">
      <div className="cyber-grid-bg absolute inset-0 opacity-30" aria-hidden="true" />

      {/* Başlık */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="text-center mb-12">
            <span className="section-label-et">{t('label')}</span>
            <h2 className="section-title-et">{t('title')}</h2>
          </div>
        </Reveal>
      </div>

      {/* Full-width harita */}
      <Reveal delay={100}>
        <div className="relative w-full border-y border-(--color-border) bg-(--deep) overflow-hidden py-12 lg:py-20">
          <div className="mx-auto max-w-5xl relative aspect-[784/458]">
            {/* Harita Arkaplanı */}
            <div
              className="absolute inset-0 opacity-60 bg-center bg-no-repeat bg-contain"
              aria-hidden="true"
              style={{ backgroundImage: "url('/world-map.svg')" }}
            />
            
            {/* Arkaplan 'WORLD' yazısı */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[6rem] lg:text-[12rem] font-bold text-(--cyan) opacity-[0.03] font-(family-name:--font-display) select-none">
                WORLD
              </span>
            </div>

            {/* Noktalar */}
            {MAP_DOTS.map((dot, i) => (
              <div
                key={i}
                className="absolute size-1.5 lg:size-2 bg-(--cyan) rounded-full pulse-dot shadow-[0_0_10px_rgba(22,196,216,0.6)]"
                style={{ 
                  top: dot.top, 
                  left: dot.left, 
                  animationDelay: `${i * 0.15}s`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}
          </div>

          {/* Overlay stat */}
          <div className="absolute bottom-6 right-8 border border-(--cyan)/30 bg-(--deep)/80 backdrop-blur-sm px-6 py-4 text-right z-20">
            <div className="text-3xl font-bold text-(--cyan) font-(family-name:--font-display)">
              {globalReachStats?.countries_count ?? '40+'}
            </div>
            <div className="text-xs text-(--mist) tracking-wider uppercase mt-1">{t('countriesServed')}</div>
          </div>
        </div>
      </Reveal>

      {/* Stats row */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <Reveal delay={200}>
          <div className="grid grid-cols-3 gap-0.5 bg-(--color-border) mt-0.5">
            {[
              { value: globalReachStats?.projects_value   ?? t('stat.projects.value'),   label: globalReachStats?.projects_label   ?? t('stat.projects.label') },
              { value: globalReachStats?.experience_value ?? t('stat.experience.value'), label: globalReachStats?.experience_label ?? t('stat.experience.label') },
              { value: globalReachStats?.capacity_value   ?? t('stat.capacity.value'),   label: globalReachStats?.capacity_label   ?? t('stat.capacity.label') },
            ].map((stat, i) => (
              <div key={i} className="bg-(--void) px-6 py-6 text-center">
                <div className="text-2xl font-bold text-(--cyan) font-(family-name:--font-display) mb-1">
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
