import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeader } from '@/components/patterns/SectionHeader';

const STEPS = ['01', '02', '03', '04'];

export function HowItWorksSection() {
  const t = useTranslations('home.howItWorks');

  return (
    <section className="section-py" id="how">
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

        {/* Lightweight process visual replacing the previous 2 MB animated GIF. */}
        <Reveal>
          <div
            className="mb-12 overflow-hidden rounded-xl border border-(--steel) bg-(--deep) p-5 md:p-8"
            aria-label={t('title')}
          >
            <div className="grid gap-4 md:grid-cols-4">
              {STEPS.map((step, i) => (
                <div key={step} className="relative rounded-lg border border-(--steel) bg-(--void) p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-(--cyan)">
                      {step}
                    </span>
                    <span className="h-2.5 w-2.5 rounded-full bg-(--cyan) shadow-[0_0_24px_rgba(0,191,255,0.75)]" />
                  </div>
                  <h3 className="mb-3 font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-wide text-(--white)">
                    {t(`step${i + 1}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-(--mist)">
                    {t(`step${i + 1}.description`)}
                  </p>
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-3 top-1/2 hidden h-px w-6 bg-(--cyan) md:block"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
