import { Check } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { OfferForm } from './OfferForm';

export async function OfferPage({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'offer' });
  const detailKeys = ['capacity', 'selection', 'followup'] as const;

  return (
    <div className="pt-24">
      <section className="section-py bg-(--color-bg-secondary)">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="self-start">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-(--color-accent) font-[family-name:var(--font-display)]">
              {t('label')}
            </p>
            <h1 className="mb-6 text-4xl font-semibold leading-tight text-(--color-text-primary) font-[family-name:var(--font-display)] md:text-5xl">
              {t('title')}
            </h1>
            <p className="max-w-xl text-base leading-8 text-(--color-text-secondary)">
              {t('subtitle')}
            </p>
            <div className="mt-10 border border-(--color-border) bg-(--color-bg-panel) p-6">
              <h2 className="mb-5 text-sm font-semibold uppercase tracking-[2px] text-(--color-text-primary) font-[family-name:var(--font-display)]">
                {t('detailsTitle')}
              </h2>
              <ul className="space-y-4">
                {detailKeys.map((key) => (
                  <li key={key} className="flex gap-3 text-sm text-(--color-text-secondary)">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center border border-(--color-accent) text-(--color-accent)">
                      <Check size={13} />
                    </span>
                    <span>{t(`details.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border border-(--color-border) bg-(--color-bg-primary) p-5 sm:p-8">
            <OfferForm />
          </div>
        </div>
      </section>
    </div>
  );
}
