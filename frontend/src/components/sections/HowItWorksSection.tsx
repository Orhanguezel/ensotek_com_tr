import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeader } from '@/components/patterns/SectionHeader';

const STEPS = ['01', '02', '03', '04'];

export function HowItWorksSection() {
  const t = useTranslations('home.howItWorks');
  const locale = useLocale();

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

        {/* Animated GIF illustration */}
        <Reveal>
          <div className="mb-12 rounded-xl overflow-hidden border border-(--steel) bg-(--deep)">
            <Image
              src={`/how-it-works-${locale}.gif`}
              alt={t('title')}
              width={960}
              height={540}
              className="w-full h-auto"
              unoptimized
            />
          </div>
        </Reveal>

        {/* Text step cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-(--color-border)">
          {STEPS.map((step, i) => (
            <Reveal key={step} delay={i * 100}>
              <div className="bg-(--void) p-8 h-full hover:bg-(--deep) transition-colors group">
                <div className="text-5xl font-bold text-(--cyan) opacity-20 font-[family-name:var(--font-display)] group-hover:opacity-40 transition-opacity mb-6">
                  {step}
                </div>
                <h3 className="text-base font-semibold text-(--white) mb-3 font-[family-name:var(--font-display)] uppercase tracking-wide">
                  {t(`step${i + 1}.title`)}
                </h3>
                <p className="text-sm text-(--mist) leading-relaxed">
                  {t(`step${i + 1}.description`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
