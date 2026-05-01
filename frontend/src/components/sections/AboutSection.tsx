import { useTranslations, useLocale } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeader } from '@/components/patterns/SectionHeader';
import { CheckCircle, ArrowRight } from 'lucide-react';
import type { AboutContent } from '@/lib/api';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

interface Props {
  aboutContent?: AboutContent;
}

export function AboutSection({ aboutContent }: Props) {
  const t = useTranslations('home.about');
  const locale = useLocale();
  const aboutImageUrl = aboutContent?.image_url ?? '/uploads/kap.jpg';
  const features = aboutContent
    ? [aboutContent.feature1, aboutContent.feature2, aboutContent.feature3, aboutContent.feature4].filter(Boolean) as string[]
    : Array.from({ length: 4 }, (_, i) => t(`feature${i + 1}`));

  return (
    <section className="section-py" id="about">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <Reveal>
            <div className="relative aspect-[4/5] max-w-md">
              <div className="absolute inset-0 overflow-hidden border border-(--color-border) bg-(--deep)">
                <Image
                  src={aboutImageUrl}
                  alt={aboutContent?.title ?? t('title')}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  priority={false}
                />
                <div className="absolute inset-0 bg-linear-to-t from-(--deep)/55 via-transparent to-(--deep)/20" />
                <div className="absolute inset-4 border border-(--color-border) opacity-40" />
              </div>
              {/* ISO badge */}
              <div className="absolute -bottom-6 -right-6 border border-(--cyan) bg-(--deep) px-4 py-3 text-center min-w-24">
                <div className="text-xs text-(--cyan) font-bold tracking-wider font-[family-name:var(--font-display)]">ISO 9001</div>
                <div className="text-xs text-(--silver) mt-0.5">{t('isoCert')}</div>
              </div>
            </div>
          </Reveal>

          {/* Text side */}
          <Reveal delay={150}>
            <SectionHeader
              label={aboutContent?.label ?? t('label')}
              title={aboutContent?.title ?? t('title')}
              description={aboutContent?.description ?? t('description')}
            />
            <ul className="mt-8 space-y-3">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-(--cyan) mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-(--mist)">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              locale={locale}
              className="mt-8 inline-flex items-center gap-2 text-xs text-(--cyan) hover:text-(--cyan-glow) transition-colors uppercase tracking-wider font-medium"
            >
              {locale === 'tr' ? 'Detayları gör' : locale === 'de' ? 'Details ansehen' : 'View details'}
              <ArrowRight size={12} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
